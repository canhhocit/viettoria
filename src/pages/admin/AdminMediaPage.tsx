import React, { useEffect, useRef, useState } from 'react';
import { Box, Check, Copy, FileImage, Image, Loader2, Upload } from 'lucide-react';
import { adminApi } from '../../services/api';
import type { MediaItem } from '../../types';
import { resolveImageUrl, handleImageFallback } from '../../utils/mediaResolver';

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  bytes?: number;
  error?: { message?: string };
};

const getUploadKind = (file: File): { resourceType: 'image' | 'raw'; extension: string } => {
  if (['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'].includes(file.type)) {
    return { resourceType: 'image', extension: file.name.split('.').pop()?.toLowerCase() || '' };
  }
  if (file.name.toLowerCase().endsWith('.glb')) {
    return { resourceType: 'raw', extension: 'glb' };
  }
  throw new Error('Chỉ hỗ trợ ảnh (JPG, PNG, WebP, AVIF) và mô hình 3D GLB.');
};

const getDisplayName = (fileName: string) => fileName.replace(/\.[^.]+$/, '');

export const AdminMediaPage: React.FC = () => {
  const isDemo = adminApi.isDemoSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assetName, setAssetName] = useState('');
  const [altText, setAltText] = useState('');

  useEffect(() => {
    adminApi.getMedia().then(setMediaList)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Không tải được thư viện media.'))
      .finally(() => setLoading(false));
  }, []);

  const selectFile = (file: File | undefined) => {
    if (!file) return;
    try {
      getUploadKind(file);
      setSelectedFile(file);
      setAssetName(getDisplayName(file.name));
      setAltText('');
      setError(null);
      setNotice(null);
    } catch (err) {
      setSelectedFile(null);
      setError(err instanceof Error ? err.message : 'Định dạng tệp không được hỗ trợ.');
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setNotice(null);
    try {
      const { resourceType, extension } = getUploadKind(selectedFile);
      let uploadResult: CloudinaryUploadResponse | null = null;
      let cloudinaryError: Error | null = null;
      try {
        const signature = await adminApi.createMediaUploadSignature(resourceType, extension);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('api_key', signature.apiKey);
        formData.append('timestamp', String(signature.timestamp));
        formData.append('signature', signature.signature);
        formData.append('folder', signature.folder);
        formData.append('public_id', signature.publicId);
        formData.append('overwrite', String(signature.overwrite));

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${encodeURIComponent(signature.cloudName)}/${signature.resourceType}/upload`,
          { method: 'POST', body: formData },
        );
        const result = await uploadResponse.json() as CloudinaryUploadResponse;
        if (!uploadResponse.ok || !result.secure_url || !result.public_id) {
          throw new Error(result.error?.message || 'Cloudinary không nhận được tệp tải lên.');
        }
        uploadResult = result;
      } catch (err) {
        cloudinaryError = err instanceof Error ? err : new Error('Không thể kết nối Cloudinary.');
      }

      const displayName = assetName.trim() || getDisplayName(selectedFile.name);
      const description = altText.trim();
      const saved = uploadResult?.secure_url && uploadResult.public_id
        ? await adminApi.saveMedia({
          name: displayName,
          fileName: selectedFile.name,
          fileType: selectedFile.type || (resourceType === 'raw' ? 'model/gltf-binary' : 'application/octet-stream'),
          fileSize: uploadResult.bytes ?? selectedFile.size,
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          resourceType,
          altText: description,
        })
        : await adminApi.uploadMediaFallback(selectedFile, displayName, description);

      setNotice(cloudinaryError
        ? `Cloudinary chưa sẵn sàng (${cloudinaryError.message}); tệp đã được lưu trên backend.`
        : 'Tệp đã được lưu trên Cloudinary và ghi vào thư viện.');
      setMediaList(current => [saved, ...current]);
      setSelectedFile(null);
      setAssetName('');
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải tệp lên Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setError(null);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError('Trình duyệt không cho phép sao chép. Hãy chọn và sao chép URL thủ công.');
    }
  };

  const filteredMedia = mediaList.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.fileName || '').toLowerCase().includes(search.toLowerCase()) ||
    item.url.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-border">
        <div>
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Image className="w-4 h-4" />
            <span>Kho Lưu Trữ Hình Ảnh Thực Địa & Khảo Cứu</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">Thư Viện Media Di Sản</h1>
        </div>
        <div className="w-full sm:w-72">
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Tìm tên tệp hoặc URL..."
            className="w-full px-3 py-2 bg-paper border border-paper-border focus:border-brass text-xs font-mono focus:outline-none"
          />
        </div>
      </div>

      {error && <div role="alert" className="border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-terracotta">{error}</div>}
      {notice && <div role="status" className="border border-brass/40 bg-paper-warm p-3 text-sm text-forest">{notice}</div>}

      {!isDemo && <form onSubmit={event => void handleUpload(event)} className="border border-paper-border bg-paper p-4 sm:p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="border border-brass/40 p-2 text-brass"><Upload className="w-4 h-4" /></div>
          <div>
            <h2 className="font-serif font-bold text-forest">Tải tệp lên Cloudinary</h2>
            <p className="mt-1 text-xs leading-relaxed text-charcoal-muted">Ảnh và mô hình GLB được lưu trên Cloudinary; đường dẫn cùng thông tin tài sản được ghi vào database.</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-muted">
            Tệp ảnh hoặc mô hình GLB
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif,.glb"
              onChange={event => selectFile(event.target.files?.[0])}
              className="mt-1 block w-full text-xs normal-case file:mr-2 file:border file:border-paper-border file:bg-paper-warm file:px-2 file:py-1.5 file:text-[11px] file:font-mono file:text-charcoal"
            />
          </label>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-muted">
            Tên hiển thị
            <input value={assetName} onChange={event => setAssetName(event.target.value)} placeholder="Ví dụ: Chùa Một Cột" className="mt-1 w-full border border-paper-border bg-paper px-3 py-2 text-sm normal-case text-charcoal focus:border-brass focus:outline-none" />
          </label>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-muted">
            Mô tả ảnh (alt text)
            <input value={altText} onChange={event => setAltText(event.target.value)} placeholder="Mô tả ngắn cho người xem" className="mt-1 w-full border border-paper-border bg-paper px-3 py-2 text-sm normal-case text-charcoal focus:border-brass focus:outline-none" />
          </label>
          <button type="submit" disabled={!selectedFile || uploading} className="inline-flex h-9 items-center justify-center gap-2 border border-forest bg-forest px-4 text-xs font-mono uppercase tracking-wider text-paper transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-50">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? 'Đang tải lên' : 'Tải lên'}
          </button>
        </div>
        {selectedFile && <p className="mt-3 flex items-center gap-2 text-[11px] font-mono text-charcoal-muted"><FileImage className="h-3.5 w-3.5 text-brass" />{selectedFile.name} · {(selectedFile.size / 1024).toFixed(0)} KB</p>}
      </form>}

      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-forest">Đang tải thư viện media...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="border border-dashed border-paper-border py-14 text-center text-sm text-charcoal-muted">Chưa có tệp phù hợp trong thư viện.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredMedia.map(item => {
            const isModel = item.resourceType === 'raw' || (item.fileName || '').toLowerCase().endsWith('.glb');
            return (
              <article key={item.id} className="flex flex-col justify-between overflow-hidden border border-paper-border bg-paper shadow-sm group">
                <div>
                  <div className={`relative aspect-[4/3] overflow-hidden ${isModel ? 'flex flex-col items-center justify-center gap-2 bg-forest text-paper' : 'bg-paper-warm'}`}>
                    {isModel ? <><Box className="h-9 w-9 text-brass" /><span className="font-mono text-[10px] uppercase tracking-[0.18em]">Mô hình 3D · GLB</span></> : (
                      <img src={resolveImageUrl(item.url)} alt={item.altText || item.name} onError={event => handleImageFallback(event)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    )}
                  </div>
                  <div className="space-y-1 p-3.5 font-mono text-xs">
                    <p className="truncate font-serif text-sm font-bold text-forest" title={item.name}>{item.name}</p>
                    <p className="truncate text-[10px] text-charcoal-muted" title={item.fileName}>{item.fileName || 'Tệp di sản'} · {(item.fileSize / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <div className="mt-2 border-t border-paper-border p-3.5 pt-3">
                  <button onClick={() => void handleCopy(item.url, item.id)} className="flex w-full items-center justify-center gap-1.5 border border-paper-border bg-paper-warm px-2 py-1.5 font-mono text-[11px] uppercase tracking-wider text-charcoal transition-colors hover:bg-forest hover:text-paper">
                    {copiedId === item.id ? <><Check className="h-3 w-3 text-brass" /><span className="font-bold text-brass">Đã sao chép URL</span></> : <><Copy className="h-3 w-3 text-brass" /><span>Sao chép URL</span></>}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminMediaPage;

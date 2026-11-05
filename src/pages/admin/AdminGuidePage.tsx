import React from 'react';
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const workflow = [
  { number: '01', title: 'Nhóm nội dung', text: 'Tạo Bộ sưu tập nếu cần gom công trình theo vùng hoặc chủ đề.' },
  { number: '02', title: 'Tạo công trình', text: 'Trong Mô hình & Stories, nhập thông tin, ảnh bìa và mô hình GLB rồi lưu.' },
  { number: '03', title: 'Bổ sung nội dung', text: 'Mở Stories để viết các khối lịch sử; mở Audio để gắn bản thu và lời thoại.' },
  { number: '04', title: 'Kiểm tra & đăng', text: 'Xem trang công khai, kiểm tra media và trạng thái trước khi xuất bản.' },
];

const sections = [
  {
    title: 'Tổng quan',
    description: 'Xem số liệu và đi nhanh đến các khu vực quản trị.',
    to: '/admin/dashboard',
    action: 'Mở tổng quan',
  },
  {
    title: 'Mô hình & Stories',
    description: 'Thêm hoặc sửa công trình, ảnh, GLB và trạng thái. Bấm Stories ở dòng công trình để biên tập nội dung, sắp xếp khối rồi lưu.',
    to: '/admin/products',
    action: 'Mở danh sách công trình',
  },
  {
    title: 'Hướng dẫn viên Audio',
    description: 'Chọn công trình, nhập tên chương và lời thoại, tải audio hoặc dán URL, nghe thử rồi lưu.',
    to: '/admin/audio-guides',
    action: 'Quản lý audio',
  },
  {
    title: 'Bộ sưu tập',
    description: 'Tạo nhóm, đặt ảnh bìa, thứ tự và trạng thái; gán công trình vào nhóm khi biên tập mô hình.',
    to: '/admin/collections',
    action: 'Quản lý bộ sưu tập',
  },
  {
    title: 'Góc Văn hóa',
    description: 'Soạn bài khảo cứu, ảnh bìa, đoạn trích, nội dung và trạng thái đăng.',
    to: '/admin/blogs',
    action: 'Quản lý bài viết',
  },
  {
    title: 'Thư viện Media',
    description: 'Tải ảnh, GLB hoặc audio; sao chép URL để dùng trong biểu mẫu. Chỉ xóa tệp chưa được nội dung sử dụng.',
    to: '/admin/media',
    action: 'Mở thư viện',
  },
];

export const AdminGuidePage: React.FC = () => (
  <div className="mx-auto max-w-6xl space-y-7">
    <header className="border-b border-paper-border pb-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
        <BookOpen className="h-4 w-4" />
        <span>Cẩm nang thao tác</span>
      </div>
      <h1 className="mt-2 font-serif text-2xl font-bold text-forest sm:text-3xl">Hướng dẫn quản trị</h1>
      <p className="mt-1 text-sm text-charcoal-muted">Quy trình cập nhật nội dung di sản từ đầu đến khi hiển thị trên website.</p>
    </header>

    <section className="border border-paper-border bg-paper p-4 sm:p-6" aria-labelledby="workflow-heading">
      <div className="flex flex-col justify-between gap-2 border-b border-paper-border pb-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brass">Quy trình chuẩn</p>
          <h2 id="workflow-heading" className="mt-1 font-serif text-lg font-bold text-forest">Từ dữ liệu đến website</h2>
        </div>
        <Link to="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:text-brass-dark">
          Xem website <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {workflow.map((step) => (
          <li key={step.number} className="flex gap-3">
            <span className="font-mono text-xs font-bold text-brass">{step.number}</span>
            <div>
              <h3 className="text-sm font-semibold text-forest">{step.title}</h3>
              <p className="mt-1 text-xs leading-5 text-charcoal-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section aria-labelledby="areas-heading">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brass">Tra theo mục</p>
          <h2 id="areas-heading" className="mt-1 font-serif text-lg font-bold text-forest">Các khu vực quản trị</h2>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <article key={section.to} className="flex min-h-36 flex-col justify-between border border-paper-border bg-paper p-4">
            <div>
              <h3 className="font-serif text-base font-bold text-forest">{section.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-charcoal-muted">{section.description}</p>
            </div>
            <Link to={section.to} className="mt-4 inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brass-dark hover:text-forest">
              {section.action} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="grid gap-4 border-t border-paper-border pt-5 md:grid-cols-2">
      <div>
        <h2 className="font-serif text-base font-bold text-forest">Trước khi xuất bản</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-5 text-charcoal-muted marker:text-brass">
          <li>Kiểm tra tên, slug, địa điểm và ảnh bìa.</li>
          <li>Mở trang công khai để xem mô hình, Stories và audio.</li>
          <li>Chuyển trạng thái sang Đã xuất bản; bản nháp hoặc nội dung ẩn không hiện công khai.</li>
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-base font-bold text-forest">Lưu ý thao tác</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-5 text-charcoal-muted marker:text-brass">
          <li>Đăng nhập nhanh dùng tài khoản quản trị. Phiên “Bản xem thử” chỉ xem, không sửa hoặc tải tệp.</li>
          <li>Ảnh, GLB và audio tải lên ưu tiên Cloudinary; nếu lỗi, hệ thống lưu dự phòng ở backend.</li>
          <li>Tệp Media đang được công trình hoặc bài viết sử dụng sẽ bị chặn xóa; gỡ khỏi nội dung trước.</li>
        </ul>
      </div>
    </section>
  </div>
);

export default AdminGuidePage;

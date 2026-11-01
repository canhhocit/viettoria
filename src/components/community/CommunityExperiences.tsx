import React from 'react';
import { Quote, MapPin, Sparkles } from 'lucide-react';

interface TravelerReview {
  id: string;
  name: string;
  role: string;
  place: string;
  location: string;
  comment: string;
  avatar: string;
  heritageCode: string;
}

const REVIEWS: TravelerReview[] = [
  {
    id: '1',
    name: 'Đức Thắng',
    role: 'Nghiên cứu Kiến trúc Cổ',
    place: 'Chùa Một Cột',
    location: 'Hà Nội',
    comment: 'Cầm mô hình in 3D trên tay và tự gài từng thanh mộng gỗ consol mới thấy hết sự kỳ vĩ của kiến trúc thời Lý. Quét mã QR mở ra cả thuyết minh âm thanh hào khí ngàn năm.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-HN-001'
  },
  {
    id: '2',
    name: 'An Nhiên',
    role: 'Du khách từ Đà Nẵng',
    place: 'Khuê Văn Các',
    location: 'Hà Nội',
    comment: 'Món quà lưu niệm tinh tế nhất mình từng thấy. Không còn là tượng thạch cao dễ vỡ hay móc khóa đại trà, mà là một tác phẩm nghệ thuật để bàn thực thụ.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-HN-002'
  },
  {
    id: '3',
    name: 'Alexandre Martin',
    role: 'Du khách Pháp',
    place: 'Ngọ Môn Huế',
    location: 'Thừa Thiên Huế',
    comment: 'The 3D model fits in my cabin luggage easily. Scanning the QR code allowed me to see the virtual exploded structure. Fantastic Vietnamese craftsmanship!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-HUE-004'
  },
  {
    id: '4',
    name: 'Minh Quân',
    role: 'Sinh viên Phenikaa',
    place: 'Cột Cờ Hà Nội',
    location: 'Hà Nội',
    comment: 'Tự hào khi thế hệ trẻ kết hợp công nghệ in 3D và nền tảng số hóa để đưa lịch sử dân tộc đến gần hơn với cộng đồng.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-HN-003'
  },
  {
    id: '5',
    name: 'Hoàng Lan',
    role: 'Giáo viên Lịch sử',
    place: 'Bến Nhà Rồng',
    location: 'TP. Hồ Chí Minh',
    comment: 'Tôi dùng mô hình này làm giáo cụ trực quan trên lớp, học sinh vô cùng hào hứng khi được vừa chạm vào mô hình vừa nghe thuyết minh di sản.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-SG-005'
  },
  {
    id: '6',
    name: 'Thanh Trúc',
    role: 'Nhà sưu tầm đồ văn hóa',
    place: 'Điện Hòa Khiêm',
    location: 'Huế',
    comment: 'Độ chi tiết của mái ngói và khớp mộng đạt chuẩn thẩm mỹ bảo tàng. Rất đáng giá cho bộ sưu tập di sản Đại Việt.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    heritageCode: 'VT-HUE-004'
  }
];

export const CommunityExperiences: React.FC = () => {
  return (
    <section className="py-20 bg-paper border-b border-paper-border heritage-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-paper-border pb-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-brass text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Góc Cộng Đồng & Người Sưu Tầm</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest font-bold tracking-tight">
              Chia Sẻ Từ Những Chuyến Đi
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs text-charcoal/70 max-w-md font-light leading-relaxed">
            Hàng trăm du khách, nhà giáo và người trẻ đã lưu giữ ký ức non sông qua các tác phẩm mô hình di sản Viettoria.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div
              key={r.id}
              className="bg-paper-warm border border-paper-border p-6 corner-frame flex flex-col justify-between hover:border-brass transition-colors duration-150 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-brass mb-4">
                  <Quote className="w-5 h-5 text-brass/60" />
                  <span className="font-mono text-[10px] text-brass bg-paper px-2 py-0.5 border border-paper-border">
                    {r.heritageCode}
                  </span>
                </div>
                <p className="text-xs text-charcoal/90 leading-relaxed font-light italic font-serif">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-paper-border flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 object-cover border border-brass/50 p-0.5 bg-paper"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-sm font-bold text-forest truncate">
                    {r.name}
                  </h4>
                  <p className="text-[11px] text-charcoal-muted truncate font-sans">
                    {r.role}
                  </p>
                  <p className="text-[10px] text-brass font-mono flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{r.place} ({r.location})</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

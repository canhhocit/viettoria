import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

interface TimelineEvent {
  year: number;
  yearLabel: string;
  dynasty: string;
  title: string;
  slug: string;
  location: string;
  significance: string;
}

const HERITAGE_TIMELINE: TimelineEvent[] = [
  {
    year: 1049,
    yearLabel: '1049',
    dynasty: 'Thời Lý (Kỷ Sửu)',
    title: 'Chùa Một Cột',
    slug: 'chua-mot-cot',
    location: 'Ba Đình, Hà Nội',
    significance: 'Đài hoa sen nghìn năm tuổi, biểu tượng Phật giáo thịnh trị thời Lý.',
  },
  {
    year: 1805,
    yearLabel: '1805',
    dynasty: 'Triều Nguyễn (Gia Long)',
    title: 'Khuê Văn Các',
    slug: 'khue-van-cac',
    location: 'Văn Miếu, Hà Nội',
    significance: 'Gác sao Khuê tỏa rạng truyền thống hiếu học và tinh hoa Nho học Thăng Long.',
  },
  {
    year: 1812,
    yearLabel: '1812',
    dynasty: 'Triều Nguyễn (Gia Long)',
    title: 'Cột Cờ Hà Nội',
    slug: 'cot-co-ha-noi',
    location: 'Hoàng Thành Thăng Long',
    significance: 'Kỳ đài sừng sững xây bằng gạch vồ nung, chứng nhân lịch sử Thăng Long.',
  },
  {
    year: 1833,
    yearLabel: '1833',
    dynasty: 'Triều Nguyễn (Minh Mạng)',
    title: 'Ngọ Môn Huế',
    slug: 'ngo-mon-hue',
    location: 'Kinh Thành Huế',
    significance: 'Cổng chính Hoàng thành với lầu Ngũ Phụng tráng lệ, đỉnh cao kiến trúc cung đình.',
  },
  {
    year: 1863,
    yearLabel: '1863',
    dynasty: 'Cận Đại',
    title: 'Bến Nhà Rồng',
    slug: 'ben-nha-rong',
    location: 'TP. Hồ Chí Minh',
    significance: 'Thương cảng lịch sử giao thoa kiến trúc Đông Dương và văn hóa sông nước phương Nam.',
  },
];

export const HeritageTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent>(HERITAGE_TIMELINE[0]);

  return (
    <div className="bg-forest-dark text-paper border border-brass/40 corner-frame p-6 sm:p-10 space-y-8 relative overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="heritage-grain absolute inset-0 opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper/15 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brass text-xs font-mono uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>Biên Niên Sử Di Sản Kiến Trúc</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper">
            Hành Trình Gần Một Thiên Niên Kỷ (1049 — 1863)
          </h3>
        </div>

        <span className="text-[11px] font-mono text-brass-subtle uppercase border border-brass/40 px-3 py-1 bg-forest/80 self-start sm:self-auto">
          5 Tuyệt Tác Khảo Cứu
        </span>
      </div>

      {/* Interactive Horizontal Timeline Nodes */}
      <div className="relative z-10 overflow-x-auto pb-4 pt-2">
        <div className="min-w-[680px] relative px-6">
          {/* Timeline continuous connector line */}
          <div className="absolute top-6 left-10 right-10 h-0.5 bg-paper/20" />
          <div className="absolute top-6 left-10 h-0.5 bg-brass transition-all duration-500"
            style={{
              width: `${(HERITAGE_TIMELINE.findIndex(e => e.year === selectedEvent.year) / (HERITAGE_TIMELINE.length - 1)) * 100}%`
            }}
          />

          <div className="relative flex justify-between">
            {HERITAGE_TIMELINE.map((item) => {
              const isSelected = item.year === selectedEvent.year;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedEvent(item)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  {/* Point Marker */}
                  <div 
                    className={`w-12 h-12 flex items-center justify-center border transition-all duration-200 z-10 shadow-lg ${
                      isSelected
                        ? 'bg-brass text-forest border-brass-light scale-110 font-bold'
                        : 'bg-forest text-paper/80 border-brass/40 group-hover:border-brass group-hover:text-brass'
                    }`}
                  >
                    <span className="font-mono text-xs">{item.yearLabel}</span>
                  </div>

                  {/* Dynastic Tag */}
                  <span className={`text-[10px] font-mono mt-2 tracking-wider transition-colors ${
                    isSelected ? 'text-brass font-bold' : 'text-paper/50 group-hover:text-paper'
                  }`}>
                    {item.dynasty.split(' ')[0]}
                  </span>

                  {/* Title Preview */}
                  <span className={`text-xs font-serif mt-0.5 max-w-[100px] text-center leading-tight transition-colors ${
                    isSelected ? 'text-paper font-bold' : 'text-paper/85 group-hover:text-paper'
                  }`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Period Spotlight Card */}
      <div className="relative z-10 p-6 bg-forest border border-brass/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 bg-brass text-forest font-bold">
              Năm {selectedEvent.year}
            </span>
            <span className="text-brass-subtle">{selectedEvent.dynasty}</span>
            <span className="text-paper/50">• {selectedEvent.location}</span>
          </div>

          <h4 className="font-serif text-2xl font-bold text-paper">
            {selectedEvent.title}
          </h4>

          <p className="text-sm text-paper/80 font-normal leading-relaxed">
            {selectedEvent.significance}
          </p>
        </div>

        <Link
          to={`/products/${selectedEvent.slug}`}
          className="px-5 py-2.5 bg-brass text-forest hover:bg-brass-light transition-colors font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shrink-0 shadow-md"
        >
          <span>Khảo Cứu Tác Phẩm</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default HeritageTimeline;

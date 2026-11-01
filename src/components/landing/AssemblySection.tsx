import React, { useState } from 'react';
import type { HeritageSKU } from '../../types/heritage';
import { Layers, ChevronRight, Hammer } from 'lucide-react';

interface AssemblySectionProps {
  heritage: HeritageSKU;
}

export const AssemblySection: React.FC<AssemblySectionProps> = ({ heritage }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const steps = heritage.assemblyGuide;
  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section id="assembly-section" className="py-20 bg-paper-warm border-b border-paper-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-brass text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Kỹ Nghệ Chế Tác Mộng Gỗ Thăng Long</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest font-bold tracking-tight">
            Nghệ Thuật Khớp Mộng Không Keo Dán
          </h2>
          <p className="mt-4 text-sm text-charcoal/80 leading-relaxed font-light">
            Không sử dụng bất kỳ giọt keo dính hay đinh vít công nghiệp nào. 24 chi tiết của mô hình Chùa Một Cột được tái hiện với cấu trúc mộng gỗ âm dương truyền thống, chuẩn xác đến 0.1mm.
          </p>
        </div>

        {/* Assembly Interactive Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Step Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-4 border transition-all duration-150 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-forest text-paper border-forest shadow-md'
                      : 'bg-paper hover:bg-paper-warm border-paper-border text-charcoal'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${
                    isSelected
                      ? 'bg-brass text-forest border-brass'
                      : 'bg-paper-warm text-charcoal-muted border-paper-border'
                  }`}>
                    0{s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono uppercase tracking-wider ${
                        isSelected ? 'text-brass' : 'text-charcoal-muted'
                      }`}>
                        {s.nameVi}
                      </span>
                      {isSelected && <ChevronRight className="w-4 h-4 text-brass" />}
                    </div>
                    <h3 className={`font-serif text-base font-semibold mt-1 ${
                      isSelected ? 'text-paper' : 'text-forest'
                    }`}>
                      {s.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Exploded Showcase Card */}
          <div className="lg:col-span-7">
            <div className="bg-paper border border-paper-border p-8 corner-frame shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-paper-border pb-4">
                <div>
                  <span className="text-[10px] font-mono text-brass uppercase tracking-widest block">
                    GIAI ĐOẠN LẮP GHÉP {currentStep.step} / {steps.length}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest mt-1">
                    {currentStep.title}
                  </h3>
                </div>
                <div className="px-3 py-1 bg-paper-warm border border-brass/30 text-xs font-mono text-brass font-semibold">
                  {currentStep.highlight}
                </div>
              </div>

              {/* Step Graphic Preview */}
              <div className="relative h-64 bg-forest-dark border border-brass/20 flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#B88A44_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>
                <div className="text-center z-10 space-y-2">
                  <div className="w-16 h-16 border-2 border-brass mx-auto flex items-center justify-center bg-forest">
                    <Hammer className="w-8 h-8 text-brass" />
                  </div>
                  <span className="font-mono text-xs text-brass block">
                    BƯỚC 0{currentStep.step}: {currentStep.nameVi.toUpperCase()}
                  </span>
                  <p className="font-serif text-paper text-sm max-w-sm mx-auto">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              {/* Step Detail Explanation */}
              <div className="space-y-3 bg-paper-warm p-4 border-l-2 border-brass text-xs">
                <span className="font-mono text-[10px] text-charcoal-muted uppercase tracking-wider block">
                  Đặc tính kỹ thuật & khớp ngàm
                </span>
                <p className="text-charcoal leading-relaxed">
                  {currentStep.detail}
                </p>
              </div>

              {/* Next/Prev Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-paper-border text-charcoal hover:bg-paper-warm disabled:opacity-30 disabled:pointer-events-none"
                >
                  ← Bước Trước
                </button>
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 transition-all duration-150 ${
                        i === activeStepIndex ? 'w-6 bg-brass' : 'w-2 bg-paper-border'
                      }`}
                    ></span>
                  ))}
                </div>
                <button
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() => setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-forest text-paper hover:bg-brass disabled:opacity-30 disabled:pointer-events-none"
                >
                  Bước Kế Tiếp →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

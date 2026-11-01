import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Send, 
  Bot, 
  User, 
  Compass
} from 'lucide-react';
import type { MapLandmark } from '../map/HeritageMap';

export type AgeGroup = 'child' | 'teen' | 'adult';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  ageTone?: AgeGroup;
}

interface AITourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLandmark?: MapLandmark | null;
}

export const AITourGuideModal: React.FC<AITourGuideModalProps> = ({
  isOpen,
  onClose,
  initialLandmark,
}) => {
  const selectedPersona = initialLandmark?.name || 'Chùa Một Cột (Hà Nội)';
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('teen');
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Xin kính chào bạn! Tôi là Hướng dẫn viên Di sản Viettoria AI. Tôi rất vui được đồng hành cùng bạn khám phá những bí mật lịch sử và kỹ nghệ kiến trúc của non sông Đại Việt. Bạn có muốn tìm hiểu về đóa sen ngàn năm Chùa Một Cột hay các di tích khác?`,
      timestamp: 'Vừa xong',
      ageTone: 'teen'
    }
  ]);

  if (!isOpen) return null;

  // Speak using Web Speech API
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Preset question handler
  const handleSendPrompt = (promptText: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Vừa xong'
    };

    let reply = '';
    if (promptText.includes('đóa sen') || promptText.includes('Chùa Một Cột') || promptText.includes('1049')) {
      if (ageGroup === 'child') {
        reply = 'Bé biết không, ngày xưa vua Lý Thái Tông ngủ mơ thấy một bà tiên Phật Bà Quan Âm ngồi trên một bông hoa sen khổng lồ màu hồng tỏa hương thơm ngát. Khi tỉnh dậy, vua liền cho xây một ngôi chùa nhỏ xíu xinh xắn bằng gỗ, đặt trên một cây cột đá to đùng mọc giữa hồ nước giống hệt như một bông hoa sen nở mãi không tàn đó!';
      } else if (ageGroup === 'teen') {
        reply = 'Chùa Một Cột được dựng vào mùa đông năm 1049 dưới thời Lý Thái Tông. Vua mộng thấy Phật Bà Quan Âm dắt lên tòa sen. Đây không chỉ là một công trình tâm linh, mà là biểu tượng kiến trúc đỉnh cao chứng minh sự tự chủ, khí phách và tinh thần sáng tạo độc lập của người Việt thời Lý!';
      } else {
        reply = 'Theo sử sách Khâm Định Việt Sử Thông Giám Cương Mục, Chùa Một Cột (Diên Hựu Tự) khởi dựng mùa đông năm 1049. Về mặt triết học, đài sen hình tròn biểu thị cho Trời (Dương), ao Linh Chiểu vuông vức biểu thị cho Đất (Âm). Trụ đá đơn nhất vươn lên giữa làn nước biểu trưng cho sự thăng hoa thoát tục của tinh thần Thiền học thời Lý.';
      }
    } else if (promptText.includes('mộng gỗ') || promptText.includes('in 3D')) {
      if (ageGroup === 'child') {
        reply = 'Mô hình này giống như trò chơi lego thần kỳ của các cụ ngày xưa vậy! Các bác thợ thời xưa không dùng keo dán hay ốc vít sắt đâu, mà làm những cái mấu gỗ lồi lõm gọi là mộng, khi gài vào nhau sẽ kêu "tách" một cái là dính chặt luôn!';
      } else if (ageGroup === 'teen') {
        reply = 'Mô hình Viettoria thu nhỏ với 24 chi tiết mộng gỗ âm dương chuẩn xác 1:120. 8 thanh đòn consol gỗ lim xòe ra gánh trọn trọng lượng lầu Phật mà không dùng 1 giọt keo dính. Bạn có thể tự tay tháo lắp và cảm nhận trí tuệ của tổ tiên!';
      } else {
        reply = 'Kỹ nghệ mộng gỗ truyền thống của Đại Việt là hệ thống chịu lực tự triệt tiêu lực rung chấn (seismic resilience). Khi động đất hay bão lớn, các khớp mộng sẽ tự dịch chuyển nhẹ để phân tán lực mà không bị gãy vỡ. Viettoria dùng công nghệ in 3D PETG tái hiện chuẩn xác từng độ vát dung sai 0.1mm của 24 khớp nối này.';
      }
    } else {
      reply = `Cảm ơn câu hỏi sâu sắc của bạn về ${selectedPersona}. Di sản này mang trong mình tầng sâu văn hóa của triều đại, nơi lịch sử ngàn năm kết tinh trong từng thớ đá, nét ngói và được lưu giữ trường tồn qua mô hình số Viettoria.`;
    }

    const aiMsg: Message = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: reply,
      timestamp: 'Vừa xong',
      ageTone: ageGroup
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputQuestion('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;
    handleSendPrompt(inputQuestion.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper-warm border border-brass corner-frame w-full max-w-3xl h-[620px] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest text-paper border-b border-brass/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-brass flex items-center justify-center bg-forest-dark">
              <Bot className="w-4 h-4 text-brass" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-paper">
                  Hướng Dẫn Viên Di Sản AI
                </span>
                <span className="px-2 py-0.5 bg-brass/20 text-brass text-[10px] font-mono font-semibold uppercase">
                  Voice Demo
                </span>
              </div>
              <span className="text-[11px] text-paper-warm/70 block">
                Trợ lý tri thức văn hóa & khảo cứu kiến trúc Viettoria
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (isSpeaking && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1.5 text-paper-warm/70 hover:text-paper hover:bg-forest-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona & Age Selection Bar (Reverse-Engineered from Disanviet) */}
        <div className="px-6 py-3 bg-paper border-b border-paper-border flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Age Tone Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] text-charcoal-muted uppercase mr-1">
              Giọng kể theo độ tuổi:
            </span>
            {[
              { id: 'child', label: '🧒 Trẻ em', desc: 'Cổ tích, dễ hiểu' },
              { id: 'teen', label: '🧑 Thiếu niên', desc: 'Hào hùng, tự hào' },
              { id: 'adult', label: '👨‍🦳 Người lớn', desc: 'Bối cảnh sâu sắc' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setAgeGroup(tab.id as AgeGroup)}
                className={`px-2.5 py-1 text-[11px] font-mono transition-colors duration-150 ${
                  ageGroup === tab.id
                    ? 'bg-forest text-paper font-semibold'
                    : 'bg-paper-warm text-charcoal hover:bg-brass hover:text-paper border border-paper-border'
                }`}
                title={tab.desc}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Landmark */}
          <div className="text-[11px] font-mono text-brass flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span className="font-semibold">{selectedPersona}</span>
          </div>
        </div>

        {/* Chat Message Dialogue Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-paper/60 heritage-grain">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 border border-brass flex items-center justify-center bg-forest text-brass shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-4 border text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-forest text-paper border-forest'
                    : 'bg-paper-warm text-charcoal border-paper-border shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-paper-border/50 text-[10px] font-mono">
                  <span className={msg.sender === 'user' ? 'text-brass' : 'text-forest font-bold'}>
                    {msg.sender === 'user' ? 'BẠN' : 'HƯỚNG DẪN VIÊN VIETTORIA'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="text-brass hover:text-forest transition-colors flex items-center gap-1"
                        title="Đọc to bằng giọng nói tiếng Việt"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Nghe</span>
                      </button>
                    )}
                    <span className="text-charcoal-muted">{msg.timestamp}</span>
                  </div>
                </div>

                <p className="whitespace-pre-line font-light">
                  {msg.text}
                </p>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 border border-paper-border flex items-center justify-center bg-paper-warm text-charcoal shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Question Prompts */}
        <div className="px-6 py-2.5 bg-paper-warm border-t border-paper-border flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-charcoal-muted shrink-0 text-[10px] uppercase">Gợi ý câu hỏi:</span>
          {[
            'Vì sao Chùa Một Cột có dáng đóa sen?',
            'Hệ mộng gỗ 24 chi tiết ghép thế nào?',
            'Ý nghĩa kết hợp in 3D với quét mã QR?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendPrompt(prompt)}
              className="px-2.5 py-1 bg-paper border border-paper-border hover:border-brass hover:text-brass text-charcoal shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-paper border-t border-paper-border flex items-center gap-3">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Hỏi hướng dẫn viên AI về kiến trúc, lịch sử, kỹ nghệ in 3D..."
            className="flex-1 px-4 py-3 bg-paper-warm border border-paper-border text-xs focus:outline-none focus:border-brass text-charcoal placeholder:text-charcoal-muted font-sans"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-forest text-paper hover:bg-brass transition-colors duration-150 text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 shrink-0"
          >
            <span>Gửi</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

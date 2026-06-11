"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, HelpCircle, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react';

export default function ActivityFour() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  const handleStartPause = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="hd4" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#D9D9D9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Step Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <span className="font-mono text-5xl md:text-6xl font-bold text-[#D9D9D9] leading-none">04</span>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] block">Bước 4: Giải quyết vấn đề thực tế (Kolb - Vận dụng)</span>
              <h2 className="font-display font-medium text-2xl md:text-3xl text-[#111111] tracking-tight">
                HĐ4 — Thử tài giải cứu mẻ sữa chua hỏng
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#444444] max-w-3xl leading-relaxed mt-2">
            Học đi đôi với hành! Các em hãy cùng chia nhóm thảo luận để giải cứu một mẻ sữa chua bị bỏ quên không ủ ấm. Bật đồng hồ đếm ngược 5 phút và bắt đầu tranh luận nhanh nhất nào.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Problem Case Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#D9D9D9] rounded-none p-6 sm:p-8 space-y-6 shadow-none">
              
              {/* Scenario Label Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-none bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                  🔥 TÌNH HUỐNG THẢO LUẬN LỚP 5
                </span>
                <span className="text-[10px] text-[#444444] font-mono uppercase tracking-wider font-bold">Điểm số: +50đ</span>
              </div>

              {/* The Case content */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-lg md:text-xl text-[#111111] leading-snug">
                  "Bài toán giải cứu mẻ Sữa Chua bị quên ủ ấm lúc ban đầu" 🥛🔍
                </h3>
                
                <p className="text-xs text-[#444444] leading-relaxed">
                  Một bạn học sinh hăm hở chuẩn bị nguyên vật liệu rất chu đáo, khuấy miền sữa ấm đều một chiều và dập hũ kín kẽ. Tuy nhiên, do vội đá bóng cùng các bạn học, bạn đã <strong>bỏ quên không rót nước nóng xung quanh</strong> và <strong>không bọc kín thùng xốp</strong> giữ ấm suốt 4 tiếng đầu tiên.
                </p>

                <div className="p-5 bg-[#FAFAFA] border-2 border-black rounded-none text-xs leading-relaxed text-black space-y-1.5">
                  <div className="font-mono font-bold uppercase tracking-wide">💬 Trọng tâm thảo luận nhóm:</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Điều hại gì sẽ xảy ra với lượng trực khuẩn mồi và tính đông tụ của hũ?</li>
                    <li>Chúng ta có thể vận dụng mẹo nhiệt học nào để "giải cứu" mẻ sữa chua chậm phát triển đó?</li>
                  </ul>
                </div>
              </div>

              {/* Buttons controls for Hint and Answer */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    fetch('/api/progress', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stepKey: 'hd4' }) }).catch(console.error);
                  }}
                  className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    showHint 
                      ? 'bg-black text-white border border-black' 
                      : 'bg-white text-black border border-black hover:bg-neutral-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showHint ? 'ẨN GỢI Ý' : 'XEM GỢI Ý'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowAnswer(!showAnswer);
                    fetch('/api/progress', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stepKey: 'hd4' }) }).catch(console.error);
                  }}
                  className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    showAnswer 
                      ? 'bg-black text-white border border-black' 
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showAnswer ? 'ẨN ĐÁP ÁN' : 'BẬT XEM ĐÁP ÁN'}</span>
                </button>
              </div>

              {/* Animated Hints Panel */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 rounded-none bg-[#FAFAFA] border border-black text-xs space-y-2.5">
                      <h4 className="font-mono font-bold text-black uppercase tracking-wider flex items-center text-[10px]">
                        <BookOpen className="w-4 h-4 mr-1.5 text-black" /> GỢI Ý TƯ DUY CHO NHÓM HỌC SINH:
                      </h4>
                      <ul className="list-none space-y-2 text-[#444444] text-[11px]">
                        <li className="flex items-start">
                          <span className="text-[#111111] font-mono mr-1.5 font-bold">1.</span>
                          <span><strong>Nhiệt độ tối ưu:</strong> Hãy nghĩ về nhiệt độ ưa thích của trực khuẩn Lactic để lên men cực đại. Khoảng nhiệt độ ủ ấm 40°C - 45°C có vai trò gì?</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#111111] font-mono mr-1.5 font-bold">2.</span>
                          <span><strong>Hoạt động ngủ đông:</strong> Nhiệt độ phòng bình thường lỏng lẽo sẽ làm vi sinh béo ngậy làm chậm rớt tốc độ sinh Axit Lactic ra sao?</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#111111] font-mono mr-1.5 font-bold">3.</span>
                          <span><strong>Ủ ấm bù:</strong> Nếu sưởi ấm nóng gấp lại về sau, lượng vi khuẩn có thể "bừng tỉnh" hoạt bát trở lại không?</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Answer Panel */}
              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 rounded-none bg-[#111111] text-white border border-black text-xs space-y-3.5">
                      <h4 className="font-mono font-bold uppercase tracking-widest flex items-center text-[10px] text-white">
                        ⚡ KẾT LUẬN TIÊU CHUẨN KHOA HỌC:
                      </h4>
                      <p className="leading-relaxed text-[#D9D9D9] text-[11px]">
                        Nếu lỡ quên ủ ấm lúc ban đầu khiến nhiệt độ hạ thấp ngang nhiệt độ phòng thường, <strong>vi khuẩn Lactic mầm mồi sẽ hoạt động cực kỳ yếu hoặc chuyển sang tạm thời ngủ đông</strong>. Điều này khiến quá trình đổi đường lactose thành axit Lactic bị đình trệ, sữa không dẻo đặc tự nhiên.
                      </p>
                      <p className="leading-relaxed font-mono text-[10px] uppercase tracking-wider text-white">
                        🛠️ PHƯƠNG PHÁP GIẢI CỨU SỮA CHUA NỮA CHỪNG:
                      </p>
                      <ul className="list-decimal list-inside space-y-2 bg-transparent p-4 rounded-none border border-[#444444] text-[#D9D9D9] text-[11px]">
                        <li><strong>Thay nước ấm lập tức:</strong> Châm ngay nước mới khoảng 45°C vào đáy hũ bao quanh để đánh thức tế bào Lactic.</li>
                        <li><strong>Cộng thêm thời gian ủ bù:</strong> Tiếp tục kiên trì bọc chăn/giữ nhiệt kín suốt 6 - 8 tiếng ròng từ lúc gia nhiệt mới.</li>
                        <li><strong>Đóng nắp an toàn vệ sinh:</strong> Tránh mở nắp quá nhiều lần để bụi hay khuẩn dại lọt vào làm hỏng mẻ sữa hũ.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Classroom Discussion Countdown Timer (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D9D9D9] rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-8">
            
            {/* Timer Screen Visual container */}
            <div className="space-y-4">
              <div className="border-b border-[#D9D9D9] pb-3 text-center">
                <h3 className="font-mono text-xs font-bold text-[#111111] uppercase tracking-widest">
                  ⏰ ĐỒNG HỒ ĐẾM NGƯỢC THẢO LUẬN
                </h3>
                <p className="text-[10px] text-[#444444] mt-1">Canh giờ thảo luận của các nhóm thi đua với nhau:</p>
              </div>

              {/* Huge Timer Screen look */}
              <div className="p-8 bg-black text-white rounded-none border border-black flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                
                {/* Simulated Digital LED screen backdrop grids */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <span className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest tabular-nums relative z-10 select-none">
                  {formatTime(timeLeft)}
                </span>

                {/* Progress bar boundary */}
                <div className="w-full bg-[#111111] h-1 rounded-none overflow-hidden relative z-10 border border-neutral-800">
                  <div 
                    className="h-full bg-white transition-all duration-1000"
                    style={{ width: `${(timeLeft / 300) * 100}%` }}
                  />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A3A3A3] relative z-10">
                  {timeLeft === 0 ? '🚫 Hết giờ thảo luận!' : timerRunning ? '⚡ ĐỒNG HỒ ĐANG CHẠY' : '⏸️ ĐANG TẠM DỪNG'}
                </span>
              </div>

              {/* Timer Control panel */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleStartPause}
                  className={`py-3 px-4 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    timerRunning
                      ? 'bg-[#B00020] text-white'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>TẠM DỪNG</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-white" />
                      <span>BẮT ĐẦU Ủ GIỜ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="py-3 px-4 bg-white text-black border border-black text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#F2F2F2] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>ĐẶT LẠI 5:00</span>
                </button>
              </div>
            </div>

            {/* Scientific hint summary */}
            <div className="p-5 bg-white border border-black rounded-none text-xs space-y-2.5">
              <div className="flex items-center space-x-2 text-black">
                <AlertCircle className="w-4 h-4 text-black shrink-0" />
                <span className="font-mono font-bold text-[10px] uppercase tracking-widest">PHƯƠNG PHÁP CHỦ ĐỘNG KOLB</span>
              </div>
              <p className="text-[11px] text-[#444444] leading-relaxed font-sans">
                Hoạt động thảo luận tranh luận tăng trưởng tối đa năng lực <strong>Vận Dụng Trực Tiếp</strong> trong đời sống. Học sinh tự lý giải, tháo gỡ điểm nóng sữa chua hỏng để biến lý thuyết khô khan thành bài học vô cùng dồi dào kinh nghiệm cá nhân lý thú!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


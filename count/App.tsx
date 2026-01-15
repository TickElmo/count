
import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Calendar, Star, Info } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import PetalsEffect from './components/PetalsEffect';

const TARGET_DATE = new Date('2026-01-18T18:30:00'); // 設定為 2026 年 1 月 18 日 18:30

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 雖然無法直接獲取 Suno 的音訊流（因 CORS 與授權），
  // 我們模擬一個音樂播放體驗，並提供 Suno 連結。
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Auto-play blocked"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden">
      {/* 背景圖片 - 使用與用戶上傳風格相似的夢幻奇幻場景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')`,
          filter: 'brightness(0.7) saturate(1.2)'
        }}
      />
      
      {/* 漸層遮罩增加層次感 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#1a1c2c]/40" />
      <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px]" />

      {/* 飄零花瓣效果 */}
      <PetalsEffect />

      {/* 主要內容區 */}
      <main className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="mb-4 opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-light tracking-[0.2em]">
            <Star className="w-3 h-3 text-yellow-200 fill-yellow-200" />
            冒險的終點，亦是生命的起點
            <Star className="w-3 h-3 text-yellow-200 fill-yellow-200" />
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-calligraphy mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] tracking-wider">
          葬送的芙莉蓮
        </h1>

        <div className="mb-12">
          <CountdownTimer targetDate={TARGET_DATE} />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-xl md:text-2xl font-light text-blue-100/90 tracking-widest bg-black/20 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/5">
            <Calendar className="w-5 h-5" />
            2026 . 01 . 18 | 18 : 30 上映
          </div>

          <div className="flex gap-4">
            <button 
              onClick={toggleMusic}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/30 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 shadow-lg"
              title="播放/暫停背景音樂"
            >
              {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-white/50" />}
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded text-xs whitespace-nowrap">
                {isPlaying ? '暫停播放' : '播放背景音效'}
              </div>
            </button>

            <a 
              href="https://suno.com/s/Rgkh6HtRoRSTu8h3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/40 to-purple-600/40 border border-white/20 backdrop-blur-md hover:from-blue-600/60 hover:to-purple-600/60 transition-all duration-300"
            >
              <Music className="w-5 h-5" />
              <span>聽聽 Suno 指定音樂</span>
            </a>

            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              <Info className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      {/* 隱藏的音訊標籤 - 播放一個柔和的背景氛圍音樂作為模擬 */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      {/* 底部裝飾與版權 */}
      <footer className="absolute bottom-8 left-0 right-0 z-10 text-center opacity-60">
        <p className="text-xs tracking-[0.3em] font-light">
          © {new Date().getFullYear()} 葬送的芙莉蓮 非官方倒數網站
        </p>
      </footer>

      {/* 資訊彈窗 */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#1a1c2c] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-calligraphy mb-4">關於本站</h3>
            <p className="text-blue-100/70 leading-relaxed mb-6">
              這是一個為《葬送的芙莉蓮》製作的專屬倒數頁面。
              視覺設計靈感來自於「蒼月草」的花海與旅途中的星空。
              <br/><br/>
              期待著與你一起見證芙莉蓮的下一段旅程。
            </p>
            <div className="text-sm text-blue-200/50">
              * 指定音樂請點擊按鈕跳轉至 Suno 平台聆聽。
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default App;

import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import QuizNavigation from "@/components/QuizNavigation";
import { useAudio } from "@/hooks/useAudio";
import { spaceBg } from "@/assets/placeholder";

const spaceshipImg = "/pesawat.png";
const meteorImg = "/meteor.png";

// Soal Penjumlahan Bilangan Bulat
const quizQuestions = [
  {
    question: "Urutan naik (dari yang terkecil ke yang terbesar) yang paling tepat dari bilangan -15, -30, 12 adalah ...",
    options: ["-15, -30, 12", "-30, 12, -15", "-30, -15, 12", "12, -15, -30"],
    correctIndex: 2,
  },
  {
    question: "Berapakah nilai dari hasil operasi 32 + (-45)?",
    options: ["-77", "77", "-13", "13"],
    correctIndex: 2,
  },
  {
    question: "Berapakah nilai dari hasil penjumlahan -18 + (-14)?",
    options: ["-4", "-32", "4", "32"],
    correctIndex: 1,
  },
  {
    question: "Pada suatu pagi, suhu di sebuah ruangan pendingin adalah -3°C. Berapa derajat suhu di ruangan tersebut jika mengalami kenaikan sebesar 8°C?",
    options: ["11°C", "-11°C", "5°C", "-5°C"],
    correctIndex: 2,
  },
  {
    question: "Suhu sebuah ruangan biasa tercatat 28°C. Suhu di dalam lemari pembeku (freezer) 35°C lebih rendah dari suhu ruangan tersebut. Berapa suhu di dalam lemari pembeku saat ini?",
    options: ["-63°C", "7°C", "-7°C", "63°C"],
    correctIndex: 2,
  },
];

interface MeteorState {
  id: number;
  x: number;
  label: string;
  hit: boolean;
  correct: boolean;
}

interface LaserState {
  fromX: number;
  toX: number;
  active: boolean;
  progress: number;
}

const PenjumlahanGamePage = () => {
  const navigate = useNavigate();
  const { playLaser, playExplosion, playCorrect, startBgMusic, stopBgMusic } = useAudio();

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shipX, setShipX] = useState(50);
  const [laser, setLaser] = useState<LaserState | null>(null);
  const [meteors, setMeteors] = useState<MeteorState[]>([]);
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; answer?: string } | null>(null);
  const [locked, setLocked] = useState(false);
  const animRef = useRef<number>(0);

  const setupMeteors = useCallback((qIndex: number) => {
    const q = quizQuestions[qIndex];
    const count = q.options.length;
    const spacing = 80 / (count + 1);
    setMeteors(
      q.options.map((opt, i) => ({
        id: i,
        x: 10 + spacing * (i + 1),
        label: opt,
        hit: false,
        correct: i === q.correctIndex,
      }))
    );
    setShipX(50);
    setLaser(null);
    setFeedback(null);
    setLocked(false);
  }, []);

  const handleStart = () => {
    setStarted(true);
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    startBgMusic();
    setupMeteors(0);
  };

  const handleMeteorClick = useCallback(
    (meteor: MeteorState) => {
      if (locked || meteor.hit) return;
      setLocked(true);
      setShipX(meteor.x);
      playLaser();

      setTimeout(() => {
        setLaser({ fromX: meteor.x, toX: meteor.x, active: true, progress: 0 });
        let p = 0;
        const step = () => {
          p += 0.03;
          setLaser((prev) => prev ? { ...prev, progress: Math.min(p, 1) } : null);
          if (p < 1) {
            animRef.current = requestAnimationFrame(step);
          } else {
            playExplosion();
            setMeteors((prev) => prev.map((m) => (m.id === meteor.id ? { ...m, hit: true } : m)));

            if (meteor.correct) {
              playCorrect();
              setScore((s) => s + 20);
              setFeedback({ type: "correct" });
            } else {
              const correctAnswer = quizQuestions[currentQ].options[quizQuestions[currentQ].correctIndex];
              setFeedback({ type: "wrong", answer: correctAnswer });
            }

            setTimeout(() => {
              setLaser(null);
              if (currentQ + 1 < quizQuestions.length) {
                setCurrentQ((q) => {
                  const next = q + 1;
                  setupMeteors(next);
                  return next;
                });
              } else {
                setFinished(true);
                stopBgMusic();
              }
            }, 1500);
          }
        };
        animRef.current = requestAnimationFrame(step);
      }, 500);
    },
    [locked, currentQ, playLaser, playExplosion, playCorrect, setupMeteors, stopBgMusic]
  );

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current);
      stopBgMusic();
    };
  }, [stopBgMusic]);

  const [floatOffset, setFloatOffset] = useState(0);
  useEffect(() => {
    if (!started || finished) return;
    let id: number;
    let t = 0;
    const anim = () => {
      t += 0.02;
      setFloatOffset(Math.sin(t) * 8);
      id = requestAnimationFrame(anim);
    };
    id = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(id);
  }, [started, finished]);

  if (!started) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <img src={spaceBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80" />
        <Starfield />
        <QuizNavigation />
        
        {/* Floating Meteors Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Meteor 1 - Top Left */}
          <div className="absolute top-[10%] left-[8%] animate-float-slow">
            <img src={meteorImg} alt="" className="w-12 h-12 md:w-16 md:h-16 opacity-60 drop-shadow-[0_0_15px_rgba(255,100,50,0.5)]" />
          </div>
          {/* Meteor 2 - Top Right */}
          <div className="absolute top-[15%] right-[12%] animate-float-medium">
            <img src={meteorImg} alt="" className="w-10 h-10 md:w-14 md:h-14 opacity-50 drop-shadow-[0_0_12px_rgba(255,80,40,0.5)]" />
          </div>
          {/* Meteor 3 - Mid Left */}
          <div className="absolute top-[40%] left-[5%] animate-float-fast">
            <img src={meteorImg} alt="" className="w-8 h-8 md:w-12 md:h-12 opacity-40 drop-shadow-[0_0_10px_rgba(255,60,30,0.5)]" />
          </div>
          {/* Meteor 4 - Mid Right */}
          <div className="absolute top-[35%] right-[6%] animate-float-slow">
            <img src={meteorImg} alt="" className="w-14 h-14 md:w-18 md:h-18 opacity-55 drop-shadow-[0_0_18px_rgba(255,90,45,0.5)]" />
          </div>
          {/* Meteor 5 - Bottom Left */}
          <div className="absolute bottom-[20%] left-[10%] animate-float-medium">
            <img src={meteorImg} alt="" className="w-9 h-9 md:w-13 md:h-13 opacity-45 drop-shadow-[0_0_12px_rgba(255,70,35,0.5)]" />
          </div>
          {/* Meteor 6 - Bottom Right */}
          <div className="absolute bottom-[25%] right-[8%] animate-float-fast">
            <img src={meteorImg} alt="" className="w-11 h-11 md:w-15 md:h-15 opacity-50 drop-shadow-[0_0_14px_rgba(255,85,40,0.5)]" />
          </div>
          
          {/* Spaceship Decoration */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 animate-hover-ship">
            <img src={spaceshipImg} alt="" className="w-20 h-24 md:w-28 md:h-32 opacity-70 drop-shadow-[0_0_25px_rgba(0,200,255,0.4)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-10 animate-flame">
              <div className="w-full h-full rounded-full bg-gradient-to-t from-cyan-400 via-cyan-400/50 to-transparent blur-sm" />
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center animate-slide-up px-4">
          {/* Main Title */}
          <div className="mb-2">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,200,255,0.5)]">
                MATH GAME ARENA
              </span>
            </h1>
          </div>
          
          {/* NUMATIK Subtitle */}
          <div className="mb-6">
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-[0.2em]">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,180,0,0.6)]">
                NUMATIK
              </span>
            </h2>
          </div>

          {/* Topic Badge */}
          <div className="inline-block mb-8">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 backdrop-blur-sm">
              <span className="font-display text-sm md:text-base font-bold text-cyan-300 tracking-wide">
                PENJUMLAHAN BILANGAN BULAT
              </span>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="bg-card/70 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-[0_0_30px_rgba(0,200,255,0.15)]">
            <h3 className="font-display text-lg font-bold text-cyan-400 mb-4 flex items-center justify-center gap-2">
              <span className="text-xl">&#128640;</span> CARA BERMAIN <span className="text-xl">&#128640;</span>
            </h3>
            <ul className="text-left space-y-3 font-body text-sm text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">1</span>
                <span>Baca soal matematika yang muncul di bawah layar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">2</span>
                <span>Cari jawaban yang <strong className="text-cyan-300">BENAR</strong> pada meteor yang jatuh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">3</span>
                <span><strong className="text-yellow-300">KLIK</strong> meteor tersebut untuk menembak!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">4</span>
                <span>Setiap jawaban benar mendapat <strong className="text-green-400">+20 poin</strong></span>
              </li>
            </ul>
          </div>

          {/* Pulsing Start Button */}
          <button 
            onClick={handleStart} 
            className="relative font-display text-xl md:text-2xl px-14 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-black tracking-wider cursor-pointer shadow-[0_0_40px_rgba(0,200,255,0.5)] hover:shadow-[0_0_60px_rgba(0,200,255,0.7)] transition-shadow duration-300 animate-pulse-scale"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>&#9658;</span> MULAI GAME <span>&#9658;</span>
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <div className="mt-8">
            <button onClick={() => navigate("/math-game-arena/kelas-7/bilangan-bulat")} className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer font-body">
              &larr; Kembali ke Bilangan Bulat
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const maxScore = quizQuestions.length * 20;
    const pct = Math.round((score / maxScore) * 100);
    const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <img src={spaceBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <Starfield />
        <QuizNavigation />
        <div className="relative z-10 text-center animate-slide-up">
          <h1 className="font-display text-3xl font-bold text-primary text-glow-cyan mb-4">MISI SELESAI!</h1>
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-8 max-w-sm mx-auto mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`text-4xl transition-all duration-500 ${s <= stars ? "opacity-100 scale-100" : "opacity-30 scale-75"}`}>&#11088;</span>
              ))}
            </div>
            <p className="font-display text-5xl font-black text-accent text-glow-accent mb-2">{score}</p>
            <p className="text-muted-foreground text-sm font-body">dari {maxScore} poin ({pct}%)</p>
            <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-neon rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-4 font-display text-sm text-foreground">
              {pct >= 80 ? "Luar biasa!" : pct >= 60 ? "Bagus!" : "Pelajari lagi materinya!"}
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={handleStart} className="font-display text-sm px-6 py-2 rounded-lg bg-primary text-primary-foreground cursor-pointer hover:opacity-90">Ulangi</button>
            <button onClick={() => navigate("/math-game-arena/kelas-7/bilangan-bulat")} className="font-display text-sm px-6 py-2 rounded-lg bg-muted text-foreground cursor-pointer hover:opacity-90">Kembali</button>
            <button onClick={() => navigate("/menu")} className="font-display text-sm px-6 py-2 rounded-lg bg-muted text-foreground cursor-pointer hover:opacity-90">Menu</button>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentQ];

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
      <img src={spaceBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <Starfield />
      <QuizNavigation />

      {/* HUD - centered scoreboard */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center px-4 py-3">
        <div className="font-display text-xs text-muted-foreground mb-1">
          SOAL {currentQ + 1}/{quizQuestions.length}
        </div>
        <div className="font-display text-xl md:text-2xl font-bold text-accent text-glow-accent">
          SKOR: {score}
        </div>
      </div>

      {/* Question bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
        <div className="bg-card/90 backdrop-blur border border-primary/30 rounded-xl px-6 py-3 max-w-2xl mx-auto box-glow-cyan text-center">
          <p className="font-body text-sm md:text-base text-foreground">{q.question}</p>
        </div>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className={`rounded-2xl px-8 py-6 text-center animate-scale-in ${
            feedback.type === "correct" ? "bg-primary/90 backdrop-blur" : "bg-destructive/90 backdrop-blur"
          }`}>
            {feedback.type === "correct" ? (
              <>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3].map((s) => (
                    <span key={s} className="text-3xl animate-bounce" style={{ animationDelay: `${s * 100}ms` }}>&#11088;</span>
                  ))}
                </div>
                <p className="font-display text-xl font-black text-primary-foreground">JAWABAN BENAR</p>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-black text-destructive-foreground mb-1">JAWABAN SALAH</p>
                <p className="font-body text-sm text-destructive-foreground/80">Jawaban: {feedback.answer}</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Meteors */}
      <div className="absolute top-[18%] left-0 right-0 z-10 h-[30%]">
        {meteors.map((m) => (
          <button key={m.id} onClick={() => handleMeteorClick(m)} disabled={m.hit || locked}
            className="absolute transition-all duration-500 cursor-pointer disabled:cursor-default"
            style={{
              left: `${m.x}%`, top: "50%",
              transform: `translate(-50%, ${-50 + floatOffset * (m.id % 2 === 0 ? 1 : -1)}%) ${m.hit ? "scale(0)" : "scale(1)"}`,
              opacity: m.hit ? 0 : 1,
              transition: m.hit ? "all 0.3s ease-out" : "transform 0.5s ease",
            }}>
            <div className="relative">
              <img src={meteorImg} alt="meteor" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(255,60,30,0.6)]" style={{ mixBlendMode: "screen", background: "transparent" }} />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[9px] md:text-[10px] font-bold text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1 text-center leading-tight">{m.label}</span>
            </div>
            {m.hit && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-accent/60 animate-ping" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Laser */}
      {laser && laser.active && (
        <div className="absolute z-15 pointer-events-none" style={{
          left: `${laser.fromX}%`, bottom: "18%", transform: "translateX(-50%)",
          height: `${laser.progress * 55}%`, width: 6,
          background: "linear-gradient(to top, hsl(50, 100%, 55%), hsl(50, 100%, 80%, 0.3))",
          boxShadow: "0 0 15px hsl(50, 100%, 55%), 0 0 30px hsl(50, 100%, 55%, 0.5)",
          borderRadius: 3, transformOrigin: "bottom center",
        }} />
      )}

      {/* Spaceship */}
      <div className="absolute bottom-[12%] z-10 transition-all duration-500 ease-out" style={{ left: `${shipX}%`, transform: "translateX(-50%)" }}>
        <div className="relative">
          <img src={spaceshipImg} alt="spaceship" className="w-16 h-20 md:w-20 md:h-24 drop-shadow-[0_0_20px_rgba(0,180,255,0.4)]" style={{ mixBlendMode: "screen", background: "transparent" }} />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-8 animate-flame">
            <div className="w-full h-full rounded-full bg-gradient-to-t from-primary via-primary/50 to-transparent blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenjumlahanGamePage;

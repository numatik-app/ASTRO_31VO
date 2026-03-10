import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target, AlertCircle } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const PenguranganBilanganBulatPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(["intro", "konsep", "contoh", "sifat"]);

  const toggleSection = (section: string) => {
    playPopSound();
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          PENGURANGAN BILANGAN BULAT
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          Kelas 7 - Bilangan Bulat - Materi Matematika
        </p>

        <div className="flex flex-col gap-4 animate-slide-up">
          {/* Section: Pengantar - Kunci Rahasia Pengurangan */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("intro")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-body font-semibold text-white">Kunci Rahasia Pengurangan Bilangan Bulat</span>
              </div>
              {expandedSections.includes("intro") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("intro") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Pernah bingung saat menghitung <InlineMath math="5 - (-3)" />? Tenang, kamu tidak sendirian! Pengurangan bilangan bulat memang terlihat tricky, tapi sebenarnya ada <strong className="text-primary">satu trik sederhana</strong> yang akan membuatmu jago menyelesaikan soal apapun.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-lg p-4">
                  <p className="font-body text-sm font-bold text-yellow-300 mb-2">Trik Emas Pengurangan:</p>
                  <p className="font-body text-sm text-yellow-100 leading-relaxed">
                    <strong>Mengurangi suatu bilangan sama dengan menambah dengan lawan bilangan tersebut!</strong>
                  </p>
                  <div className="bg-slate-900/50 rounded p-3 mt-3">
                    <BlockMath math="a - b = a + (-b)" />
                  </div>
                  <p className="font-body text-xs text-yellow-200/70 mt-2">
                    Artinya, kamu cukup ubah tanda pengurangan menjadi penjumlahan, lalu balik tanda bilangan pengurangnya!
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    <strong>Ilustrasi:</strong> Bayangkan kamu punya uang Rp100.000 dan harus membayar hutang Rp30.000. Secara matematis, ini ditulis <InlineMath math="100.000 - 30.000" />. Tapi, bisa juga dipikirkan sebagai: uangmu "bertambah" dengan nilai negatif (hutang), yaitu <InlineMath math="100.000 + (-30.000) = 70.000" />.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Ringkasan Intisari */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("konsep")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-400" />
                <span className="font-body font-semibold text-white">Ringkasan Intisari: Konsep Pengurangan</span>
              </div>
              {expandedSections.includes("konsep") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("konsep") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Mari kita buktikan rumus tadi dengan <strong className="text-primary">garis bilangan</strong>. Perhatikan dua kasus berikut:
                </p>

                {/* Kasus 1 */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-blue-300 mb-2">Kasus 1: <InlineMath math="6 - 4 = ?" /></p>
                  <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-xs text-center overflow-x-auto mb-3">
                    <p className="text-white/60 mb-1">Dari 6, mundur 4 langkah ke kiri:</p>
                    <p className="text-primary whitespace-nowrap">
                      {"0 ─ 1 ─ 2 ─ [6-4=2] ─ 3 ─ 4 ─ 5 ─ [start:6]"}
                    </p>
                  </div>
                  <p className="font-body text-sm text-blue-200">
                    Hasilnya sama dengan <InlineMath math="6 + (-4) = 2" />
                  </p>
                  <div className="bg-slate-900/50 rounded p-2 mt-2">
                    <BlockMath math="6 - 4 = 6 + (-4) = 2" />
                  </div>
                </div>

                {/* Kasus 2 */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-2">Kasus 2: <InlineMath math="4 - (-2) = ?" /></p>
                  <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-xs text-center overflow-x-auto mb-3">
                    <p className="text-white/60 mb-1">Mengurangi negatif = menambah positif!</p>
                    <p className="text-primary whitespace-nowrap">
                      {"0 ─ 1 ─ 2 ─ 3 ─ [start:4] ─ 5 ─ [4+2=6]"}
                    </p>
                  </div>
                  <p className="font-body text-sm text-purple-200">
                    Hasilnya sama dengan <InlineMath math="4 + 2 = 6" />
                  </p>
                  <div className="bg-slate-900/50 rounded p-2 mt-2">
                    <BlockMath math="4 - (-2) = 4 + 2 = 6" />
                  </div>
                </div>

                {/* Rumus Utama */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-3">Pola Pengurangan Bilangan Bulat:</p>
                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Positif dikurangi Positif:</p>
                      <BlockMath math="a - b = a + (-b)" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Positif dikurangi Negatif (hasilnya pasti lebih besar!):</p>
                      <BlockMath math="a - (-b) = a + b" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Negatif dikurangi Positif:</p>
                      <BlockMath math="-a - b = -a + (-b) = -(a + b)" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3">
                      <p className="text-white/70 text-xs mb-1">Negatif dikurangi Negatif:</p>
                      <BlockMath math="-a - (-b) = -a + b" />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200 leading-relaxed">
                    <strong>Tips Pro:</strong> Setiap kali ketemu tanda "minus-minus" <InlineMath math="- (-)" />, langsung ubah jadi "plus" <InlineMath math="+" />. Dua negatif yang bertemu akan saling menghilangkan!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Contoh Soal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("contoh")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-blue-400" />
                <span className="font-body font-semibold text-white">Contoh Soal dan Pembahasan</span>
              </div>
              {expandedSections.includes("contoh") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("contoh") && (
              <div className="px-5 pb-5 space-y-6">
                {/* Contoh 1 - Mudah */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Hitunglah hasil pengurangan berikut:
                    </p>
                    <div className="space-y-1 ml-4">
                      <p className="text-white/80">a. <InlineMath math="-8 - 12" /></p>
                      <p className="text-white/80">b. <InlineMath math="6 - (-10)" /></p>
                    </div>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-4 font-body text-sm text-white/80">
                      {/* Soal a */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">a. <InlineMath math="-8 - 12" /></p>
                        <p className="mb-1"><strong>Langkah 1:</strong> Ubah pengurangan menjadi penjumlahan dengan lawan bilangan.</p>
                        <BlockMath math="-8 - 12 = -8 + (-12)" />
                        <p className="mb-1"><strong>Langkah 2:</strong> Kedua bilangan negatif, jumlahkan nilainya dan beri tanda negatif.</p>
                        <BlockMath math="-8 + (-12) = -(8 + 12) = -20" />
                        <p className="text-primary font-semibold">Jawaban: <InlineMath math="-20" /></p>
                      </div>
                      {/* Soal b */}
                      <div className="bg-slate-900/30 rounded p-3">
                        <p className="font-semibold text-white mb-2">b. <InlineMath math="6 - (-10)" /></p>
                        <p className="mb-1"><strong>Langkah 1:</strong> Tanda minus-minus berubah jadi plus!</p>
                        <BlockMath math="6 - (-10) = 6 + 10" />
                        <p className="mb-1"><strong>Langkah 2:</strong> Jumlahkan kedua bilangan positif.</p>
                        <BlockMath math="6 + 10 = 16" />
                        <p className="text-primary font-semibold">Jawaban: <InlineMath math="16" /></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contoh 2 - Sedang */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Hitunglah hasil dari <InlineMath math="-14 - 15 - (-21)" />
                    </p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Ubah semua pengurangan menjadi penjumlahan dengan lawan bilangan.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="-14 - 15 - (-21) = -14 + (-15) + 21" />
                      </div>
                      <p><strong>Langkah 2:</strong> Hitung dari kiri ke kanan. Pertama, jumlahkan dua bilangan negatif:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="-14 + (-15) = -(14 + 15) = -29" />
                      </div>
                      <p><strong>Langkah 3:</strong> Kemudian tambahkan dengan 21:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="-29 + 21 = -(29 - 21) = -8" />
                      </div>
                      <p className="text-primary font-semibold">Jawaban: <InlineMath math="-8" /></p>
                    </div>
                  </div>
                </div>

                {/* Contoh 3 - Sulit (Soal Cerita) */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3: Soal Cerita</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Seekor lumba-lumba melompat hingga mencapai ketinggian <InlineMath math="3" /> meter di atas permukaan air laut, kemudian menyelam hingga kedalaman <InlineMath math="7" /> meter di bawah permukaan. Berapa jarak total antara titik tertinggi lompatan dengan titik terendah penyelaman?
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tentukan titik acuan dan nilai masing-masing posisi.</p>
                      <ul className="ml-4 space-y-1 text-white/70">
                        <li>Permukaan air laut = titik nol (0)</li>
                        <li>Ketinggian lompatan = <InlineMath math="+3" /> meter (di atas nol)</li>
                        <li>Kedalaman penyelaman = <InlineMath math="-7" /> meter (di bawah nol)</li>
                      </ul>
                      
                      <div className="bg-slate-800/50 rounded-lg p-3 font-mono text-xs text-center overflow-x-auto">
                        <p className="text-white/60 mb-1">Visualisasi:</p>
                        <p className="text-green-400">+3 meter (puncak lompatan)</p>
                        <p className="text-primary">───────── 0 ───────── (permukaan laut)</p>
                        <p className="text-red-400">-7 meter (dasar penyelaman)</p>
                      </div>

                      <p><strong>Langkah 2:</strong> Hitung jarak = posisi atas dikurangi posisi bawah.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\text{Jarak} = 3 - (-7)" />
                      </div>
                      <p><strong>Langkah 3:</strong> Terapkan rumus pengurangan.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="3 - (-7) = 3 + 7 = 10" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, jarak antara puncak lompatan dengan kedalaman penyelaman adalah <InlineMath math="10" /> meter.</p>
                    </div>
                  </div>
                </div>

                {/* Contoh Bonus - Operasi Campuran */}
                <div className="border-l-4 border-purple-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded">BONUS</span>
                    <span className="font-body font-semibold text-white">Contoh 4: Operasi Campuran</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="font-body text-sm text-white mb-2">
                      Dalam sebuah permainan, seorang anak bermain 5 kali dengan hasil: <InlineMath math="-70" />, <InlineMath math="90" />, <InlineMath math="-30" />, <InlineMath math="40" />, dan <InlineMath math="-50" />. Berapakah total skor yang diperoleh?
                    </p>
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-purple-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tulis penjumlahan semua skor:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="(-70) + 90 + (-30) + 40 + (-50)" />
                      </div>
                      <p><strong>Langkah 2:</strong> Kelompokkan bilangan positif dan negatif:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-2">
                        <p className="text-green-400">Positif: <InlineMath math="90 + 40 = 130" /></p>
                        <p className="text-red-400">Negatif: <InlineMath math="(-70) + (-30) + (-50) = -150" /></p>
                      </div>
                      <p><strong>Langkah 3:</strong> Hitung selisihnya:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="130 + (-150) = 130 - 150 = -20" />
                      </div>
                      <p className="text-primary font-semibold">Jadi, total skor yang diperoleh adalah <InlineMath math="-20" /> (minus 20 poin).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section: Sifat Tertutup */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("sifat")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <span className="font-body font-semibold text-white">Sifat Tertutup pada Pengurangan</span>
              </div>
              {expandedSections.includes("sifat") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("sifat") && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Pernahkah kamu bertanya: "Apakah hasil pengurangan dua bilangan bulat selalu menghasilkan bilangan bulat juga?" Mari kita buktikan!
                </p>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-orange-300 mb-3">Pembuktian:</p>
                  <div className="space-y-2 font-body text-sm text-white/80">
                    <div className="flex items-center gap-3 bg-slate-900/30 rounded p-2">
                      <InlineMath math="12 - 17 = -5" />
                      <span className="text-green-400 text-xs">Hasil: bilangan bulat</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900/30 rounded p-2">
                      <InlineMath math="-6 - 10 = -16" />
                      <span className="text-green-400 text-xs">Hasil: bilangan bulat</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900/30 rounded p-2">
                      <InlineMath math="-2 - (-9) = 7" />
                      <span className="text-green-400 text-xs">Hasil: bilangan bulat</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg p-4">
                  <p className="font-body text-sm font-bold text-green-300 mb-2">Kesimpulan: Sifat Tertutup</p>
                  <p className="font-body text-sm text-green-100 leading-relaxed mb-3">
                    Untuk sembarang bilangan bulat <InlineMath math="a" /> dan <InlineMath math="b" />, jika <InlineMath math="a - b = c" />, maka <InlineMath math="c" /> juga merupakan <strong>bilangan bulat</strong>.
                  </p>
                  <div className="bg-slate-900/50 rounded p-3">
                    <BlockMath math="a, b \in \mathbb{Z} \Rightarrow (a - b) \in \mathbb{Z}" />
                  </div>
                  <p className="font-body text-xs text-green-200/70 mt-2">
                    Sifat ini disebut <strong>sifat tertutup pada pengurangan bilangan bulat</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tips Box */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-5">
            <p className="font-body text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Tips Mengubah Pengurangan ke Penjumlahan
            </p>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-3">
              Dengan mengubah operasi pengurangan menjadi penjumlahan, perhitungan menjadi lebih mudah dan konsisten. Kamu hanya perlu mengingat satu aturan:
            </p>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <p className="font-body text-sm text-cyan-200">
                <strong>"Ubah tanda operasi, balik tanda bilangan pengurang!"</strong>
              </p>
              <div className="mt-2">
                <InlineMath math="a - b \rightarrow a + (-b)" />
              </div>
            </div>
          </div>

          {/* Back Navigation */}
          <button
            onClick={() => {
              playPopSound();
              navigate("/materi-matematika/kelas-7/bilangan-bulat");
            }}
            className="mt-4 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-xl px-6 py-3 text-primary font-body text-sm transition-all duration-300 mx-auto"
          >
            Kembali ke Daftar Materi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenguranganBilanganBulatPage;

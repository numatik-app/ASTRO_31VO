import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target, ArrowRightLeft, Divide } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const BentukDesimalPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(["pecahan-desimal", "konversi-ke-desimal", "konversi-dari-desimal"]);

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
          BENTUK DESIMAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">
          Kelas 7 - Bilangan Rasional - Materi Matematika
        </p>

        <div className="flex flex-col gap-4 animate-slide-up">
          {/* Section 1: Pecahan Desimal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("pecahan-desimal")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-body font-semibold text-white">Memahami Bilangan Desimal</span>
              </div>
              {expandedSections.includes("pecahan-desimal") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("pecahan-desimal") && (
              <div className="px-5 pb-5 space-y-4">
                {/* Ringkasan Intisari */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    <strong className="text-primary">Bilangan desimal</strong> adalah cara lain untuk menuliskan pecahan. Saat ini, bilangan desimal sangat sering digunakan - dari kalkulator, komputer, hingga struk belanja. Bilangan desimal menggunakan <strong>tanda koma (,)</strong> untuk memisahkan bagian bulat dan bagian pecahan.
                  </p>
                </div>

                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Setiap angka dalam bilangan desimal punya <strong className="text-cyan-300">nilai tempat</strong> yang berbeda-beda. Perhatikan contoh berikut:
                </p>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-primary font-mono tracking-wider">2.345,678</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-2 px-2 text-cyan-300 text-left">Angka</th>
                          <th className="py-2 px-2 text-cyan-300 text-left">Nilai Tempat</th>
                          <th className="py-2 px-2 text-cyan-300 text-left">Nilai</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/80">
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-yellow-400">2</td>
                          <td className="py-2 px-2">Ribuan</td>
                          <td className="py-2 px-2"><InlineMath math="2.000" /></td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-yellow-400">3</td>
                          <td className="py-2 px-2">Ratusan</td>
                          <td className="py-2 px-2"><InlineMath math="300" /></td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-yellow-400">4</td>
                          <td className="py-2 px-2">Puluhan</td>
                          <td className="py-2 px-2"><InlineMath math="40" /></td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-yellow-400">5</td>
                          <td className="py-2 px-2">Satuan</td>
                          <td className="py-2 px-2"><InlineMath math="5" /></td>
                        </tr>
                        <tr className="border-b border-border/50 bg-primary/5">
                          <td className="py-2 px-2 font-bold text-primary">,</td>
                          <td className="py-2 px-2 text-primary">Tanda Koma</td>
                          <td className="py-2 px-2 text-primary">Pemisah</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-green-400">6</td>
                          <td className="py-2 px-2">Persepuluhan</td>
                          <td className="py-2 px-2"><InlineMath math="\frac{6}{10}" /></td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2 px-2 font-bold text-green-400">7</td>
                          <td className="py-2 px-2">Perseratusan</td>
                          <td className="py-2 px-2"><InlineMath math="\frac{7}{100}" /></td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 font-bold text-green-400">8</td>
                          <td className="py-2 px-2">Perseribu</td>
                          <td className="py-2 px-2"><InlineMath math="\frac{8}{1000}" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    <strong>Penting:</strong> Bilangan <strong>2.345,678</strong> memiliki <strong>tiga tempat desimal</strong> (3 angka di belakang koma). Semakin banyak angka di belakang koma, semakin detail nilai pecahannya.
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-2">Hubungan Desimal dan Pecahan:</p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <BlockMath math="2345,678 = 2345 + \frac{678}{1000} = 2345\frac{678}{1000}" />
                  </div>
                  <p className="font-body text-sm text-white/70 mt-3 leading-relaxed">
                    Dari sini terlihat bahwa <strong className="text-purple-300">bilangan desimal</strong> bisa dinyatakan sebagai <strong className="text-purple-300">bilangan campuran (pecahan campuran)</strong>, dan sebaliknya!
                  </p>
                </div>

                {/* Contoh Soal Section */}
                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  {/* Contoh 1 - Mudah */}
                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Tentukan nilai tempat angka 5 pada bilangan 23,456!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Identifikasi posisi angka 5</p>
                        <div className="bg-slate-900/50 rounded p-3 font-mono text-center">
                          <p className="text-primary">23,<span className="text-yellow-400 underline">4</span><span className="text-green-400 underline">5</span>6</p>
                          <p className="text-xs text-white/50 mt-1">persepuluhan - perseratusan - perseribu</p>
                        </div>
                        <p><strong>Langkah 2:</strong> Angka 5 berada di posisi ke-2 setelah koma</p>
                        <p><strong>Langkah 3:</strong> Posisi ke-2 setelah koma adalah <strong>perseratusan</strong></p>
                        <p className="text-primary font-semibold">Jadi, nilai tempat angka 5 adalah <InlineMath math="\frac{5}{100}" /> atau perseratusan.</p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 2 - Sedang */}
                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Uraikan bilangan 157,29 ke dalam bentuk penjumlahan berdasarkan nilai tempatnya!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Pisahkan bagian bulat dan desimal</p>
                        <p className="pl-4">Bagian bulat: 157 | Bagian desimal: 29</p>
                        <p><strong>Langkah 2:</strong> Uraikan masing-masing:</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="157,29 = 100 + 50 + 7 + \frac{2}{10} + \frac{9}{100}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Atau bisa ditulis:</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="157,29 = 100 + 50 + 7 + 0,2 + 0,09" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, uraiannya adalah <InlineMath math="100 + 50 + 7 + 0,2 + 0,09" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 3 - Sulit */}
                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Bilangan <InlineMath math="X" /> memiliki 3 di tempat ratusan, 0 di tempat puluhan, 5 di tempat satuan, 4 di tempat persepuluhan, dan 8 di tempat perseratusan. Nyatakan <InlineMath math="X" /> dalam bentuk pecahan campuran!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Susun angka sesuai nilai tempatnya</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="X = 305,48" />
                        </div>
                        <p><strong>Langkah 2:</strong> Pisahkan bagian bulat dan desimal</p>
                        <p className="pl-4">Bagian bulat = 305 | Bagian desimal = 0,48</p>
                        <p><strong>Langkah 3:</strong> Ubah bagian desimal ke pecahan</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,48 = \frac{48}{100} = \frac{12}{25}" />
                        </div>
                        <p><strong>Langkah 4:</strong> Gabungkan menjadi pecahan campuran</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="X = 305\frac{12}{25}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="X = 305\frac{12}{25}" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Konversi Pecahan ke Desimal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("konversi-ke-desimal")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
                <span className="font-body font-semibold text-white">Mengubah Pecahan Menjadi Desimal</span>
              </div>
              {expandedSections.includes("konversi-ke-desimal") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("konversi-ke-desimal") && (
              <div className="px-5 pb-5 space-y-4">
                {/* Ringkasan Intisari */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Ada <strong className="text-primary">dua cara utama</strong> untuk mengubah pecahan menjadi desimal: (1) mengubah penyebut menjadi 10, 100, 1.000, dst, atau (2) melakukan <strong>pembagian langsung</strong> pembilang dengan penyebut.
                  </p>
                </div>

                {/* Metode 1 */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-3">Metode 1: Mengubah Penyebut</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed mb-3">
                    Jika penyebut bisa diubah menjadi 10, 100, atau 1.000 dengan mudah, gunakan cara ini:
                  </p>
                  <div className="bg-slate-900/50 rounded p-4 space-y-3">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="text-center">
                        <BlockMath math="\frac{3}{5} = \frac{3 \times 2}{5 \times 2} = \frac{6}{10} = 0,6" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="text-center">
                        <BlockMath math="\frac{4}{125} = \frac{4 \times 8}{125 \times 8} = \frac{32}{1000} = 0,032" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metode 2 */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-3">Metode 2: Pembagian Langsung</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed mb-3">
                    Jika penyebut <strong>sulit diubah</strong> menjadi 10, 100, atau 1.000 (seperti 3, 7, 11, 13, dst), gunakan cara <strong>membagi pembilang dengan penyebut</strong>:
                  </p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <BlockMath math="\frac{5}{13} = 5 \div 13 = 0,3846..." />
                    <BlockMath math="\frac{7}{11} = 7 \div 11 = 0,6363..." />
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200 leading-relaxed">
                    <strong>Catatan Penting:</strong> Hasil pembagian yang angkanya terus berulang seperti 0,6363... disebut <strong>pecahan desimal berulang</strong>. Bisa ditulis sebagai <InlineMath math="0,\overline{63}" /> (dengan garis di atas angka yang berulang).
                  </p>
                </div>

                {/* Contoh Soal */}
                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  {/* Contoh 1 - Mudah */}
                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan pecahan <InlineMath math="\frac{3}{5}" /> dalam bentuk desimal!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Perhatikan penyebut = 5</p>
                        <p><strong>Langkah 2:</strong> Ubah penyebut menjadi 10 dengan mengalikan 2</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{3}{5} = \frac{3 \times 2}{5 \times 2} = \frac{6}{10}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Ubah ke bentuk desimal</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{6}{10} = 0,6" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="\frac{3}{5} = 0,6" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 2 - Sedang */}
                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan pecahan <InlineMath math="\frac{4}{125}" /> dalam bentuk desimal!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Perhatikan penyebut = 125</p>
                        <p><strong>Langkah 2:</strong> Cari pengali agar penyebut menjadi 1.000</p>
                        <p className="pl-4 text-cyan-300"><InlineMath math="125 \times 8 = 1000" /></p>
                        <p><strong>Langkah 3:</strong> Kalikan pembilang dan penyebut dengan 8</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{4}{125} = \frac{4 \times 8}{125 \times 8} = \frac{32}{1000}" />
                        </div>
                        <p><strong>Langkah 4:</strong> Ubah ke bentuk desimal (3 angka di belakang koma karena penyebut 1000)</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{32}{1000} = 0,032" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="\frac{4}{125} = 0,032" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 3 - Sulit */}
                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan pecahan <InlineMath math="\frac{7}{11}" /> dalam bentuk desimal sampai 4 tempat desimal dengan cara pembagian!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Karena 11 sulit diubah menjadi 10, 100, atau 1.000, gunakan pembagian</p>
                        <p><strong>Langkah 2:</strong> Lakukan pembagian <InlineMath math="7 \div 11" /></p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="7 \div 11 = 0,6363..." />
                          <p className="text-xs text-green-400 mt-2 text-center">Pola berulang: 63</p>
                        </div>
                        <p><strong>Langkah 3:</strong> Hasil pembagian menunjukkan pola berulang 63</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{7}{11} = 0,6363... = 0,\overline{63}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="\frac{7}{11} = 0,6363" /> (sampai 4 tempat desimal)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Konversi Desimal ke Pecahan */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("konversi-dari-desimal")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Divide className="w-5 h-5 text-green-400" />
                <span className="font-body font-semibold text-white">Mengubah Desimal Menjadi Pecahan</span>
              </div>
              {expandedSections.includes("konversi-dari-desimal") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("konversi-dari-desimal") && (
              <div className="px-5 pb-5 space-y-4">
                {/* Ringkasan Intisari */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Untuk mengubah desimal ke pecahan, perhatikan <strong className="text-primary">jumlah angka di belakang koma</strong>. Angka-angka tersebut menjadi pembilang, dan penyebutnya adalah 10, 100, 1.000 (sesuai jumlah angka di belakang koma).
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-3">Aturan Penyebut:</p>
                  <div className="space-y-2 font-body text-sm text-white/80">
                    <p>1 angka di belakang koma = penyebut <strong className="text-cyan-300">10</strong></p>
                    <p>2 angka di belakang koma = penyebut <strong className="text-cyan-300">100</strong></p>
                    <p>3 angka di belakang koma = penyebut <strong className="text-cyan-300">1000</strong></p>
                    <p>dst...</p>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-3">Contoh Cepat:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <BlockMath math="0,7 = \frac{7}{10}" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <BlockMath math="0,35 = \frac{35}{100}" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <BlockMath math="0,125 = \frac{125}{1000}" />
                    </div>
                    <div className="bg-slate-900/50 rounded p-3 text-center">
                      <BlockMath math="4,67 = 4\frac{67}{100}" />
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200 leading-relaxed">
                    <strong>Tips:</strong> Jangan lupa <strong>sederhanakan</strong> pecahan hasil konversi jika memungkinkan! Misalnya <InlineMath math="\frac{35}{100} = \frac{7}{20}" />
                  </p>
                </div>

                {/* Contoh Soal */}
                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  {/* Contoh 1 - Mudah */}
                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 0,6 dalam bentuk pecahan paling sederhana!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Hitung angka di belakang koma = 1 angka</p>
                        <p><strong>Langkah 2:</strong> Tulis sebagai pecahan dengan penyebut 10</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,6 = \frac{6}{10}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Sederhanakan (FPB dari 6 dan 10 adalah 2)</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{6}{10} = \frac{6 \div 2}{10 \div 2} = \frac{3}{5}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="0,6 = \frac{3}{5}" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 2 - Sedang */}
                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 4,67 sebagai pecahan campuran!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Pisahkan bagian bulat dan desimal</p>
                        <p className="pl-4">Bagian bulat = 4 | Bagian desimal = 0,67</p>
                        <p><strong>Langkah 2:</strong> Ubah bagian desimal ke pecahan</p>
                        <p className="pl-4">Ada 2 angka di belakang koma, jadi penyebut = 100</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,67 = \frac{67}{100}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Gabungkan dengan bagian bulat</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="4,67 = 4\frac{67}{100}" />
                        </div>
                        <p className="text-white/60 text-xs">(67 dan 100 tidak punya faktor persekutuan selain 1, jadi sudah sederhana)</p>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="4,67 = 4\frac{67}{100}" /></p>
                      </div>
                    </div>
                  </div>

                  {/* Contoh 3 - Sulit */}
                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 0,000289 sebagai pecahan biasa dalam bentuk paling sederhana!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Hitung angka di belakang koma = 6 angka</p>
                        <p><strong>Langkah 2:</strong> Tulis sebagai pecahan dengan penyebut 1.000.000</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,000289 = \frac{289}{1000000}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Cari FPB dari 289 dan 1.000.000</p>
                        <p className="pl-4 text-cyan-300"><InlineMath math="289 = 17 \times 17 = 17^2" /></p>
                        <p className="pl-4 text-cyan-300"><InlineMath math="1000000 = 10^6 = 2^6 \times 5^6" /></p>
                        <p className="pl-4">FPB = 1 (tidak ada faktor prima yang sama)</p>
                        <p><strong>Langkah 4:</strong> Pecahan sudah dalam bentuk paling sederhana</p>
                        <p className="text-primary font-semibold">Jadi, <InlineMath math="0,000289 = \frac{289}{1000000}" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/materi-matematika/kelas-7/bilangan-rasional"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            Kembali ke Bilangan Rasional
          </button>
        </div>
      </div>
    </div>
  );
};

export default BentukDesimalPage;

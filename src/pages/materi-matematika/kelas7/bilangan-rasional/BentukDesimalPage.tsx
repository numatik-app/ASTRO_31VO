import { useState } from "react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const BentukDesimalPage = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["pengertian", "pecahan-ke-desimal", "desimal-ke-pecahan"]);

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
          {/* Section 1: Memahami Bilangan Desimal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("pengertian")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span className="font-body font-semibold text-white">Memahami Bilangan Desimal</span>
              </div>
              {expandedSections.includes("pengertian") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("pengertian") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    <strong className="text-primary">Bilangan desimal</strong> adalah cara penulisan bilangan menggunakan tanda koma untuk memisahkan bagian bulat dan bagian pecahan. Sistem ini sangat penting dalam kehidupan sehari-hari, terutama di kalkulator dan komputer.
                  </p>
                </div>

                <p className="font-body text-sm text-white/80 leading-relaxed">
                  Dalam bilangan desimal, setiap posisi angka memiliki nilai tempat tertentu:
                </p>

                <div className="bg-slate-800/50 rounded-lg p-4 overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="text-cyan-300 border-b border-white/20">
                        <th className="py-2 px-2 text-left">Posisi</th>
                        <th className="py-2 px-2">Ribuan</th>
                        <th className="py-2 px-2">Ratusan</th>
                        <th className="py-2 px-2">Puluhan</th>
                        <th className="py-2 px-2">Satuan</th>
                        <th className="py-2 px-2 text-yellow-300">,</th>
                        <th className="py-2 px-2">Persepuluhan</th>
                        <th className="py-2 px-2">Perseratusan</th>
                        <th className="py-2 px-2">Perseribu</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80 text-center">
                      <tr>
                        <td className="py-2 px-2 text-left text-primary">Contoh</td>
                        <td className="py-2 px-2">2</td>
                        <td className="py-2 px-2">3</td>
                        <td className="py-2 px-2">4</td>
                        <td className="py-2 px-2">5</td>
                        <td className="py-2 px-2 text-yellow-300">,</td>
                        <td className="py-2 px-2">6</td>
                        <td className="py-2 px-2">7</td>
                        <td className="py-2 px-2">8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    Bilangan 2345,678 dapat diuraikan sebagai:
                  </p>
                  <div className="bg-slate-900/50 rounded p-3 mt-2">
                    <BlockMath math="2345 + \frac{6}{10} + \frac{7}{100} + \frac{8}{1000}" />
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-purple-300 leading-relaxed">
                    <strong>Tips:</strong> Banyaknya angka di belakang koma menunjukkan tempat desimal. Contoh: 2345,678 memiliki <strong>tiga tempat desimal</strong>.
                  </p>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan bilangan desimal 4,67 sebagai pecahan campuran!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Pisahkan bagian bulat dan desimal</p>
                        <p className="pl-4 text-cyan-300">Bagian bulat = 4, Bagian desimal = 0,67</p>
                        <p><strong>Langkah 2:</strong> Ubah bagian desimal menjadi pecahan</p>
                        <p className="pl-4 text-cyan-300">0,67 = 67/100 (ada 2 angka di belakang koma)</p>
                        <div className="bg-slate-900/50 rounded p-3 mt-2">
                          <BlockMath math="4,67 = 4\frac{67}{100}" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan bilangan desimal 0,000289 sebagai pecahan biasa!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Hitung banyak angka di belakang koma = 6 angka</p>
                        <p><strong>Langkah 2:</strong> Tulis sebagai pecahan dengan penyebut 1.000.000</p>
                        <div className="bg-slate-900/50 rounded p-3 mt-2">
                          <BlockMath math="0,000289 = \frac{289}{1000000}" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Bilangan 12,345 dapat ditulis sebagai pecahan campuran. Tentukan bentuk sederhananya!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Pisahkan: bulat = 12, desimal = 0,345</p>
                        <p><strong>Langkah 2:</strong> Ubah 0,345 menjadi pecahan</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,345 = \frac{345}{1000}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Sederhanakan dengan FPB(345,1000) = 5</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{345}{1000} = \frac{69}{200}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 12,345 = <InlineMath math="12\frac{69}{200}" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Mengubah Pecahan ke Desimal */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("pecahan-ke-desimal")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-cyan-400" />
                <span className="font-body font-semibold text-white">Mengubah Pecahan Menjadi Desimal</span>
              </div>
              {expandedSections.includes("pecahan-ke-desimal") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("pecahan-ke-desimal") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Ada <strong className="text-primary">dua cara</strong> mengubah pecahan menjadi desimal: (1) mengubah penyebut menjadi 10, 100, atau 1000; (2) melakukan pembagian langsung jika penyebut sulit diubah.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-2">Cara 1: Mengubah Penyebut</p>
                  <p className="font-body text-sm text-white/80">
                    Jika penyebut bisa diubah menjadi 10, 100, atau 1000, kalikan pembilang dan penyebut dengan bilangan yang sama.
                  </p>
                  <div className="bg-slate-900/50 rounded p-3 mt-2">
                    <BlockMath math="\frac{3}{5} = \frac{3 \times 2}{5 \times 2} = \frac{6}{10} = 0,6" />
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-purple-300 mb-2">Cara 2: Pembagian Langsung</p>
                  <p className="font-body text-sm text-white/80">
                    Jika penyebut sulit diubah (seperti 11, 13, 17), lakukan pembagian pembilang dengan penyebut.
                  </p>
                  <div className="bg-slate-900/50 rounded p-3 mt-2">
                    <BlockMath math="\frac{5}{13} = 5 \div 13 = 0,3846..." />
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-300 leading-relaxed">
                    <strong>Pecahan Desimal Berulang:</strong> Beberapa pecahan menghasilkan desimal yang berulang, seperti 7/11 = 0,6363... Pola 63 akan terus berulang.
                  </p>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 3/5 sebagai pecahan desimal!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Ubah penyebut 5 menjadi 10 (kalikan dengan 2)</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{3}{5} = \frac{3 \times 2}{5 \times 2} = \frac{6}{10} = 0,6" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 3/5 = 0,6</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 4/125 sebagai pecahan desimal!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Ubah penyebut 125 menjadi 1000 (125 x 8 = 1000)</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{4}{125} = \frac{4 \times 8}{125 \times 8} = \frac{32}{1000} = 0,032" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 4/125 = 0,032</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 7/11 sebagai desimal sampai 4 tempat desimal!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Karena 11 tidak bisa diubah menjadi 10/100/1000, gunakan pembagian</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="7 \div 11 = 0,6363..." />
                        </div>
                        <p className="text-cyan-300 text-xs">Pola berulang: 63</p>
                        <p className="text-primary font-semibold">Jadi, 7/11 = 0,6363 (desimal berulang)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Mengubah Desimal ke Pecahan */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("desimal-ke-pecahan")}
              className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-green-400" />
                <span className="font-body font-semibold text-white">Mengubah Desimal Menjadi Pecahan</span>
              </div>
              {expandedSections.includes("desimal-ke-pecahan") ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </button>
            {expandedSections.includes("desimal-ke-pecahan") && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-green-300 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Ringkasan Intisari
                  </p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Untuk mengubah desimal menjadi pecahan, gunakan <strong className="text-primary">aturan penyebut</strong>: penyebut ditentukan oleh banyaknya angka di belakang koma.
                  </p>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm font-semibold text-cyan-300 mb-2">Aturan Penyebut:</p>
                  <div className="font-body text-sm text-white/80 space-y-1">
                    <p>1 angka di belakang koma = penyebut <strong className="text-cyan-300">10</strong></p>
                    <p>2 angka di belakang koma = penyebut <strong className="text-cyan-300">100</strong></p>
                    <p>3 angka di belakang koma = penyebut <strong className="text-cyan-300">1000</strong></p>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-purple-300 leading-relaxed">
                    <strong>Tips:</strong> Setelah mengubah desimal ke pecahan, selalu periksa apakah pecahan tersebut bisa disederhanakan dengan mencari FPB pembilang dan penyebut.
                  </p>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-body text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" /> Contoh Soal dan Pembahasan
                  </p>

                  <div className="border-l-4 border-green-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                      <span className="font-body font-semibold text-white">Contoh 1</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 0,6 sebagai pecahan biasa dalam bentuk paling sederhana!
                      </p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Ada 1 angka di belakang koma, jadi penyebut = 10</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,6 = \frac{6}{10} = \frac{3}{5}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 0,6 = 3/5</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4 space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                      <span className="font-body font-semibold text-white">Contoh 2</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 0,125 sebagai pecahan biasa dalam bentuk paling sederhana!
                      </p>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Ada 3 angka di belakang koma, jadi penyebut = 1000</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,125 = \frac{125}{1000}" />
                        </div>
                        <p><strong>Langkah 2:</strong> Sederhanakan dengan FPB(125,1000) = 125</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{125}{1000} = \frac{1}{8}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 0,125 = 1/8</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                      <span className="font-body font-semibold text-white">Contoh 3</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="font-body text-sm text-white">
                        Nyatakan 2,375 sebagai pecahan campuran dalam bentuk paling sederhana!
                      </p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                      <div className="space-y-2 font-body text-sm text-white/80">
                        <p><strong>Langkah 1:</strong> Pisahkan bagian bulat = 2, bagian desimal = 0,375</p>
                        <p><strong>Langkah 2:</strong> Ubah 0,375 ke pecahan (3 angka = penyebut 1000)</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="0,375 = \frac{375}{1000}" />
                        </div>
                        <p><strong>Langkah 3:</strong> Sederhanakan dengan FPB(375,1000) = 125</p>
                        <div className="bg-slate-900/50 rounded p-3">
                          <BlockMath math="\frac{375}{1000} = \frac{3}{8}" />
                        </div>
                        <p className="text-primary font-semibold">Jadi, 2,375 = <InlineMath math="2\frac{3}{8}" /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentukDesimalPage;

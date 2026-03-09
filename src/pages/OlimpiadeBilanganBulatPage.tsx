import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const materiSection = {
  title: "MATERI - BILANGAN BULAT",
  sections: [
    {
      heading: "A. Macam-macam Bilangan",
      content: `1. Bilangan Bulat: { …, -3, -2, -1, 0, 1, 2, 3, … }
2. Bilangan Bulat Negatif: { …, -3, -2, -1 }
3. Bilangan Cacah: { 0, 1, 2, 3, 4, 5, … }
4. Bilangan Asli: { 1, 2, 3, 4, 5, 6, … }
5. Bilangan Ganjil: { 1, 3, 5, 7, 9, … }
6. Bilangan Genap: { 2, 4, 6, 8, 10, … }
7. Bilangan Prima: { 2, 3, 5, 7, 11, 13, … }
8. Bilangan Kuadrat: { 1, 4, 9, 16, 25, … }
9. Bilangan Kubik: { 1, 8, 27, 64, 125, … }
10. Bilangan Komposit: { 4, 6, 8, 9, 10, … }`
    },
    {
      heading: "B. Urutan Operasi Hitung Bilangan",
      content: `1. Operasi hitung dalam tanda kurung
2. Operasi pangkat atau akar
3. Operasi kali atau bagi
4. Operasi tambah atau kurang`
    },
    {
      heading: "C. Sifat Operasi Hitung Bilangan",
      content: `1. a + b = b + a (komutatif penjumlahan)
2. a × b = b × a (komutatif perkalian)
3. (a + b) + c = a + (b + c) (asosiatif penjumlahan)
4. (a × b) × c = a × (b × c) (asosiatif perkalian)
5. a × (b + c) = (a × b) + (a × c) (distributif)
6. a × (b - c) = (a × b) - (a × c)`
    },
    {
      heading: "D. Digit dan Jumlah Digit",
      content: `Banyak digit: jumlah angka yang digunakan untuk menuliskan bilangan.
Contoh: 42 memiliki 2 digit, 159 memiliki 3 digit.

Jumlah digit (sum of digits): hasil penjumlahan semua angka penyusun.
Contoh: 42 → 4 + 2 = 6, 159 → 1 + 5 + 9 = 15.`
    },
    {
      heading: "E. Kaitan Bilangan Ganjil dan Genap",
      content: `Penjumlahan:
• Ganjil + Ganjil = Genap
• Ganjil + Genap = Ganjil
• Genap + Genap = Genap

Perkalian:
• Ganjil × Ganjil = Ganjil
• Ganjil × Genap = Genap
• Genap × Genap = Genap`
    },
    {
      heading: "F. Memecah Bentuk Bilangan",
      content: `abcd = 1000a + 100b + 10c + d`
    },
    {
      heading: "G. Menentukan Bilangan Prima",
      content: `Metode Pembagian (Trial Division):
1. Cari akar kuadrat bilangan
2. Bagi dengan bilangan bulat dari 2 hingga akar kuadrat
3. Jika tidak ada yang membagi habis → bilangan prima

Contoh: 137 → √137 ≈ 11.7
Bagi 137 dengan 2, 3, 5, 7, 11 → tidak ada yang habis
Jadi, 137 adalah bilangan prima.`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Hasil dari 25 – (–90 : 18) + (–3) × 14 adalah ...", options: ["A. -12", "B. -9", "C. 24", "D. 97"] },
  { no: 2, soal: "Hasil dari –20 : 5 × 2 – [7 + (–9)] + [2 – (–7)] adalah …", options: ["A. 3", "B. 9", "C. 10", "D. -23"] },
  { no: 3, soal: "Dalam kompetensi Bahasa Inggris yang terdiri dari 50 soal, peserta mendapat skor 4 untuk benar, -2 untuk salah, dan -1 untuk tidak dijawab. Budi menjawab 44 soal dan benar 36 soal. Skor Budi adalah ...", options: ["A. 134", "B. 126", "C. 122", "D. 120"] },
  { no: 4, soal: "Dalam kompetensi matematika, benar skor 2, salah skor -1, tidak menjawab 0. Dari 40 soal, Andi menjawab 36 soal. Skor 51. Banyak soal benar adalah ...", options: ["A. 31", "B. 30", "C. 29", "D. 28"] },
  { no: 5, soal: "Dalam ujian, benar bernilai 4, salah -1, tidak dijawab 0. Dari 60 soal, Nafisha mengerjakan 31 soal dan mendapat skor 94. Banyak jawaban benar Nafisha adalah …", options: ["A. 25", "B. 24", "C. 23", "D. 22"] },
  { no: 6, soal: "Suhu di Moskow 11°C. Saat turun salju, suhu turun 4°C setiap 15 menit. Suhu setelah turun salju 1 jam adalah ...", options: ["A. -9°C", "B. -5°C", "C. 3°C", "D. 7°C"] },
  { no: 7, soal: "Suhu dalam kulkas sebelum dihidupkan 29°C. Setelah dihidupkan, turun 3°C setiap 5 menit. Setelah 10 menit suhu dalam kulkas adalah ...", options: ["A. 23°C", "B. 26°C", "C. 32°C", "D. 35°C"] },
  { no: 8, soal: "Operasi '#' artinya kalikan bilangan pertama dengan kedua, lalu kurangkan dengan dua kali bilangan kedua. Hasil dari 5 # -4 adalah...", options: ["A. -28", "B. -24", "C. -16", "D. -12"] },
  { no: 9, soal: "Operasi '*' artinya kalikan dua kali bilangan pertama dengan kedua, lalu kurangkan dengan tiga kali bilangan kedua. Hasil dari -3 * -2 adalah...", options: ["A. 18", "B. -18", "C. -6", "D. 6"] },
  { no: 10, soal: "Suhu ruangan ber-AC 16°C, penyimpanan daging 25°C lebih rendah. Suhu penyimpanan daging adalah…", options: ["A. 16°C", "B. 11°C", "C. -9°C", "D. -39°C"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN 2003 - Joko tidur malam pukul 9.20 dan bangun pagi pukul 4.35. Ia tidur selama …", options: ["A. 4 jam 45 menit", "B. 5 jam 15 menit", "C. 5 jam 45 menit", "D. 7 jam 15 menit", "E. 19 jam 15 menit"] },
  { no: 2, soal: "OSN 2003 - Jika a dan b bilangan bulat genap dengan a > b, banyaknya bilangan bulat ganjil diantara a dan b adalah …", options: ["A. (a-b)/2", "B. (a-b-1)/2", "C. (a-b+1)/2", "D. a-b"] },
  { no: 3, soal: "OSN 2003 - Kendaraan A berjalan 60 km/jam. 2 jam kemudian kendaraan B berjalan 80 km/jam arah sama. Setelah berapa jam B menyusul A?", options: ["A. 2 jam", "B. 3 jam", "C. 4 jam", "D. 5 jam", "E. 6 jam"] },
  { no: 4, soal: "OSN 2007 - Bilangan cacah lima digit dengan digit pertama tidak nol dan jumlah semua digitnya = 2 ada sebanyak …", options: ["A. 1", "B. 2", "C. 3", "D. 4", "E. 5"] },
  { no: 5, soal: "OSN 2009 - Misalkan a dan b bilangan bulat sehingga a(a + b) = 34. Nilai terkecil a – b adalah ...", options: ["A. -17", "B. -32", "C. -34", "D. -67"] },
  { no: 6, soal: "OSN 2012 - Perhatikan pola bilangan. Bilangan 2012 terletak di bawah huruf ...", options: ["A. Q", "B. R", "C. S", "D. T", "E. U"] },
  { no: 7, soal: "OSN 2013 - Tiga orang A, B, C pinjam meminjam kelereng. Akhirnya masing-masing 16 kelereng. Banyak A mula-mula adalah …", options: ["A. 8", "B. 14", "C. 26", "D. 28", "E. 32"] },
  { no: 8, soal: "OSN 2019 - Diantara bilangan berikut, yang bernilai ganjil untuk setiap bilangan bulat n adalah …", options: ["A. 2019 – 3n", "B. 2019 + n", "C. 2019 + 2n", "D. 2019 + n²"] },
  { no: 9, soal: "OSN 2023 - Misalkan a, b, c, d bilangan positif berbeda sehingga a+b, a+c, a+d bilangan ganjil sekaligus kuadrat. Nilai a+b+c+d terkecil yang mungkin adalah …", options: ["A. 33", "B. 67", "C. 81", "D. 83"] },
  { no: 10, soal: "OSN 2024 - Misalkan N(a,b,c) menyatakan banyaknya kelipatan a yang lebih besar dari b dan kurang dari c. Nilai N(6⁴, 6⁴, 6⁶) adalah …", options: ["A. 216", "B. 215", "C. 209", "D. 208"] },
];

const OlimpiadeBilanganBulatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade">("materi");
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (idx: number) => {
    playPopSound();
    setExpandedSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">
          OLIMPIADE - BILANGAN BULAT
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Irawan Sutiawan, M.Pd</p>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-6">
          {[
            { key: "materi" as const, label: "Materi" },
            { key: "dasar" as const, label: "Latihan Dasar" },
            { key: "olimpiade" as const, label: "Latihan Olimpiade" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { playPopSound(); setActiveTab(tab.key); }}
              className={`font-display text-xs px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                activeTab === tab.key
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card/80 text-white/70 border-border hover:border-accent/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Materi Tab */}
        {activeTab === "materi" && (
          <div className="space-y-3 animate-slide-up">
            {materiSection.sections.map((section, idx) => (
              <div key={idx} className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                >
                  <span className="font-display text-sm text-accent font-bold">{section.heading}</span>
                  {expandedSections.includes(idx) ? (
                    <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                  )}
                </button>
                {expandedSections.includes(idx) && (
                  <div className="px-5 pb-4">
                    <pre className="font-body text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                      {section.content}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Latihan Dasar Tab */}
        {activeTab === "dasar" && (
          <div className="space-y-4 animate-slide-up">
            {latihanDasar.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <p className="font-body text-sm text-white mb-3">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {soal.options.map((opt, j) => (
                    <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Latihan Olimpiade Tab */}
        {activeTab === "olimpiade" && (
          <div className="space-y-4 animate-slide-up">
            {latihanOlimpiade.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <p className="font-body text-sm text-white mb-3">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {soal.options.map((opt, j) => (
                    <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/olimpiade"); }}
            className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Olimpiade
          </button>
        </div>
      </div>
    </div>
  );
};

export default OlimpiadeBilanganBulatPage;

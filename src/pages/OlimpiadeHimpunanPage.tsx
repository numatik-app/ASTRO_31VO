import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Helper function to render text with LaTeX
const renderWithLatex = (text: string) => {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      return <InlineMath key={index} math={latex} />;
    }
    return <span key={index}>{part}</span>;
  });
};

const materiSection = {
  title: "MATERI - HIMPUNAN",
  sections: [
    {
      heading: "A. Definisi",
      content: `Definisi:
Himpunan adalah sekumpulan benda atau objek yang didefinisikan dengan jelas

Notasi:
- Notasi $\\in$ menyatakan anggota himpunan
- Notasi $\\notin$ menyatakan bukan anggota himpunan
- Notasi $n(A)$ menyatakan jumlah anggota himpunan A`
    },
    {
      heading: "B. Jenis Himpunan",
      content: `- Himpunan kosong
Himpunan kosong adalah himpunan yang tidak memiliki anggota. Ditulis: $\\{\\}$ atau $\\emptyset$

- Himpunan semesta
Himpunan semesta adalah yang memuat semua anggota yang sedang dibicarakan, dinotasikan dengan S

- Himpunan bagian
Himpunan A merupakan himpunan bagian B, jika setiap anggota A juga merupakan anggota B, dinotasikan $A \\subset B$

Banyak anggota himpunan bagian: $2^n$
n menyatakan jumlah anggota himpunan

Segitiga Pascal:
Awal: 1 = $2^0$
Baris ke-1: 1, 1 = $2^1$
Baris ke-2: 1, 2, 1 = $2^2$
Baris ke-3: 1, 3, 3, 1 = $2^3$
Baris ke-4: 1, 4, 6, 4, 1 = $2^4$
Baris ke-5: 1, 5, 10, 10, 5, 1 = $2^5$`
    },
    {
      heading: "C. Diagram Venn",
      content: `Diagram Venn adalah gambar himpunan yang digunakan untuk menyatakan hubungan beberapa himpunan

Aturan membuat diagram Venn:
1) Himpunan semesta (S) dibatasi dengan persegi panjang dan simbol S diletakkan di pojok kiri atas
2) Setiap himpunan anggota yang dibicarakan dinyatakan dengan kurva tertutup
3) Setiap anggota himpunan anggota berhingga dinyatakan dengan noktah/titik yang diberi nama

$S = A + B + C - X$
A = Banyaknya anggota A
B = Banyaknya anggota B
C = Banyaknya yang bukan anggota A dan B
X = Banyaknya anggota bersama A dan B
S = Semesta (seluruh anggota pada diagram Venn)`
    },
    {
      heading: "D. Operasi Himpunan",
      content: `- Irisan ($\\cap$)
$A \\cap B = \\{x | x \\in A \\text{ dan } x \\in B\\}$
Dua himpunan yang tidak memiliki irisan disebut saling lepas

- Gabungan ($\\cup$)
$A \\cup B = \\{x | x \\in A \\text{ atau } x \\in B\\}$

- Komplemen ($A^c$ atau $A'$)
$A^c = \\{x | x \\in S \\text{ dan } x \\notin A\\}$

- Selisih
$A - B = \\{x | x \\in A \\text{ dan } x \\notin B\\}$`
    },
    {
      heading: "E. Hubungan Himpunan A dan Himpunan B",
      content: `$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$`
    },
    {
      heading: "F. Hubungan Himpunan A, Himpunan B dan Himpunan C",
      content: `Pada Himpunan Berlaku:
$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Diketahui\nS = {x | x < 15, x $\\in$ bilangan asli}\nP = {x | 2 $\\leq$ x < 10, x $\\in$ bilangan prima}\nQ = {x | 2 < x $\\leq$ 10, x $\\in$ bilangan genap}\nDiagram Venn yang menyatakan hubungan di atas adalah ...", options: ["A. (Diagram A)", "B. (Diagram B)", "C. (Diagram C)", "D. (Diagram D)"] },
  { no: 2, soal: "Diketahui:\nS = {x | 1 $\\leq$ x $\\leq$ 10, x $\\in$ bilangan asli}\nP = {x | x $\\leq$ 6, x $\\in$ bilangan prima}\nQ = {x | 1 $\\leq$ x $\\leq$ 9, x $\\in$ bilangan genap}\nDiagram Venn untuk himpunan-himpunan di atas adalah ...", options: ["A. (Diagram A)", "B. (Diagram B)", "C. (Diagram C)", "D. (Diagram D)"] },
  { no: 3, soal: "Perhatikan gambar diagram Venn berikut!\nPernyataan berikut yang benar adalah ....", options: ["A. $B \\cup C = \\{1, 2, 3, 4, 5, 6, 8\\}$", "B. $B \\cap C = \\{2, 6, 7, 9\\}$", "C. $B - C = \\{1, 3, 9\\}$", "D. $C - B = \\{5, 8\\}$"] },
  { no: 4, soal: "Diketahui\nP = {x | 2 $\\leq$ x $\\leq$ 12, x $\\in$ bilangan cacah} dan Q = {x | x faktor dari 12}.\n$P \\cap Q$ = ...", options: ["A. {3, 4, 6}", "B. {3, 4, 6, 12}", "C. {2, 3, 4, 6, 12}", "D. {1, 2, 3, 4, 6, 12}"] },
  { no: 5, soal: "Jika K = {0, 1, 2, 3, 4, 6, 7} dan L = {1, 3, 5, 7, 9, 11, 13}. Hasil K - L adalah ...", options: ["A. {0, 9, 11, 13}", "B. {1, 3, 5, 7}", "C. {0, 2, 4, 6}", "D. {5, 9, 11, 13}"] },
  { no: 6, soal: "Diketahui himpunan\nS = {bilangan asli kurang dari 12}\nA = {bilangan ganjil kurang dari 11}\nB = {bilangan prima kurang dari 12}\nKomplemen dari $(A \\cap B)^c$ adalah ...", options: ["A. {3, 5, 7}", "B. {1, 2, 9, 11}", "C. {4, 6, 8, 10}", "D. {1, 2, 4, 6, 8, 9, 10, 11}"] },
  { no: 7, soal: "Jika K = {x | 5 $\\leq$ x $\\leq$ 9, x $\\in$ bilangan asli} dan L = {x | 7 $\\leq$ x $\\leq$ 13, x $\\in$ bilangan cacah}\nmaka $K \\cup L$ = ...", options: ["A. {5, 6, 7, 8, 9, 10, 11, 12, 13}", "B. {5, 6, 7, 8, 9, 10, 11, 12}", "C. {6, 7, 8, 9, 10}", "D. {7, 8, 9, 10}"] },
  { no: 8, soal: "Diketahui himpunan D = {bilangan genap antara 3 dan 14}, himpunan L = {bilangan prima kurang dari 8}, himpunan semesta S = {bilangan asli kurang dari 14}. Komplemen dari $D \\cup L$ adalah ...", options: ["A. {2, 3, 5, 7}", "B. {1, 9, 11, 13}", "C. {1, 4, 6, 8, 9, 10, 11, 12, 13}", "D. {2, 3, 4, 5, 6, 7, 8, 10, 12}"] },
  { no: 9, soal: "Diketahui\nS = {bilangan asli kurang dari 11}\nA = {bilangan prima kurang dari 11}\nB = {bilangan genap kurang dari 11}\nKomplemen dari $A \\cap B$ adalah ...", options: ["A. {1, 2, 3, ..., 10}", "B. {1, 3, 4, 5, 6, 7, 8, 9, 10}", "C. {2, 3, 5, 7, 9}", "D. {1, 3, 5, 7}"] },
  { no: 10, soal: "Diketahui\nS = {1, 2, 3, ..., 10}\nA = {x | x $\\leq$ 10, x Bilangan ganjil}\nB = {x | 1 $\\leq$ x $\\leq$ 10, x Bilangan prima}\nI. Komplemen $(A \\cap B) = \\{1, 2, 4, 6, 8, 9\\}$\nII. Komplemen $(A \\cup B) = \\{4, 6, 8, 10\\}$\nIII. Komplemen $(A - B) = \\{2, 3, 4, 5, 6, 7, 8, 10\\}$\nIV. Komplemen $(B - A) = \\{2, 11\\}$\nPernyataan yang benar di bawah ini adalah ....", options: ["A. I, II, dan III", "B. II dan III", "C. I dan III", "D. III dan IV"] },
  { no: 11, soal: "Diketahui A = {huruf pembentuk kata \"matematika\"}, dan B = {huruf pembentuk kata \"Jakarta\"}\nA - B adalah ...", options: ["A. {m, e, i, k, j, r}", "B. {m, e, i}", "C. {a, t, k}", "D. {j, r}"] },
  { no: 12, soal: "Diketahui himpunan P = {bilangan prima kurang dari 15} dan $P \\cap Q = \\{2, 3, 5\\}$. Himpunan Q yang mungkin adalah ....", options: ["A. {faktor dari 15}", "B. {faktor dari 30}", "C. {bilangan prima kurang dari 11}", "D. {bilangan ganjil kurang dari 9}"] },
  { no: 13, soal: "Diketahui {x | 4 $\\leq$ x $\\leq$ 15, x $\\in$ bilangan prima}. Banyak himpunan bagian dari A adalah ...", options: ["A. 8", "B. 16", "C. 25", "D. 32"] },
  { no: 14, soal: "Diketahui P = {x | x < 10, x $\\in$ bilangan asli genap}. Banyaknya himpunan bagian dari P yang mempunyai 3 anggota adalah ...", options: ["A. 5", "B. 10", "C. 16", "D. 32"] },
  { no: 15, soal: "Dari 30 siswa diketahui 16 anak gemar IPA, 12 anak gemar Matematika, serta 5 anak tidak gemar IPA atau Matematika. Banyaknya anak yang hanya gemar Matematika adalah ...", options: ["A. 3", "B. 9", "C. 10", "D. 12"] },
  { no: 16, soal: "Petugas lalu lintas melakukan pemeriksaan terhadap pengendara kendaraan bermotor. Hasilnya 25 orang memiliki SIM A, 30 orang memiliki SIM C, 17 orang memiliki SIM A & C, sedangkan 12 orang tidak memiliki SIM A maupun C. Banyak pengendara bermotor yang diperiksa adalah....", options: ["A. 50 orang", "B. 60 orang", "C. 72 orang", "D. 84 orang"] },
  { no: 17, soal: "Dari 24 siswa kelas A, diketahui 15 siswa suka basket, 5 siswa suka Futsal dan basket, serta 4 siswa tidak suka keduanya, maka banyak siswa yang menyukai salah satu adalah...", options: ["A. 4", "B. 5", "C. 10", "D. 15"] },
  { no: 18, soal: "Peserta tes dinyatakan diterima masuk sekolah jika lulus tes wawancara dan psikotes. Dari 50 peserta tes diketahui jumlah siswa yang lulus tes psikotes dua kali dari jumlah yang lulus tes wawancara. Jika akhirnya peserta yang diterima sebanyak 10 orang, maka banyaknya peserta yang lulus psikotes adalah...", options: ["A. 20", "B. 30", "C. 40", "D. 45"] },
  { no: 19, soal: "Dalam suatu survey yang dilakukan terhadap 60 orang, diperoleh informasi bahwa 25 orang berlangganan Newsweek, 26 orang berlangganan Time, dan 26 orang berlangganan Fortune. Diketahui juga bahwa 9 orang berlangganan Newsweek dan Fortune, 11 orang berlangganan Newsweek dan Time, 8 orang berlangganan Time dan Fortune, dan 8 orang tidak berlangganan majalah apapun. Berapa orangkah yang berlangganan ketiga majalah Newsweek, Time dan Fortune?", options: ["A. 2", "B. 3", "C. 4", "D. 5"] },
  { no: 20, soal: "Suatu kelas terdiri dari 42 siswa. $\\frac{1}{3}$ dari seluruh siswa itu menyukai olahraga berenang, $\\frac{1}{6}$ nya menyukai berenang dan sepakbola dan $\\frac{3}{7}$ nya tidak menyukai kedua olahraga tersebut. Banyak orang yang menyukai sepakbola adalah ...", options: ["A. 7 siswa", "B. 10 siswa", "C. 17 siswa", "D. 24 siswa"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2007 Tingkat Kota\nJika H adalah himpunan semua pembagi positif dari 2007, maka banyak himpunan bagian dari H yang tidak kosong adalah ...", options: [] },
  { no: 2, soal: "OSN Matematika 2008 Tingkat Kota\nMisalkan banyak anggota himpunan A dan B berturut-turut adalah m dan n, dengan m > n. Banyak anggota himpunan $A \\cup B$ paling sedikit adalah ...", options: [] },
  { no: 3, soal: "OSN Matematika 2010 Tingkat Kota\nJika bilangan ganjil dikelompokkan seperti: {1}, {3, 5}, {13, 15, 17, 19}, maka suku Tengah dari kelompok ke-11 adalah ...", options: ["A. 21", "B. 31", "C. 61", "D. 111", "E. 121"] },
  { no: 4, soal: "OSN Matematika 2011 Tingkat Kota\nSeorang ilmuwan melakukan percobaan terhadap 50 ekor kelinci dan melaporkan hasilnya sebagai berikut:\n- 25 ekor diantaranya kelinci Jantan\n- 25 ekor dilatih menghindari jebakan, 10 ekor diantaranya Jantan\n- 20 ekor (dari total 50 ekor) berhasil menghindari jebakan, 4 ekor diantaranya Jantan\n- 15 ekor yang pernah dilatih berhasil menghindari jebakan, 3 ekor diantaranya Jantan.\nBerapa ekor kelinci betina yang tidak pernah dilatih, tidak dapat menghindari jebakan?", options: ["A. 5", "B. 6", "C. 7", "D. 8", "E. 9"] },
  { no: 5, soal: "OSN Matematika 2011 Tingkat Kota\nSuatu himpunan disebut berjenis H jika memenuhi sifat:\na) Himpunan tersebut beranggotakan tiga bilangan bulat tak negatif\nb) Rata-rata ketiga bilangan anggota himpunan tersebut adalah 15.\nBanyaknya semua himpunan berjenis H ini adalah ...", options: [] },
  { no: 6, soal: "OSN Matematika 2012 Tingkat Kota\nPernyataan yang benar diantara pernyataan-pernyataan berikut adalah ...", options: ["A. $\\emptyset \\in \\emptyset$", "B. $\\emptyset \\in \\{\\emptyset\\}$", "C. $\\emptyset \\subset \\emptyset$", "D. $\\{a, b\\} \\in \\{a, b, \\{\\{a, b\\}\\}\\}$", "E. $\\{\\{a, b\\}\\} \\subset \\{a, b, \\{a, b\\}\\}$"] },
  { no: 7, soal: "OSN Matematika 2012 Tingkat Kota\nBanyak himpunan bagian dari himpunan {a, b, c, d, e, f} yang memuat sedikitnya satu huruf vokal adalah ...", options: [] },
  { no: 8, soal: "OSN Matematika 2013 Tingkat Kota\nDiketahui H = {k | $x^2 - 1 < x^2 + k < 2(x+1)$, dengan x dan k bilangan bulat}. Banyaknya himpunan bagian dari himpunan H adalah ...", options: ["A. 4", "B. 8", "C. 16", "D. 32", "E. 64"] },
  { no: 9, soal: "OSN Matematika 2013 Tingkat Kota\nHimpunan A mempunyai anggota sebanyak x dan himpunan B mempunyai anggota sebanyak y, x $\\leq$ y, maka himpunan $A \\cup B$ mempunyai anggota (maksimum) sebanyak ...", options: [] },
  { no: 10, soal: "OSN Matematika 2014 Tingkat Kota\nHimpunan bilangan bulat dikatakan tertutup terhadap operasi penjumlahan jika hasil penjumlahan dua bilangan bulat adalah bilangan bulat. Himpunan bilangan bulat dikatakan tidak tertutup terhadap operasi pembagian karena ada hasil bagi sepasang bilangan bulat yang bukan bilangan bulat. Jika A = {0, 2, 4, 6, ...} adalah himpunan bilangan bulat positif genap, maka pernyataan berikut yang benar adalah ...", options: ["A. Himpunan A tertutup terhadap operasi perkalian saja", "B. Himpunan A tertutup terhadap operasi penjumlahan saja", "C. Himpunan A tertutup terhadap operasi penjumlahan dan perkalian", "D. Himpunan A tertutup terhadap operasi penjumlahan dan pengurangan"] },
  { no: 11, soal: "OSN Matematika 2014 Tingkat Kota\nDari survey terhadap 75 orang diperoleh hasil sebagai berikut:\n- 50 orang berumur lebih dari 25 tahun, sisanya berumur tidak lebih dari 25 tahun\n- 27 orang menyukai masakan pedas, 7 diantaranya berumur tidak lebih dari 25 tahun\n- 28 orang menyukai masakan manis, 25 diantaranya berumur lebih dari 25 tahun\n- 5 orang menyukai masakan pedas dan juga masakan manis\n- 25 orang tidak menyukai masakan pedas maupun masakan manis, 7 diantaranya berumur lebih dari 25 tahun.\nBanyak orang yang berumur tidak lebih dari 25 tahun yang menyukai masakan pedas dan juga masakan manis adalah ...", options: ["A. 2", "B. 3", "C. 4", "D. 7"] },
  { no: 12, soal: "OSN Matematika 2015 Tingkat Kota\nJika A = {1, 2, 3, ..., 50}, S = {(a, b, c) | a $\\in$ A, b $\\in$ A, c $\\in$ A, b < a dan b < c}, dan T = {(a, b, c) | a $\\in$ A, b $\\in$ A, c $\\in$ A, dan a = c}, maka anggota dari $S \\cap T$ ada sebanyak ...", options: ["A. 50", "B. 1225", "C. 1275", "D. 2500"] },
  { no: 13, soal: "OSN Matematika 2018 Tingkat Kota\nDiketahui F = {9, 10, 11, 12, 13, ..., 49, 50} dan G adalah himpunan bilangan yang anggota-anggotanya dapat dinyatakan sebagai penjumlahan tiga atau lebih bilangan-bilangan asli berurutan. Anggota $F \\cap G$ sebanyak ...", options: ["A. 14", "B. 26", "C. 29", "D. 36"] },
  { no: 14, soal: "OSN Matematika 2019 Tingkat Kota\nDiketahui $A = \\{0, 1, 2, 3, 4\\}$; a, b, c adalah tiga anggota yang berbeda dari A dan $n = a^{b^c}$. Nilai maksimum dari n adalah ...", options: ["A. 4096", "B. 6561", "C. 9561", "D. 9651"] },
  { no: 15, soal: "OSN Matematika Tingkat Kota 2022\nDiketahui barisan himpunan bilangan dengan pola berikut\n{1}, {2, 3}, {4, 5, 6}, ...\nHimpunan pertama memiliki 1 anggota, yaitu bilangan bulat positif pertama. Himpunan berikutnya memiliki 1 anggota lebih banyak dibanding himpunan sebelumnya, dengan anggota adalah bilangan bulat positif pada urutan berikutnya. Jika $M_n$ adalah rata-rata dari seluruh anggota himpunan ke-n, maka $2M_{2022} - 2M_{2021} = ...$", options: ["A. 2021", "B. 2022", "C. 4043", "D. 4044"] },
  { no: 16, soal: "OSN Matematika Tingkat Kota 2024\nDiketahui x merupakan bilangan bulat positif kelipatan 2 yang kurang dari 50, y merupakan bilangan bulat positif kelipatan 3, dan $y - x = 10$. Jika A adalah himpunan semua faktor prima dari x, B adalah himpunan semua faktor prima dari y, dan jumlah semua anggota dari $A \\cup B$ adalah 10, maka nilai dari $x + y$ adalah ...", options: ["A. 14", "B. 26", "C. 38", "D. 50"] },
  { no: 17, soal: "OSN Matematika 2024 Tingkat Kota\nDiketahui $A = \\{0, 1, 2, ..., 9\\}$ dan $\\overline{rstu}$ adalah bilangan empat digit dengan r, s, t, u adalah anggota A yang berbeda. Jika $\\overline{rstu} + \\overline{stu} = \\overline{vwxyz}$, dengan r, s, t, u, v, w, x, y, z adalah anggota A yang berbeda, maka anggota A yang tidak digunakan dalam operasi penjumlahan tersebut adalah ...", options: ["A. 2", "B. 3", "C. 5", "D. 8"] },
  { no: 18, soal: "OSN Matematika 2024 Tingkat Kota\nSuatu Perusahaan pembuat baterai mobil Listrik sedang melakukan kontrol kualitas terhadap 2000 baterai hasil produksinya. Ada 3 hasil pengecekan kerusakan pada baterai yang dicek, yaitu kerusakan pelat penutup, kerusakan elektrolit dan kerusakan terminal.\nHasil pengecekan kerusakan:\n- Pelat penutup: 30\n- Elektrolit: 50\n- Terminal: 40\n- Terminal dan Pelat Penutup: 10\n- Pelat Penutup dan Elektrolit: 19\n- Terminal dan Elektrolit: 15\n- Pelat Penutup, Elektrolit dan Terminal: 5\nBaterai yang tidak mengalami kerusakan sama sekali dikatakan memenuhi standar. Berdasarkan data tersebut, banyak baterai yang memenuhi standar adalah ...", options: ["A. 1804", "B. 1880", "C. 1919", "D. 1920"] },
];

const OlimpiadeHimpunanPage = () => {
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
          OLIMPIADE - HIMPUNAN
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
                    <div className="font-body text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                      {section.content.split('\n').map((line, i) => (
                        <div key={i} className="mb-1">{renderWithLatex(line)}</div>
                      ))}
                    </div>
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
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {renderWithLatex(line)}
                    </span>
                  ))}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Latihan Olimpiade Tab */}
        {activeTab === "olimpiade" && (
          <div className="space-y-4 animate-slide-up">
            {latihanOlimpiade.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {renderWithLatex(line)}
                    </span>
                  ))}
                </div>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {renderWithLatex(opt)}
                      </div>
                    ))}
                  </div>
                )}
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

export default OlimpiadeHimpunanPage;

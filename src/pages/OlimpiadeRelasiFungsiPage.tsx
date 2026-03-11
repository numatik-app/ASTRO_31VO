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
  title: "MATERI - RELASI DAN FUNGSI",
  sections: [
    {
      heading: "A. Relasi",
      content: `Relasi dari himpunan A ke himpunan B adalah hubungan yang memasangkan anggota himpunan A dengan anggota himpunan B.

Misal himpunan A = {1, 2, 4} dan himpunan B = {(1,1), (1,2), (1,4), (2,2), (2,4), (4,4)} mempunyai relasi bahwa himpunan A merupakan faktor dari himpunan B. Relasi himpunan A dan himpunan B dapat dinyatakan dalam tiga cara yaitu Diagram Panah, Pasangan Berurutan dan Diagram Kartesius.

1. Diagram panah
2. Himpunan pasangan terurut: {(1,2), (1,3), (1,4), (2,2), (2,4), (4,4)}
3. Koordinat Kartesius`
    },
    {
      heading: "B. Domain, Kodomain, Range",
      content: `1. Domain adalah daerah asal atau himpunan yang memuat elemen pertama himpunan pasangan berurut fungsi f.

2. Kodomain adalah daerah himpunan kawan, atau himpunan yang memuat elemen kedua himpunan pasangan berurut fungsi f.

3. Range adalah daerah hasil, atau himpunan semua anggota himpunan B yang memiliki pasangan anggota himpunan A.

Contoh:
Tentukan Domain, Kodomain dan Range pada diagram panah berikut.
- Dari diagram panah tersebut didapat domainnya adalah $D_f = \\{a, b, c, d, e\\}$.
- Dari diagram panah tersebut didapat kodomainnya adalah $K_f = \\{1, 2, 3, 4, 5\\}$.
- Dari diagram panah tersebut didapat range nya adalah $R_f = \\{1, 4, 5\\}$.`
    },
    {
      heading: "C. Fungsi (Pemetaan)",
      content: `Fungsi (pemetaan) dari himpunan A ke himpunan B adalah hubungan yang memasangkan tepat satu anggota himpunan A dengan anggota himpunan B.

Syarat fungsi:
- Semua anggota domain tidak memiliki lebih dari satu pasangan
- Semua anggota domain harus memiliki pasangan

Jika himpunan A adalah Domain (daerah asal) dan himpunan B adalah kodomain (daerah kawan) maka relasi himpunan A ke himpunan B merupakan fungsi saat anggota domain mempunyai pasangan tepat satu pada kodomain.

Contoh fungsi:
Relasi himpunan A ke himpunan B di atas adalah contoh relasi yang merupakan fungsi karena anggota pada domain (daerah asal) A mempunyai pasangan tepat satu di kodomain (daerah kawan) B, yaitu {(a,y), (b,z), (c,z)}. Pada diagram panah di atas kita peroleh Range (daerah hasil) yaitu {y, z}

Contoh bukan fungsi:
Relasi himpunan A ke himpunan B di atas adalah contoh relasi yang bukan fungsi karena anggota pada domain A ada yang mempunyai pasangan di kodomain B lebih dari satu, yaitu {(b,x)} dan {(b,z)}.

Jika himpunan A banyak anggota adalah n(A) dan himpunan B banyak anggota adalah n(B), maka banyaknya fungsi (pemetaan) yang dapat terjadi dapat kita hitung dengan rumus:
- $n(A \\to B) = n(B)^{n(A)}$
- $n(B \\to A) = n(A)^{n(B)}$`
    },
    {
      heading: "D. Korespondensi Satu-Satu",
      content: `a. Syarat korespondensi satu-satu:
- Banyaknya anggota domain sama dengan banyaknya anggota kodomain
- Setiap anggota domain dan kodomain memiliki tepat satu pasangan

b. Banyaknya korespondensi 1-1 yang mungkin $f : A \\to B$ yang memiliki anggota domain = banyak anggota kodomain = n adalah:
$n(f) = n! = n \\times (n-1) \\times (n-2) \\times ... \\times 1$`
    },
    {
      heading: "E. Notasi Fungsi Dan Nilai Fungsi",
      content: `Notasi fungsi umumnya ditulis dalam bentuk $f: x \\to y$ atau $f: x \\to f(x)$ menjadi $f(x) = y$, dibaca "fungsi f memetakan x ke y". $f(x)$ merupakan hasil peta bayangan dari x.

Untuk nilai fungsi dari suatu domain, hasil yang diperoleh disebut juga daerah hasil (range).

Misalnya diketahui fungsi $f(x) = 2x + 3$, maka nilai fungsi untuk $x = 1$ dinyatakan dalam bentuk:
$f(x) = 2x + 3$
$f(1) = 2(1) + 3$
$= 2 + 3$
$= 5$`
    },
    {
      heading: "F. Rumus Fungsi f(x)",
      content: `Notasi rumus fungsi $f: x \\to ax + b$ dapat ditulis kedalam bentuk $f(x) = ax + b$. Dimana untuk $f(x) = ax + b$ maka $f(k) = a(k) + b$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Perhatikan gambar diagram panah berikut!\nRelasi dari A ke B adalah ....", options: ["A. akar dari", "B. faktor dari", "C. kuadrat dari", "D. kelipatan dari"] },
  { no: 2, soal: "Himpunan pasangan berurut berikut: (2,4), (2,10), (2,12), (3,12), (5,10), merupakan relasi dari A = {1, 2, 3, 5} ke B = {4, 7, 10, 12}. Relasi yang menghasilkan himpunan pasangan berurut itu adalah ...", options: ["A. Faktor dari", "B. Kelipatan dari", "C. Kurang dari", "D. Hasil kali dari"] },
  { no: 3, soal: "Perhatikan gambar diagram panah berikut.\nHimpunan daerah kawan (kodomain) dari diagram panah di atas adalah ...", options: ["A. {1, 2, 3, 4, 5}", "B. {1, 2, 3, 4}", "C. {1, 4, 9, 10}", "D. {5}"] },
  { no: 4, soal: "Diagram panah di bawah ini yang merupakan pemetaan adalah...", options: ["A. (Diagram A)", "B. (Diagram B)", "C. (Diagram C)", "D. (Diagram D)"] },
  { no: 5, soal: "Perhatikan himpunan pasangan berikut:\n1. {(1,a), (2,b), (3,b)}\n2. {(1,a), (1,b), (3,c)}\n3. {(2,4), (4,8), (6,12)}\n4. {(2,4), (2,8), (6,12)}\nHimpunan pasangan yang merupakan pemetaan adalah...", options: ["A. 1 dan 2", "B. 1 dan 3", "C. 2 dan 3", "D. 1 dan 2"] },
  { no: 6, soal: "Perhatikan himpunan pasangan berurutan berikut!\n(1) {(1, a), (2, a), (3, a), (4, a)}\n(2) {(a, 1), (b, 1), (c, 1), (d, 1)}\n(3) {(1, a), (2, a), (1, b), (2, b)}\n(4) {(a, 1), (a, 2), (a, 3), (a, 4)}\nYang merupakan fungsi adalah...", options: ["A. (1) dan (2)", "B. (1) dan (3)", "C. (2) dan (3)", "D. (2) dan (4)"] },
  { no: 7, soal: "Diketahui A = {a, b, c} dan B = {1, 2, 3, 4, 5}. Banyak pemetaan yang mungkin dari A ke B adalah ...", options: ["A. 15", "B. 32", "C. 125", "D. 243"] },
  { no: 8, soal: "Suatu fungsi didefinisikan sebagai $f(x) = 2x - 2$. Bila daerah asal $\\{x | -1 \\leq x \\leq 2, x \\in B\\}$, maka daerah hasil adalah...", options: ["A. {-3, -1, 1, 2}", "B. {-4, -2, 0, 2}", "C. {-2, 0, 3, 4}", "D. {-1, 0, 3, 4}"] },
  { no: 9, soal: "Diketahui rumus fungsi $f(x) = -4x + 7$. Nilai $f(-2)$ adalah ...", options: ["A. -15", "B. -1", "C. 1", "D. 15"] },
  { no: 10, soal: "Diketahui rumus fungsi $f(x) = 3x + 2$. Nilai dari $f(4y - 7)$ adalah...", options: ["A. $12y - 23$", "B. $12y - 19$", "C. $12y - 11$", "D. $12y - 5$"] },
  { no: 11, soal: "Jika $f(x) = 5x + 4$, maka nilai dari $f(2m - 1)$ adalah ....", options: ["A. $10m - 9$", "B. $10m - 1$", "C. $5m - 1$", "D. $5m + 9$"] },
  { no: 12, soal: "Diketahui rumus fungsi $f(x) = 2x - 5$. Jika $f(k) = -15$ maka nilai k adalah...", options: ["A. -10", "B. -5", "C. 5", "D. 10"] },
  { no: 13, soal: "Diketahui rumus $f(x) = 3x + 12$. Jika $f(m) = -24$, maka nilai m adalah ...", options: ["A. -24", "B. -12", "C. 24", "D. 48"] },
  { no: 14, soal: "Jika $f(x-1) = 2x + 3$ maka $f(2) = ...$", options: ["A. 8", "B. 9", "C. 10", "D. 11"] },
  { no: 15, soal: "Diketahui A = {faktor dari 8} dan Q = {x | x < 7, x $\\in$ bilangan ganjil}. Banyak pemetaan dari A ke B adalah ....", options: ["A. 81", "B. 64", "C. 27", "D. 16"] },
  { no: 16, soal: "Grafik fungsi $f(x) = 2x + 2$, dengan $x \\in R$ adalah...", options: ["A. (Grafik A)", "B. (Grafik B)", "C. (Grafik C)", "D. (Grafik D)"] },
  { no: 17, soal: "Jika $f(2x + 1) = 4x + 1$, maka $f(-2) = ...$", options: ["A. -6", "B. -4", "C. 3", "D. 4"] },
  { no: 18, soal: "Jika $f(3x + 1) = 9x + 1$, maka $f(2) = ...$", options: ["A. -6", "B. -4", "C. 3", "D. 4"] },
  { no: 19, soal: "Diketahui rumus fungsi $f(2x - 3) = 6x - 5$. Nilai $f(5) = ...$", options: ["A. 25", "B. 19", "C. -19", "D. -25"] },
  { no: 20, soal: "Diketahui fungsi f adalah $f(x) = ax + b$. Jika $f(4) = 5$ dan $f(-2) = -13$, maka nilai $a + b$ adalah ...", options: ["A. 10", "B. 4", "C. -4", "D. -10"] },
  { no: 21, soal: "Suatu fungsi dirumuskan $f(x) = 7x - 1$, jika $f(a) = 48$ dan $f(b) = -22$ maka $a + b$ adalah ...", options: ["A. -4", "B. 4", "C. 7", "D. 9"] },
  { no: 22, soal: "Sebuah perusahaan taksi memasang tarif seperti grafik berikut. Ariel pergi ke rumah nenek yang berjarak 25 kilometer dengan menggunakan taksi tersebut. Berapa tarif taksi yang harus dibayar Ariel?", options: ["A. Rp66.000,00", "B. Rp73.000,00", "C. Rp82.000,00", "D. Rp143.000,00"] },
  { no: 23, soal: "Sebuah kota terdapat dua perusahaan taksi A dan taksi B. Perusahaan tersebut menawarkan tarif taksi seperti tabel berikut:\nJarak (km) | Tarif Taksi A | Tarif Taksi B\n0 (Awal) | 13.000 | 6.000\n2 | 15.000 | 10.000\n4 | 17.000 | 14.000\nPenumpang taksi dapat memilih tarif taksi yang lebih murah. Amir ingin pergi ke Bioskop yang berjarak 8 km dari rumahnya. Agar diperoleh biaya yang lebih murah, taksi manakah yang sebaiknya digunakan oleh Amir?", options: ["A. Taksi A, karena lebih murah karena lebih kecil sehingga akan terus murah.", "B. Taksi B, karena tarif taksi lebih murah.", "C. Taksi A, karena lebih murah seribu rupiah.", "D. Taksi B, karena lebih murah seribu rupiah."] },
  { no: 24, soal: "Jika $f(x+1) = x + f(x)$ dan $f(2) = 2$, maka nilai dari $f(5)$ adalah...", options: ["A. 5", "B. 15", "C. 28", "D. 34"] },
  { no: 25, soal: "Diketahui fungsi $f(5) = 16$, maka nilai $f(2)$ jika $2f(x) = f(x+1)$ adalah...", options: ["A. 1", "B. 2", "C. 5", "D. 7"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2006 Tingkat Kota\nMisalkan A = {1, 2, 3} dan B = {a, b, c}. Banyaknya korespondensi satu-satu yang dapat dibuat dari A ke B adalah ...", options: ["A. 1", "B. 3", "C. 6", "D. 9", "E. 27"] },
  { no: 2, soal: "OSN Matematika 2007 Tingkat Kota\nJika f fungsi dari himpunan bilangan asli ke himpunan bilangan asli yang memenuhi $f(x) + f(x + 1) = 2x^2$ dan $f(31) = 99$, maka $f(99) = ...$", options: ["A. 8.673", "B. 8.772", "C. 8.871", "D. 9.950", "E. 9.604"] },
  { no: 3, soal: "OSN Matematika 2008 Tingkat Kota\nJika $f(z) = az + b$, maka nilai dari $\\frac{f(b) - f(a)}{b - a}$ adalah ...", options: ["A. b", "B. $b^2$", "C. a", "D. $a^2$", "E. ab"] },
  { no: 4, soal: "OSN Matematika 2009 Tingkat Kota\nJika $f(n)$ menyatakan banyak faktor dari bilangan asli n, maka $f(f(f(2009))) = ...$", options: [] },
  { no: 5, soal: "OSN Matematika 2012 Tingkat Kota\nJika $f(x) = 3x + 1$, $g(x) = 1 - 2x$ dan $f(g(a)) = 28$, maka nilai a adalah ...", options: ["A. -7", "B. -4", "C. 4", "D. 7", "E. 13,5"] },
  { no: 6, soal: "OSN Matematika 2012 Tingkat Kota\nUntuk setiap bilangan bulat x didefinisikan fungsi f dengan $f(x)$ adalah banyak angka (digit) dari bilangan x. Contoh: $f(125) = 3$ dan $f(2012) = 4$. Nilai $f(2^{2012}) + f(5^{2012})$ adalah ...", options: ["A. 2013", "B. 2014", "C. 2015", "D. 2016", "E. 2025"] },
  { no: 7, soal: "OSN Matematika 2013 Tingkat Kota\nJika f adalah fungsi linear, $f(1) = 2000$ dan $f(x + 1) + 12 = f(x)$, maka nilai $f(100) = ...$", options: ["A. 762", "B. 812", "C. 832", "D. 912", "E. 1012"] },
  { no: 8, soal: "OSN Matematika 2015 Tingkat Kota\nDidefinisikan fungsi $f(n) = 2^{\\frac{n-1}{2}} + 2^{\\frac{n+1}{2}} - 2^{\\frac{n}{2}}$ untuk setiap bilangan asli n. Nilai $f(1) + f(2) + ... + f(5)$ adalah ...", options: ["A. -31", "B. -15", "C. 15", "D. 31"] },
  { no: 9, soal: "OSN Matematika 2015 Tingkat Kota\nMisalkan $f(x) = 209 - x^2$. Jika terdapat dua bilangan bulat positif a dan b dengan a < b sehingga $f(ab) = f(a + 2b) - f(a - 2b)$, maka nilai $\\frac{b}{a}$ adalah ...", options: [] },
  { no: 10, soal: "OSN Matematika 2016 Tingkat Kota\nSuatu fungsi ditentukan dengan rumus\n$f(x) = \\begin{cases} 2x + 1, & \\text{untuk genap} \\\\ 2x - 1, & \\text{untuk ganjil} \\end{cases}$\nJika a adalah bilangan asli, maka yang tidak mungkin untuk $f(a)$ adalah ...", options: ["A. 21", "B. 39", "C. 61", "D. 77"] },
  { no: 11, soal: "OSN Matematika 2016 Tingkat Kota\nDiketahui barisan fungsi $f_1(x), f_2(x), f_3(x), ...$ sedemikian sehingga $f_1(x) = x$ dan $f_{n+1}(x) = \\frac{1}{1 - f_n(x)}$ untuk bilangan bulat $n \\geq 1$. Nilai dari $f_{2016}(2016) = ...$", options: [] },
  { no: 12, soal: "OSN Matematika 2017 Tingkat Kota\nDiketahui fungsi f memenuhi persamaan $f(x) + f\\left(\\frac{1}{2x}\\right) = 5x$ untuk $x \\neq 0$. Nilai $f(1)$ sama dengan ...", options: ["A. $\\frac{3}{7}$", "B. $\\frac{3}{14}$", "C. $\\frac{3}{18}$", "D. $\\frac{1}{7}$"] },
  { no: 13, soal: "OSN Matematika 2018 Tingkat Kota\nDiketahui grafik fungsi bernilai real f dan g seperti pada gambar berikut. Jumlah semua nilai x yang memenuhi $\\frac{f(x)}{g(x)} = -1$ adalah ...", options: ["A. $-3 - \\sqrt{2}$", "B. -1", "C. 0", "D. 2"] },
  { no: 14, soal: "OSN Matematika 2019 Tingkat Kota\nJika $f(n)$ menyatakan banyaknya faktor positif dari bilangan bulat n yang lebih besar dari $\\sqrt{n}$, selisih nilai dari $f(3^4 \\cdot 4^3)$ dan $f(3^2 \\cdot 4^2)$ adalah ...", options: ["A. 0", "B. 24", "C. 27", "D. 54"] },
  { no: 15, soal: "OSN Matematika 2020 Tingkat Kota\nJika $f(x) = 5x - 3$, maka jumlah semua x yang memenuhi $f(x)^2 - 6f(x) = -9$ adalah ...", options: ["A. 0", "B. 3", "C. $\\frac{3}{5}$", "D. $\\frac{6}{5}$"] },
  { no: 16, soal: "OSN Matematika 2022 Tingkat Kota\nDiketahui $f(x) = x^{2022} - x^{2021}$ dan\n$g(x) = x^{2020} - 2x^{2019} + 3x^{2018} - 4x^{2017} + ... - 2020x + 2021$\nJika n adalah nilai minimum dari $f(x) + g(x)$ untuk x bilangan real, maka nilai $n + 1$ adalah ...", options: ["A. 1011", "B. 1012", "C. 2021", "D. 2022"] },
  { no: 17, soal: "OSN Matematika 2023 Tingkat Kota\nDiketahui fungsi-fungsi:\n$F_1(x), F_2(x), F_3(x), ..., F_{1000}(x)$\nDengan $F_1(x) = x$ dan untuk $n \\geq 1$, $F_{n+1}(x) = \\frac{1}{1 - F_n(x)}$\nJika k adalah bilangan genap tiga digit sehingga $F_k(k) = k$, maka banyaknya semua nilai k yang mungkin adalah ...", options: [] },
  { no: 18, soal: "OSN Matematika 2023 Tingkat Kota\nSeorang milliader sedang membangun hotel. Kamar-kamar hotel tersebut diberi nomor secara berurutan dengan menggunakan bilangan asli mulai dari angka 1. Nomor kamar dibuat dari plat besi seharga Rp8.000 per digit. Sebagai contoh No.7 perlu biaya Rp8.000 dan No.11 perlu biaya Rp16.000. Jika hotel tersebut menghasilkan biaya sebesar Rp33.416.000 untuk membuat seluruh nomor kamar, maka banyaknya kamar pada hotel tersebut adalah ...", options: ["A. 1.288", "B. 1.321", "C. 2.700", "D. 4.177"] },
  { no: 19, soal: "OSN Matematika 2023 Tingkat Kota\nJika $f(x) = x + x^2 + x^3 + ... + x^{2310} + 2025$\nNilai $f(2) + f(1) - f(-1) - f(-2) = ...$", options: ["A. 0", "B. $\\frac{565}{256}$", "C. $\\frac{13365}{256}$", "D. 11430"] },
];

const OlimpiadeRelasiFungsiPage = () => {
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
          OLIMPIADE - RELASI DAN FUNGSI
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

export default OlimpiadeRelasiFungsiPage;

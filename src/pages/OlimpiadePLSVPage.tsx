import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

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
  title: "MATERI - PERSAMAAN DAN PERTIDAKSAMAAN LINEAR SATU VARIABEL",
  sections: [
    {
      heading: "A. Persamaan Linear Satu Variabel",
      content: `1. Pengertian
Persamaan linear satu variabel adalah persamaan yang hanya memuat satu variabel (misalnya: x) dengan pangkat tertinggi 1.

2. Bentuk Umum
$ax + b = 0$ dengan $a \\neq 0$

Contoh Soal & Pembahasan
Selesaikan persamaan $3x - 5 = 10$
Penyelesaian:
$3x - 5 = 10$
$3x = 10 + 5$
$3x = 15$
$x = \\frac{15}{3}$
$x = 5$`
    },
    {
      heading: "B. Pertidaksamaan Linear Satu Variabel",
      content: `1. Pengertian
Pertidaksamaan linear satu variabel adalah bentuk pertidaksamaan (>, <, ≥, ≤) yang memuat satu variabel berpangkat 1.

2. Bentuk Umum
$ax + b < c$, $ax + b > c$, $ax + b \\leq c$, $ax + b \\geq c$

Contoh Soal & Pembahasan
Tentukan himpunan penyelesaian dari $2x + 3 \\leq 11$
Penyelesaian:
$2x + 3 \\leq 11$
$2x \\leq 11 - 3$
$2x \\leq 8$
$x \\leq 4$
Himpunan penyelesaian dalam notasi interval: $x \\leq 4$ atau dapat ditulis $(-\\infty, 4]$`
    },
    {
      heading: "C. Membuat Model Matematika",
      content: `Untuk membuat model matematika dari sebuah soal cerita, ikuti langkah-langkah berikut:
1. Identifikasi Besaran yang Tidak Diketahui: Tentukan apa yang menjadi variabel dalam soal. Beri nama variabel tersebut dengan sebuah huruf (misalnya: x, y, a).
2. Temukan Kata Kunci: Cari kata-kata dalam soal yang menunjukkan hubungan pertidaksamaan.
3. Tuliskan Modelnya: Gabungkan variabel, angka, dan simbol pertidaksamaan yang sesuai.

Kata kunci dalam membuat Model Matematika PTLSV:
$<$ : kurang dari, di bawah, lebih kecil dari
$>$ : lebih dari, di atas, melebihi
$\\leq$ : maksimal, tidak lebih dari, paling banyak
$\\geq$ : minimal, tidak kurang dari, paling sedikit, sekurang-kurangnya`
    },
    {
      heading: "D. Pertidaksamaan Di Antara (Compound Inequalities)",
      content: `1. Pengertian
Pertidaksamaan ini melibatkan dua tanda ketidaksamaan sekaligus, dan menyatakan bahwa nilai variabel harus berada dalam dua batas tertentu.

2. Bentuk Umum
$a < bx + c < d$

Contoh Soal & Pembahasan
Tentukan himpunan penyelesaian dari $-3 < 2x - 1 \\leq 5$
Penyelesaian:
Pisahkan menjadi dua pertidaksamaan:
$-3 < 2x - 1$ dan $2x - 1 \\leq 5$
$-3 + 1 < 2x$ dan $2x \\leq 6$
$-2 < 2x$ dan $x \\leq 3$
$-1 < x$ dan $x \\leq 3$
Diiriskan sehingga penyelesaiannya menjadi $-1 < x \\leq 3$
Himpunan penyelesaian dalam interval: $(-1, 3]$`
    },
    {
      heading: "E. Pertidaksamaan Kuadrat",
      content: `1. Pengertian
Pertidaksamaan kuadrat melibatkan variabel dengan pangkat tertinggi 2.

2. Bentuk Umum
$ax^2 + bx + c > 0$, $ax^2 + bx + c < 0$, $ax^2 + bx + c \\geq 0$, $ax^2 + bx + c \\leq 0$

Langkah penyelesaian:
1. Faktorkan atau gunakan rumus kuadrat untuk mencari akar-akar
2. Buat garis bilangan dengan titik-titik kritis
3. Uji tanda pada setiap interval
4. Tentukan penyelesaian berdasarkan tanda pertidaksamaan`
    },
    {
      heading: "F. Pertidaksamaan Pecahan",
      content: `Contoh:
Selesaikan: $\\frac{x-2}{x+3} \\geq 0$

Penyelesaian:
1. Pembilang: $x - 2 = 0 \\Rightarrow x = 2$
2. Penyebut: $x + 3 = 0 \\Rightarrow x = -3$ (tidak boleh = 0)
3. Garis bilangan dengan titik kritis -3 dan 2
4. Penyelesaian: $x < -3$ atau $x \\geq 2$`
    },
    {
      heading: "G. Nilai Mutlak",
      content: `Pengertian
Nilai mutlak suatu bilangan adalah nilai positif bilangan tersebut.

$|x| = \\begin{cases} x, & \\text{jika } x \\geq 0 \\\\ -x, & \\text{jika } x < 0 \\end{cases}$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Jika p merupakan penyelesaian dari $6(2x + 5) = 3(3x - 2) + 6$, maka nilai $p + 2$ adalah ...", options: ["A. -4", "B. -6", "C. -8", "D. -10"] },
  { no: 2, soal: "Diketahui n adalah penyelesaian persamaan $\\frac{1}{2}x + \\frac{2x-1}{3} = \\frac{x+2}{4} - \\frac{1}{2}$. Nilai $n + 5$ adalah ...", options: ["A. $\\frac{9}{2}$", "B. $\\frac{17}{4}$", "C. $\\frac{1}{2}$", "D. $\\frac{9}{2}$"] },
  { no: 3, soal: "Nilai x yang memenuhi persamaan $\\frac{1}{2}(x - 10) = 2x - 5$ adalah ...", options: ["A. -6", "B. -4", "C. 4", "D. 6"] },
  { no: 4, soal: "Perhatikan persamaan berikut! $5(2x - 3) + 4 = 2(3x + 1) - (-3)$ mempunyai penyelesaian n. Nilai dari $3n + 5$ adalah ...", options: ["A. 4", "B. 7", "C. 13", "D. 17"] },
  { no: 5, soal: "Jika $\\frac{1}{2}(x - 6) = 2 + 3x$, maka nilai $x + 5$ = ...", options: ["A. 6", "B. -6", "C. 3", "D. -3"] },
  { no: 6, soal: "Nilai x yang memenuhi $\\frac{4x+5}{2x+1} = \\frac{16}{5}$ adalah ...", options: ["A. $\\frac{3}{4}$", "B. $\\frac{3}{2}$", "C. $\\frac{2}{3}$", "D. $\\frac{4}{3}$"] },
  { no: 7, soal: "Jika $\\frac{4}{x-3} = \\frac{2}{x+1}$, maka nilai x yang memenuhi adalah ...", options: ["A. -5", "B. -4", "C. -2", "D. 4", "E. 5"] },
  { no: 8, soal: "Persamaan $\\frac{2}{x+1} - \\frac{1}{x} = \\frac{4}{x}$ adalah benar untuk x sama dengan ...", options: ["A. $-1 - \\frac{\\sqrt{3}}{3}$", "B. $-1 - \\sqrt{5}$", "C. 1", "D. $\\frac{3}{5}$"] },
  { no: 9, soal: "Diketahui persamaan $\\frac{2(3x-6)}{(x-1)(x+1)} + \\frac{1}{x+1} = \\frac{4}{x-1} - \\frac{1}{x-1}$. Nilai x yang memenuhi persamaan adalah ...", options: ["A. $-\\frac{4}{3}$", "B. 1", "C. $4\\frac{1}{3}$", "D. $5\\frac{2}{3}$"] },
  { no: 10, soal: "Himpunan penyelesaian dari $3(2x + 4) \\leq 2(x - 2)$ untuk x bilangan bulat adalah ...", options: ["A. {..., -7, -6, -5, -4}", "B. {-4, -3, -2, 0, ...}", "C. {1, 2, 3, 4, ...}", "D. {4, 5, 6, 7, ...}"] },
  { no: 11, soal: "Penyelesaian dari pertidaksamaan $\\frac{1}{2}(2x - 6) = \\frac{1}{3}(x - 4)$ adalah ...", options: ["A. $x \\geq -17$", "B. $x \\geq -1$", "C. $x \\geq 1$", "D. $x \\geq 17$"] },
  { no: 12, soal: "Himpunan penyelesaian dari $2x - 3 \\geq 21 + 4x$ dengan x bilangan bulat adalah ...", options: ["A. {-12, -11, -10, -9, ...}", "B. {-9, -8, -7, -6, ...}", "C. {..., -5, -14, -13, -12}", "D. {..., -12, -11, -10, -9}"] },
  { no: 13, soal: "Harga sebuah buku Rp. 4000,00 lebihnya dari harga bollpoin. Rina membeli dua buah buku dan sebuah bollpoin seharga Rp. 26.000,00. Jika harga bollpoin x rupiah. Kalimat matematikanya adalah ...", options: ["A. $2x - 4000 = 26.000$", "B. $2x + 8000 = 26.000$", "C. $3x - 4000 = 26.000$", "D. $3x + 8000 = 26.000$"] },
  { no: 14, soal: "Umur ayah p tahun dan ayah 6 tahun lebih tua dari paman. Jika jumlah umur paman dan ayah 38 tahun, maka model matematika yang tepat adalah ...", options: ["A. $2p + 6 = 38$", "B. $2p - 6 = 38$", "C. $p + 6 = 38$", "D. $p - 6 = 38$"] },
  { no: 15, soal: "Besar uang Rohayah sama dengan tiga kali dari Rp5000,00 lebihnya dari uang Danu kemudian dikurangi Rp 10.000,00. Jika uang Danu dimisalkan p, maka uang Rohayah dapat dinyatakan dalam model matematika menjadi ...", options: ["A. $3(p - 5.000) - 10.000$", "B. $3(p + 5.000) - 10.000$", "C. $3p - 5.000 - 10.000$", "D. $3p + 5.000 - 10.000$"] },
  { no: 16, soal: "Jumlah tiga bilangan ganjil berurutan adalah 45, jumlah bilangan terbesar dan terkecil adalah ...", options: ["A. 26", "B. 30", "C. 34", "D. 38"] },
  { no: 17, soal: "Sebuah taman berbentuk persegi panjang dengan ukuran panjang $(2x+5)$ m dan lebar $(3x-2)$ cm. Jika keliling taman 46 cm, maka luas taman adalah ...", options: ["A. 140 cm²", "B. 132 cm²", "C. 130 cm²", "D. 116 cm²"] },
  { no: 18, soal: "Diketahui taman berbentuk persegi panjang yang panjangnya $(2x - 6)$ cm dan lebarnya $x$ cm. Jika kelilingnya tidak lebih dari 48 cm, lebar taman (l) adalah ...", options: ["A. $0 < l \\leq 10$", "B. $0 < l \\leq 12$", "C. $3 < l \\leq 10$", "D. $3 < l \\leq 12$"] },
  { no: 19, soal: "Kebun Pak Hartono berbentuk persegi panjang yang mempunyai ukuran, panjang dan diagonal berturut-turut $(4x - 10)$ meter dan $(3x - 5)$ meter. Panjang diagonal kebun Pak Hartono adalah ...", options: ["A. 4 meter", "B. 6 meter", "C. 7 meter", "D. 10 meter"] },
  { no: 20, soal: "Perbandingan panjang dan lebar persegi panjang adalah 7 : 4. Jika keliling persegi panjang tersebut 66 cm, maka luasnya adalah ...", options: ["A. 132 cm²", "B. 198 cm²", "C. 218 cm²", "D. 252 cm²"] },
  { no: 21, soal: "Syarat seseorang dapat mengikuti suatu lomba adalah apabila umurnya tidak kurang dari 17 tahun. Jika umur Ali 18 tahun, Ani 15 tahun, Alex 16 tahun dan Ahmad 19 tahun, berapa orang diantara mereka yang sudah boleh mengikuti lomba?", options: ["A. 1 orang", "B. 2 orang", "C. 3 orang", "D. 4 orang"] },
  { no: 22, soal: "Taman bunga berbentuk persegi panjang dengan ukuran $(8x + 2)$ meter dan ukuran lebarnya $(6x - 16)$ meter. Jika keliling taman tidak kurang dari 140 meter, maka panjang taman tersebut (p) adalah ...", options: ["A. $p > 50$", "B. $p \\geq 50$", "C. $p > 90$", "D. $p \\geq 90$"] },
  { no: 23, soal: "Diketahui segitiga dengan alas 10 cm dan tinggi $(x - 4)$ cm. Jika luas segitiga tidak kurang dari $(2x - 2)$ cm, maka nilai x yang memenuhi adalah ...", options: ["A. $x \\geq 6$", "B. $x > 6$", "C. $x \\geq 4$", "D. $x > 4$"] },
  { no: 24, soal: "Himpunan penyelesaian pertidaksamaan $-6 < 3(x - 1) < 9$ adalah ...", options: ["A. $\\{x | -2 < x < 3, x \\in R\\}$", "B. $\\{x | 2 < x < 3, x \\in R\\}$", "C. $\\{x | 1 < x < 4, x \\in R\\}$", "D. $\\{x | -1 < x < 4, x \\in R\\}$"] },
  { no: 25, soal: "Jika $x \\leq 6$ dan $x > -3$ maka ...", options: ["A. $-3 < x \\leq 6$", "B. $-6 \\leq x < 3$", "C. $x \\leq -3$ atau $x > 6$", "D. $x \\leq -3$ atau $x \\geq 6$"] },
  { no: 26, soal: "Jika $-3 \\leq x - 2 < 5$ maka ...", options: ["A. $-5 \\leq x < 3$", "B. $1 \\leq x < 3$", "C. $-1 \\leq x < 7$", "D. $1 \\leq x < 7$"] },
  { no: 27, soal: "Jika $8 \\leq 2 - 3x \\leq 17$ maka ...", options: ["A. $-2 \\leq x \\leq 5$", "B. $2 \\leq x \\leq 5$", "C. $-5 \\leq x \\leq 2$", "D. $-5 \\leq x \\leq -2$"] },
  { no: 28, soal: "Nilai x yang memenuhi $2 - 3x < 2x - 8$ dan $-5 \\leq 3 - 2x < 1$ adalah ...", options: ["A. $-1 < x < 4$", "B. $1 < x < 4$", "C. $2 < x < 4$", "D. $1 < x < 2$"] },
  { no: 29, soal: "Jika $-2 < x < 2$ dan $3 < y < 8$ manakah diantara pernyataan di bawah ini yang menunjukkan jangkauan dari semua nilai untuk $y - x$?", options: ["A. $5 < y - x < 6$", "B. $1 < y - x < 5$", "C. $1 < y - x < 10$", "D. $5 < y - x < 10$"] },
  { no: 30, soal: "Jika $-2 < x < 3$ dan $-3 < y < 4$ maka ...", options: ["A. $-5 < x + y < 7$", "B. $0 < x + y < 2$", "C. $-5 < x + y < 1$", "D. $-1 < x + y < 1$"] },
  { no: 31, soal: "Jika $(x - 1)(x - 3) < 0$ maka ...", options: ["A. $-1 < x < -3$", "B. $1 < x < 3$", "C. $x < 1$ atau $x > 3$", "D. $x < -3$ atau $x > -1$"] },
  { no: 32, soal: "Penyelesaian pertidaksamaan $x^2 + 2x - 24 < 0$ adalah ...", options: ["A. $-4 < x < 6$", "B. $-6 < x < 4$", "C. $x < -4$ atau $x > 6$", "D. $x < -6$ atau $x > 4$"] },
  { no: 33, soal: "Penyelesaian pertidaksamaan $3x^2 + 4x - 7 \\geq 0$ adalah ...", options: ["A. $-1 < x < 2\\frac{1}{3}$", "B. $-2\\frac{1}{3} < x < 1$", "C. $x < -1$ atau $x > 2\\frac{1}{3}$", "D. $x \\leq -2\\frac{1}{3}$ atau $x \\geq 1$"] },
  { no: 34, soal: "Penyelesaian pertidaksamaan $\\frac{x-1}{x-4} \\geq 0$ adalah ...", options: ["A. $1 < x \\leq 4$", "B. $1 \\leq x < 4$", "C. $x \\leq 1$ atau $x \\geq 4$", "D. $x \\leq 1$ atau $x > 4$"] },
  { no: 35, soal: "Penyelesaian pertidaksamaan $\\frac{x^2 + 2x - 24}{x + 2} < 0$ adalah ...", options: ["A. $-2 < x < 4$ atau $x > 6$", "B. $x < -4$ atau $-2 < x < 6$", "C. $-6 < x < -2$ atau $x > 4$", "D. $x < -6$ atau $-2 < x < 4$"] },
  { no: 36, soal: "Penyelesaian pertidaksamaan $\\frac{(x+2)^2(x-1)}{x^2-x-12} \\leq 0$ adalah ...", options: ["A. $-3 < x < 4$", "B. $-3 < x \\leq 2$ atau $1 \\leq x < 4$", "C. $-3 < x < 4$ atau $1 < x < 4$ atau $x = -2$", "D. $x < -3$ atau $1 \\leq x < 4$", "E. $x \\leq -3$ atau $x > 4$"] },
  { no: 37, soal: "Penyelesaian pertidaksamaan $\\sqrt{3x + 1} \\leq 4$ adalah ...", options: ["A. $-\\frac{1}{3} \\leq x \\leq 4$", "B. $\\frac{1}{3} \\leq x \\leq 4$", "C. $x \\geq 4$", "D. $x \\geq -\\frac{1}{3}$"] },
  { no: 38, soal: "Penyelesaian pertidaksamaan $\\sqrt{3x - 1} \\geq \\sqrt{2x + 5}$ adalah ...", options: ["A. $-2 \\leq x \\leq 6$", "B. $-\\frac{1}{3} \\leq x \\leq 6$ atau $x > 1$", "C. $x \\leq -2\\frac{1}{2}$", "D. $x \\geq 6$"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika Tingkat Kota 2006\nJika $5 \\leq x \\leq 10$ dan $2 \\leq y \\leq 6$, maka nilai minimum untuk $(x - y)(x + y)$ adalah ...", options: ["A. -21", "B. -12", "C. -11", "D. 11", "E. 12"] },
  { no: 2, soal: "OSN Matematika Tingkat Kota 2006\nSelisih terbesar dari 2 bilangan rasional x yang memenuhi pertidaksamaan $\\frac{1}{5} < 2x < \\frac{1}{2}$ adalah ...", options: ["A. $\\frac{1}{20}$", "B. $\\frac{1}{10}$", "C. $\\frac{1}{8}$", "D. $\\frac{1}{80}$", "E. Jawaban A, B, C dan D salah"] },
  { no: 3, soal: "OSN Matematika 2014 Tingkat Kota\nSemua nilai x yang memenuhi pertidaksamaan $\\frac{(x-1)(x^2+6)}{x+3} \\leq x - 1$ adalah ...", options: [] },
  { no: 4, soal: "OSN Matematika 2014 Tingkat Kota\nJika 2014 dinyatakan sebagai jumlah dari bilangan-bilangan asli berurutan, maka bilangan asli terbesar yang mungkin adalah ...", options: [] },
  { no: 5, soal: "OSN Matematika 2016 Tingkat Kota\nMisalkan $[x]$ menyatakan bilangan bulat terkecil yang lebih besar daripada atau sama dengan x. Jika $x = \\frac{1}{1001} + \\frac{2}{1002} + \\frac{3}{1003} + ... + \\frac{10}{1010}$, maka $[x]$ = ...", options: ["A. 35", "B. 36", "C. 37", "D. 38"] },
  { no: 6, soal: "OSN Matematika 2017 Tingkat Kota\nDiketahui n dan k adalah dua bilangan bulat. Jika terdapat tepat satu nilai k yang memenuhi pertidaksamaan $\\frac{8}{15} < \\frac{n}{n+k} < \\frac{7}{13}$, maka nilai n terbesar yang mungkin adalah ...", options: [] },
  { no: 7, soal: "OSN Matematika 2018 Tingkat Kota\nJika $-1 < x < y < 0$, maka berlaku ...", options: ["A. $xy < x^2y < xy^2$", "B. $xy < xy^2 < x^2y$", "C. $xy^2 < x^2y < xy$", "D. $x^2y < xy^2 < xy$"] },
  { no: 8, soal: "OSN Matematika 2020 Tingkat Kota\nDiberikan empat bilangan bulat positif a, b, c dan d yang memenuhi pertidaksamaan $a < b < c < d$. Diketahui pula $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} + \\frac{1}{d} = 1$. Banyaknya pasangan bilangan $(a, b, c, d)$ yang memenuhi permasalahan di atas adalah ...", options: ["A. 1", "B. 4", "C. 6", "D. 9"] },
  { no: 9, soal: "OSN Matematika 2024 Tingkat Kota\nDiketahui pertidaksamaan $\\sqrt{x-3} + \\sqrt{6-x} \\geq p$ memiliki penyelesaian untuk $x \\in R$. Nilai p terbesar yang mungkin adalah ...", options: ["A. $\\sqrt{6}$", "B. 3", "C. $\\sqrt{6} + \\sqrt{3}$", "D. 6"] },
  { no: 10, soal: "OSN Matematika 2025 Tingkat Kota\nPasangan terurut bilangan bulat $(x, y)$ dengan $-5 \\leq x \\leq 5$ dan $-5 \\leq y \\leq 5$ yang memenuhi nilai $10 \\leq x^2 + y^2 \\leq 30$ ada sebanyak ...", options: ["A. 10", "B. 25", "C. 34", "D. 68"] },
  { no: 11, soal: "OSN Matematika 2025 Tingkat Kota\nSejumlah kertas berbentuk persegi panjang ditumpuk kemudian dilipat dua sekaligus untuk membentuk buku. Buku yang diberi nomor halaman berurutan mulai dari 1, 2, 3 dan seterusnya hingga akhir. Jika salah satu lembar kertas dari buku tersebut diambil, jumlah keempat nomor halamannya adalah 122. Banyaknya kertas yang digunakan untuk menyusun buku tersebut adalah ... lembar.", options: ["A. 60", "B. 15", "C. 12", "D. 10"] },
];

const OlimpiadePLSVPage = () => {
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
          OLIMPIADE - PLSV DAN PtLSV
        </h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Irawan Sutiawan, M.Pd</p>

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

        {activeTab === "dasar" && (
          <div className="space-y-4 animate-slide-up">
            {latihanDasar.map((soal) => (
              <div key={soal.no} className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
                <div className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {renderWithLatex(soal.soal)}
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

export default OlimpiadePLSVPage;

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
  title: "MATERI - MODULO (SISA PEMBAGIAN)",
  sections: [
    {
      heading: "A. Hubungan Antara Bilangan Yang Dibagi, Pembagi, Hasil Bagi dan Sisa",
      content: `Dalam operasi pembagian, hubungan antara bilangan yang dibagi (dividend), pembagi, hasil bagi dan sisa dapat dirumuskan sebagai:

Yang Dibagi = (Pembagi × Hasil Bagi) + Sisa

Sisa pembagian harus selalu kurang dari nilai pembagi.

Penjelasan:
- Yang Dibagi (Dividen): Bilangan yang akan dibagi.
- Pembagi: Bilangan yang digunakan untuk membagi.
- Hasil Bagi: Bilangan yang menunjukkan berapa kali pembagi dapat "masuk" ke dalam yang dibagi.
- Sisa: Bilangan yang tersisa setelah pembagian dilakukan.

Contoh:
Jika kita membagi 17 dengan 5 maka 17 adalah yang dibagi (dividend), 5 adalah pembagi, Hasil baginya adalah 3 (karena $5 \\times 3 = 15$), Sisanya adalah 2 (karena $17 - 15 = 2$).
Maka, hubungan tersebut dapat ditulis sebagai: $17 = 5 \\times 3 + 2$`
    },
    {
      heading: "B. Apa itu Modulo?",
      content: `Modulo biasa digunakan untuk mencari sisa dari pembagian bilangan.

Misalnya, "Berapakah sisa jika 123 dibagi 12?". Tentunya kita mengetahui bahwa:
$123 = 10 \\times 12 + 3$, yang artinya jika 123 dibagi 12 maka akan bersisa 3. Dengan menggunakan modulo dapat kita tulis $123 \\mod 12 = 3$ atau $\\text{mod}(123, 12) = 3$.`
    },
    {
      heading: "C. Penulisan Modulo",
      content: `Pada tulisan ini kita akan menggunakan tanda "=" agar lebih mudah dipahami, namun perlu kalian ketahui secara internasional penulisan modulo adalah sebagai berikut:

$a \\equiv b \\mod m$

yang artinya m membagi habis $(a - b)$ atau dengan kata lain "Jika a dibagi m maka akan bersisa b".

Contoh:
$30 \\equiv 2 \\mod 4$
Artinya 4 membagi habis $(30 - 2)$, atau "Jika 30 dibagi 4 maka akan bersisa 2". Jika menggunakan tanda "=" dapat kita tulis $30 \\mod 4 = 2$.`
    },
    {
      heading: "D. Kaidah Dasar 1",
      content: `$a \\mod n = (bn + c) \\mod n = c \\mod n$

Contoh:
1) Berapakah sisa 7 dibagi 9?
Jawab:
$7 \\mod 9 = 7$
Jadi, 7 dibagi 9 akan bersisa 7

2) Berapakah sisa 35 dibagi 8?
Jawab:
$35 \\mod 8 = (4 \\cdot 8 + 3) \\mod 8$
$= 3 \\mod 8$
$= 3$
Jadi, 35 dibagi 8 akan bersisa 3.

3) Berapakah sisa 120 dibagi 13?
Jawab:
$120 \\mod 13 = (10 \\cdot 13 - 10) \\mod 13$
$= (-10) \\mod 13$
$= ((-1) \\cdot 13 + 3) \\mod 13$
$= 3 \\mod 13$
$= 3$
Jadi, 120 dibagi 13 bersisa 3`
    },
    {
      heading: "D. Kaidah Dasar 2 (Linearitas penjumlahan/pengurangan)",
      content: `$(a + b) \\mod n = [(a \\mod n) + (b \\mod n)] \\mod n$

Contoh:
1) Berapakah sisa pembagian $(10 + 17 + 21)$ oleh 9?
Jawab:
$(10 + 17 + 21) \\mod 9 = (10 \\mod 9 + 17 \\mod 9 + 21 \\mod 9) \\mod 9$
$= (1 + 8 + 3) \\mod 9$
$= 12 \\mod 9$
$= 3 \\mod 9$
$= 3$
Jadi $(10 + 17 + 21)$ jika dibagi 9 maka akan bersisa 3

2) Berapakah sisa $(2011 + 2012 + 2013 + \\cdots + 2018)$ dibagi 2019?
Jawab:
$(2011 + 2012 + 2013 + \\cdots + 2018) \\mod 2019$
$= (-8 - 7 - 6 - \\cdots - 1) \\mod 2019$
$= (-36) \\mod 2019$
$= ((-1) \\cdot 2019 + 1983) \\mod 2019$
$= 1983$
Jadi, $(2011 + 2012 + 2013 + \\cdots + 2018)$ jika dibagi 2019 maka akan bersisa 1983`
    },
    {
      heading: "D. Kaidah Dasar 3 (Linearitas perkalian)",
      content: `$(ab) \\mod n = [(a \\mod n)(b \\mod n)] \\mod n$

Contoh:
1) Berapakah sisa pembagian $(7 \\times 9 \\times 10)$ oleh 8?
Jawab:
$(7 \\times 9 \\times 10) \\mod 8 = ((7 \\mod 8)(9 \\mod 8)(10 \\mod 8)) \\mod 8$
$= (7 \\times 1 \\times 2) \\mod 8$
$= 14 \\mod 8$
$= 6$

2) Berapakah digit terakhir (satuan) dari $(2016 \\times 2017 \\times 2018 \\times 2019)$?
Jawab:
Menentukan digit terakhir (nilai satuan) sama dengan kita mencari sisa jika dibagi 10 sehingga
$(2016 \\times 2017 \\times 2018 \\times 2019) \\mod 10$
$= (6 \\times 7 \\times 8 \\times 9) \\mod 10$
$= (42 \\times 72) \\mod 10$
$= (2 \\times 2) \\mod 10$
$= 4 \\mod 10$
$= 4$
Jadi, digit terakhir dari $(2016 \\times 2017 \\times 2018 \\times 2019)$ adalah 4`
    },
    {
      heading: "D. Kaidah Dasar 4 (Perpangkatan)",
      content: `$a^b \\mod n = ((a \\mod n)^b) \\mod n$

Contoh:
1) Berapakah sisa jika $7^{2019}$ dibagi 8?
Jawab:
$(7^{2019}) \\mod 8 = ((7 \\mod 8)^{2019}) \\mod 8$
$= (-1)^{2019} \\mod 8$
$= (-1) \\mod 8$
$= 7$
Jadi, $7^{2019}$ jika dibagi 8 maka akan bersisa 7

2) Berapakah sisa jika $3^{2009}$ dibagi oleh 41?
Jawab:
$3^{2009} \\mod 41 = (3^{2008} \\cdot 3) \\mod 41$
$= ((3^4)^{502} \\cdot 3) \\mod 41$
$= (81^{502} \\cdot 3) \\mod 41$
$= ((2 \\cdot 41 - 1)^{502} \\cdot 3) \\mod 41$
$= ((-1)^{502} \\cdot 3) \\mod 41$
$= (1 \\cdot 3) \\mod 41$
$= 3 \\mod 41$
$= 3$
Jadi, $3^{2009}$ dibagi 41 akan bersisa 3

3) Berapakah sisa $(54^{54} + 55^{55})$ jika dibagi 7?
Jawab:
$(54^{54} + 55^{55}) \\mod 7$
$= ((8 \\cdot 7 - 2)^{54} \\mod 7 + (8 \\cdot 7 - 1)^{55} \\mod 7) \\mod 7$
$= ((-2)^{54} \\mod 7 + (-1)^{55} \\mod 7)$
$= (((-2)^3)^{18} \\mod 7 + (-1) \\mod 7) \\mod 7$
$= ((-8)^{18} \\mod 7 + 6) \\mod 7$
$= (((-1) \\cdot 7 + (-1))^{18} \\mod 7 + 6) \\mod 7$
$= ((-1)^{18} \\mod 7 + 6) \\mod 7$
$= (1 \\mod 7 + 6) \\mod 7$
$= (1 + 6) \\mod 7$
$= 7 \\mod 7$
$= 0$
Jadi, $54^{54} + 55^{55}$ jika dibagi 7 tidak bersisa`
    },
    {
      heading: "E. Cara Menentukan Bilangan Habis Dibagi 2 Sampai 11",
      content: `1. Habis Dibagi 2
Ciri: Bilangan genap, yaitu angka satuannya (digit terakhir) adalah 0, 2, 4, 6, atau 8.
Contoh: 14 → akhiran 4 → genap → Habis dibagi 2

2. Habis Dibagi 3
Ciri: Jumlah semua digit habis dibagi 3.
Contoh: 123 → $1+2+3=6$ → $6÷3=2$ → Habis dibagi 3

3. Habis Dibagi 4
Ciri: Dua digit terakhir membentuk bilangan yang habis dibagi 4.
Contoh: 316 → $16 ÷ 4 = 4$ → Habis dibagi 4

4. Habis Dibagi 5
Ciri: Digit terakhir adalah 0 atau 5.
Contoh: 75 → akhiran 5 → Habis dibagi 5

5. Habis Dibagi 6
Ciri: Bilangan tersebut habis dibagi 2 dan 3 sekaligus.
Contoh: 72 → genap & jumlah digit $7+2=9$ → $9÷3=3$ → Habis dibagi 6

6. Habis Dibagi 7
Ciri: Ambil digit terakhir, kalikan 2, kurangi hasil dari sisa angka, ulangi hingga kecil, cek habis dibagi 7.
Contoh: 203: $20 - (3×2) = 20-6=14$ → $14÷7=2$ → Habis dibagi 7

7. Habis Dibagi 8
Ciri: Tiga digit terakhir habis dibagi 8.
Contoh: 512 → $512÷8=64$ → Habis dibagi 8

8. Habis Dibagi 9
Ciri: Jumlah semua digit habis dibagi 9.
Contoh: 729 → $7+2+9=18$ → $18÷9=2$ → Habis dibagi 9

9. Habis Dibagi 10
Ciri: Digit terakhir adalah 0.
Contoh: 230 → akhiran 0 → Habis dibagi 10

10. Habis Dibagi 11
Ciri: Selisih jumlah digit ganjil dan genap habis dibagi 11 atau 0. (Jumlah digit berposisi ganjil) – (Jumlah digit berposisi genap)
Contoh: 2728 → $(2+2) – (7+8) = 4 – 15 = -11$ → $-11÷11=-1$ → Habis dibagi 11`
    },
    {
      heading: "F. Definisi Faktor",
      content: `Jika sebuah bilangan bulat 'a' dapat dibagi habis oleh bilangan bulat 'b', maka 'b' disebut faktor dari 'a'.

Dengan kata lain, jika ada bilangan bulat 'k' sehingga $a = b \\times k$, maka 'b' adalah faktor dari 'a', dan 'k' juga merupakan faktor dari 'a'.

Contoh:
12 dapat dibagi habis oleh 1, 2, 3, 4, 6, dan 12. Oleh karena itu, 1, 2, 3, 4, 6, dan 12 adalah faktor dari 12.`
    },
    {
      heading: "G. Banyak faktor positif dari suatu bilangan",
      content: `Jika suatu bilangan n memiliki faktorisasi prima $n = p_1^{a_1} \\cdot p_2^{a_2} \\cdot ... \\cdot p_n^{a_n}$, maka jumlah faktor positifnya adalah $(a_1 + 1)(a_2 + 1)...(a_n + 1)$.`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Tentukan sisa dari:\na. 51 dibagi 5\nb. 123 dibagi 3\nc. 5 dibagi 9\nd. 5555 dibagi 4", options: [] },
  { no: 2, soal: "Tentukan nilai setiap angka berikut pada modulo yang diberikan:\na. $23 \\mod 5$\nb. $27 \\mod 3$\nc. $6 \\mod 8$\nd. $0 \\mod 12$\ne. $38 \\mod 5$", options: [] },
  { no: 3, soal: "Sebuah truk mengangkut tiga jenis barang dengan berat masing-masing 73 kg, 45 kg, dan 98 kg. Jika total berat semua barang tersebut akan dibagi rata ke dalam karung-karung berkapasitas 12 kg, berapakah sisa berat barang yang tidak dapat masuk ke dalam karung terakhir?", options: [] },
  { no: 4, soal: "Berapakah sisa pembagian $(55 + 56 + 57 + 58 + 59 + 60 + 61)$ oleh 60?", options: [] },
  { no: 5, soal: "Sebuah mesin pencetak tiket kereta api memberikan nomor urut secara berurutan. Untuk tujuan audit, setiap tiket yang dicetak diuji dengan mencari sisa pembagian nomor tiket tersebut dengan 150. Jika ada 7 tiket berturut-turut yang dicetak, yaitu dimulai dari tiket bernomor 145, 146, 147, 148, 149, 150, hingga 151, berapakah sisa pembagian total nomor 7 tiket tersebut ketika dibagi dengan 150?", options: [] },
  { no: 6, soal: "Seorang programmer sedang menguji sebuah algoritma enkripsi yang melibatkan perkalian tiga bilangan besar: 25, 34, dan 18. Untuk alasan keamanan, hasil perkalian tersebut harus diuji sisa pembagiannya dengan 11. Berapakah sisa pembagian $(25 \\times 34 \\times 18)$ oleh 11?", options: [] },
  { no: 7, soal: "Seorang desainer grafis membuat pola berulang berdasarkan digit terakhir dari hasil perkalian bilangan-bilangan. Berapakah digit terakhir (nilai satuan) dari hasil perkalian $(127 \\times 354 \\times 789 \\times 416)$?", options: [] },
  { no: 8, soal: "Tentukan sisa dari:\na. $16^2$ dibagi 3\nb. $17^{20}$ dibagi 5\nc. $10^{99}$ dibagi 7\nd. $3^{100}$ dibagi oleh 5\ne. $2^{2015}$ dibagi 9\nf. $3^{1990}$ dibagi 41", options: [] },
  { no: 9, soal: "Tentukan angka terakhir dari $777^{333}$", options: [] },
  { no: 10, soal: "Berapakah digit terakhir dari $3^{2023}$?", options: ["A. 3", "B. 9", "C. 1", "D. 7"] },
  { no: 11, soal: "Berapakah digit terakhir dari $2^{2025}$?", options: ["A. 2", "B. 4", "C. 6", "D. 8"] },
  { no: 12, soal: "Bilangan bulat positif terkecil n sehingga $n!$ habis dibagi oleh 2012 adalah .... (Catatan: $n! = 1 \\times 2 \\times \\cdots \\times n$)", options: [] },
  { no: 13, soal: "Misalkan n adalah bilangan bulat. Jika $n^2 + 2n + 2$ habis dibagi oleh $n + 1$, maka nilai n adalah ....", options: [] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2004 Tingkat Kota\n$2^{13}$ jika dibagi dengan 13 akan memberikan sisa ...", options: [] },
  { no: 2, soal: "OSN Matematika 2007 Tingkat Kota\nSuatu bilangan kuadrat jika dibagi 3, maka kemungkinan sisanya adalah ...", options: ["A. 0", "B. 1", "C. 2", "D. 0 atau 1", "E. 0, 1 atau 2"] },
  { no: 3, soal: "OSN Matematika 2007 Tingkat Kota\nMisalkan a, b dan c bilangan bulat. Pernyataan-pernyataan berikut yang salah adalah ...", options: ["A. Jika a membagi b dan b membagi c, maka a membagi c", "B. Jika a membagi b dan c, maka a membagi b + c", "C. Jika a membagi b dan c, maka a membagi bc", "D. Jika a membagi c dan b membagi c, maka ab membagi c", "E. Jika a membagi b, maka a membagi bc"] },
  { no: 4, soal: "OSN Matematika 2007 Tingkat Kota\nSuatu bilangan kuadrat jika dibagi 3, maka kemungkinan sisanya adalah ...", options: ["A. 0", "B. 1", "C. 2", "D. 0 atau 1", "E. 0, 1 atau 2"] },
  { no: 5, soal: "OSN Matematika 2008 Tingkat Kota\nJika $2^{31} - 1$ dibagi 9, maka sisanya adalah ...", options: ["A. 2", "B. 3", "C. 4", "D. 6", "E. 8"] },
  { no: 6, soal: "OSN Matematika 2010 Tingkat Kota\nDiberikan dua buah bilangan bulat berbeda yang berjumlah 37. Apabila bilangan yang lebih besar dibagi dengan bilangan yang lebih kecil, maka hasil baginya adalah 3 dan sisanya 5. Selisih kedua bilangan tersebut adalah ...", options: ["A. 21", "B. 22", "C. 23", "D. 24", "E. 25"] },
  { no: 7, soal: "OSN Matematika Tingkat Kota 2010\nBilangan tiga digit 2A3 jika ditambah dengan 326 akan menghasilkan bilangan tiga digit 5B9 habis dibagi 9, maka A + B = ...", options: ["A. 5", "B. 6", "C. 7", "D. 8", "E. 9"] },
  { no: 8, soal: "OSN Matematika 2012 Tingkat Kota\nDiketahui 2012 bilangan bulat positif berurutan. Jika setiap bilangan tersebut dibagi 5, kemudian sisa-sisa pembagiannya dijumlahkan, maka hasil penjumlahan sisa-sisanya adalah ...", options: [] },
  { no: 9, soal: "OSN Matematika 2013 Tingkat Kota\nJika a, b, c dan d adalah bilangan bulat positif dibagi 13 berturut-turut bersisa 12, 9, 11 dan 7, maka $3a + 4b - 3c + 2d$ dibagi 13 akan bersisa ...", options: ["A. 0", "B. 1", "C. 7", "D. 9", "E. 11"] },
  { no: 10, soal: "OSN Matematika 2015 Tingkat Kota\nDiberikan tiga bilangan asli yakni 1418, 2134 dan 2850. Jika sisa masing-masing bilangan tersebut dibagi x adalah sama yaitu y dengan $y \\neq 0$, maka hasil $x + y$ yang mungkin adalah ...", options: ["A. 165", "B. 179", "C. 344", "D. 716"] },
  { no: 11, soal: "OSN Matematika 2019 Tingkat Kota\nSisa pembagian $1111^{2019}$ oleh 11111 adalah ...", options: [] },
  { no: 12, soal: "OSN Matematika 2021 Tingkat Kota\nDiketahui n adalah bilangan tiga digit yang dibagi 7 dan 9 masing-masing memberikan sisa 1 dan 2. Jumlah nilai maksimum dan minimum dari n adalah ...", options: ["A. 974", "B. 1003", "C. 1129", "D. 1130"] },
  { no: 13, soal: "OSN Matematika 2021 Tingkat Kota\nDiketahui bilangan bulat positif A dan B bila dibagi 5 berturut-turut bersisa 2 dan 3. Sisa pembagian $A(A + 1) + 5B$ oleh 25 adalah ...", options: [] },
  { no: 14, soal: "OSN Matematika 2022 Tingkat Kota\nJika $a_1$ dan $a_2$ adalah 2 bilangan bulat positif terkecil berbeda yang memenuhi $2^a + 9$ habis dibagi 10 maka nilai $a_1 + a_2$ adalah ...", options: ["A. 18", "B. 22", "C. 24", "D. 26"] },
  { no: 15, soal: "OSN Matematika 2022 Tingkat Kota\nDiketahui himpunan A sebagai berikut\n$\\left\\{\\frac{2^{n+2} - 2^n}{m}, \\frac{2^{n+3} - 2^n}{m}, \\frac{2^{n+4} - 2^n}{m}, ...\\right\\}$\nSemua anggota A adalah bilangan bulat positif. Jika n adalah kelipatan dari m, maka jumlah semua nilai m yang mungkin untuk n = 2022 adalah ...", options: ["A. 3", "B. 6", "C. 12", "D. 28"] },
  { no: 16, soal: "OSN Matematika 2023 Tingkat Kota\nSuatu bilangan prima disebut \"prima kanan\" jika dapat diperoleh bilangan prima dengan menghilangkan setidaknya satu angka di sebelah kiri. Sebagai contoh. 223 adalah \"prima kanan\" sebab setelah menghilangkan angka 2 paling kiri, bilangan yang tersisa adalah 23 yang merupakan bilangan prima. Contoh lainnya 127. Dengan menghilangkan 2 angka paling kiri maka angka yang tersisa adalah 7 yang merupakan bilangan prima. Banyaknya bilangan prima antara 10 dan 200 yang merupakan \"prima kanan\" adalah....", options: ["A. 24", "B. 26", "C. 28", "D. 30"] },
  { no: 17, soal: "OSN Matematika 2024 Tingkat Kota\nBanyaknya faktor dari 2024 yang lebih besar dari $\\sqrt{2024}$ adalah ...", options: ["A. 4", "B. 8", "C. 12", "D. 16"] },
];

const OlimpiadeModuloPage = () => {
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
          OLIMPIADE - MODULO (SISA PEMBAGIAN)
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

export default OlimpiadeModuloPage;

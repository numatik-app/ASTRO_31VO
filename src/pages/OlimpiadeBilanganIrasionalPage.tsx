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
  title: "MATERI - BILANGAN IRASIONAL (BENTUK AKAR)",
  sections: [
    {
      heading: "A. Definisi Bentuk Akar",
      content: `Bentuk akar berhubungan dengan perpangkatan pecahan yang menggunakan semua sifat operasi perpangkatan. Bentuk akar menggunakan tanda $\\sqrt{}$

Jika $\\sqrt[n]{a}$ merupakan bilangan real, maka:

$\\sqrt[n]{a^m} = a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$

Dengan m dan n bilangan bulat serta n > 0.

$\\sqrt[n]{a} = a^{\\frac{1}{n}}$`
    },
    {
      heading: "B. Sifat-Sifat Bilangan Berpangkat (Eksponen)",
      content: `Untuk m dan n bilangan positif, berlaku:

1) $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$, dengan $a, b \\geq 0$

2) $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$, dengan $a \\geq 0$

3) $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$, dengan $a \\geq 0, b > 0$`
    },
    {
      heading: "C. Menyederhanakan Bentuk Akar",
      content: `Menyederhanakan bentuk akar kuadrat berarti kita menarik akar kuadrat. Untuk menarik akar kuadrat, bilangan di dalam tanda akar harus bilangan kuadrat.

Contoh 1:
$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$

Contoh 2:
$\\sqrt{784a^2b^4} = \\sqrt{4 \\cdot 4 \\cdot 7^2 \\cdot a^2 \\cdot 3 \\cdot 4 \\cdot b^2 \\cdot b^2}$
$= 2 \\cdot 4 \\cdot b \\cdot b \\cdot \\sqrt{a^2 \\cdot b}$
$= 4ab^2\\sqrt{a}$`
    },
    {
      heading: "D. Bentuk Akar di dalam Akar",
      content: `a. $\\sqrt[4]{\\sqrt[3]{x^5}} = \\sqrt[4 \\cdot 3]{x^5} = \\sqrt[12]{x^5}$

b. $\\sqrt[3]{\\sqrt{m^2}} = \\sqrt[3 \\cdot 2]{m^2} = \\sqrt[6]{m^2} = m^{\\frac{2}{6}} = m^{\\frac{1}{3}} = \\sqrt[3]{m}$`
    },
    {
      heading: "E. Merasionalkan Penyebut",
      content: `Suatu akar dapat disederhanakan dengan cara menghilangkan akar bilangan atau akar huruf Tunggal (nonmultional) dari penyebut. Proses ini disebut merasionalkan penyebut, karena kita mengalikan pembilangan dan penyebut dengan bentuk akar penyebut yang akan dihilangkan faktornya.

a. $\\frac{5}{\\sqrt{a}} = \\frac{5}{\\sqrt{a}} \\cdot \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{5\\sqrt{a}}{a}$

b. $\\frac{\\sqrt[3]{4a}}{\\sqrt[3]{5b^2}} = \\frac{\\sqrt[3]{4a}}{\\sqrt[3]{5b^2}} \\cdot \\frac{\\sqrt[3]{5^2b}}{\\sqrt[3]{5^2b}} = \\frac{\\sqrt[3]{4a \\cdot 25b}}{5b} = \\frac{\\sqrt[3]{100ab}}{5b}$`
    },
    {
      heading: "F. Mereduksi Induk Suatu Akar",
      content: `Mereduksi induk suatu akar berarti mengubah bentuk akar ke bentuk yang paling sederhana. Hal ini mengingatkan kita ke bentuk:

$\\sqrt[n]{a^m \\cdot b^p} = \\sqrt[n]{a^m} \\cdot \\sqrt[n]{b^p}$

Contoh:
a. $\\sqrt[6]{4x^2} = \\sqrt[6]{2^2 \\cdot x^2} = (2x)^{\\frac{2}{6}} = (2x)^{\\frac{1}{3}} = \\sqrt[3]{2x}$

b. $\\sqrt[6]{81y^4} = \\sqrt[6]{3^4 \\cdot y^4} = (3y)^{\\frac{4}{6}} = (3y)^{\\frac{2}{3}} = \\sqrt[3]{(3y)^2} = \\sqrt[3]{9y^2}$`
    },
    {
      heading: "G. Bentuk Akar Polinomial",
      content: `Bentuk akar polynomial dapat pula disederhanakan apabila polynomial itu dapat dituliskan dalam bentuk pemangkatan indeks atau kelipatannya.

a. $\\sqrt[8]{x^{4 \\cdot 2} + 3 \\cdot x^{2} + 1} = \\sqrt[8]{(x^{2})^{4} + 3 \\cdot (x^{2})^{2} + 1}$
$= \\sqrt[8]{(8+3) \\cdot 2+1} = \\sqrt[8]{23}$

b. $\\sqrt[70]{x^{7 \\cdot 5 \\cdot 2} + 4 \\cdot x^{5 \\cdot 2} + 1} = \\sqrt[70]{(x^{5})^{14} + 4 \\cdot (x^{5})^{2} + 1}$
$= \\sqrt[70]{(25+4) \\cdot 2+1} = \\sqrt[70]{59}$`
    },
    {
      heading: "H. Operasi Hitung Bentuk Akar",
      content: `1. Penjumlahan dan pengurangan bentuk akar
Menjumlahkan dan mengurangkan bentuk akar dapat dilakukan pada bentuk akar yang sejenis (bentuk akar yang mempunyai radikan yang sama).

1) $b\\sqrt[m]{a} + c\\sqrt[m]{a} = (b+c)\\sqrt[m]{a}$
2) $b\\sqrt[m]{a} - c\\sqrt[m]{a} = (b-c)\\sqrt[m]{a}$

Contoh:
a. $2\\sqrt{3} + 3\\sqrt{3} = (2+3)\\sqrt{3} = 5\\sqrt{3}$
b. $4\\sqrt{8} + 5\\sqrt{18} = 4\\sqrt{4 \\cdot 2} + 5\\sqrt{9 \\cdot 2} = 4 \\cdot 2\\sqrt{2} + 5 \\cdot 3\\sqrt{2} = 8\\sqrt{2} + 15\\sqrt{2} = 23\\sqrt{2}$
c. $2\\sqrt{12} - \\sqrt{27} = 2\\sqrt{4 \\cdot 3} - \\sqrt{9 \\cdot 3} = 2 \\cdot 2\\sqrt{3} - 3\\sqrt{3} = 4\\sqrt{3} - 3\\sqrt{3} = \\sqrt{3}$

2. Perkalian Bentuk Akar
$\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$

Contoh:
a. $\\sqrt[3]{6} \\cdot \\sqrt[3]{2} = \\sqrt[3]{6 \\cdot 2} = \\sqrt[3]{12}$
b. $\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{2 \\cdot 3} = \\sqrt{6}$
c. $\\sqrt{3} \\cdot \\sqrt{6} = \\sqrt{3 \\cdot 6} = \\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$

3. Pembagian Bentuk Akar
$\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}$, dengan $b \\neq 0$

Contoh:
a. $\\frac{\\sqrt{2}}{\\sqrt{2}} = \\sqrt{\\frac{2}{2}} = \\sqrt{1} = 1$
b. $\\frac{\\sqrt{12}}{\\sqrt{6}} = \\sqrt{\\frac{12}{6}} = \\sqrt{2}$
c. $\\sqrt[7]{\\frac{42}{6}} = \\sqrt[7]{7}$`
    },
    {
      heading: "I. Merasionalkan Penyebut Akar",
      content: `1. Merasionalkan Penyebut Akar Berbentuk Suku Satu

a. $\\frac{a}{\\sqrt{b}} = \\frac{a}{\\sqrt{b}} \\cdot \\frac{\\sqrt{b}}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$
b. $\\frac{a}{c\\sqrt{b}} = \\frac{a}{c\\sqrt{b}} \\cdot \\frac{\\sqrt{b}}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{cb}$

Contoh:
a. Rasionalkan bentuk $\\frac{2}{\\sqrt{5}}$
Jawab: $\\frac{2}{\\sqrt{5}} = \\frac{2}{\\sqrt{5}} \\cdot \\frac{\\sqrt{5}}{\\sqrt{5}} = \\frac{2\\sqrt{5}}{5}$

b. Rasionalkan bentuk $\\frac{2}{5\\sqrt{6}}$
Jawab: $\\frac{2}{5\\sqrt{6}} = \\frac{2}{5\\sqrt{6}} \\cdot \\frac{\\sqrt{6}}{\\sqrt{6}} = \\frac{2\\sqrt{6}}{5 \\cdot 6} = \\frac{2\\sqrt{6}}{30} = \\frac{\\sqrt{6}}{15}$

2. Merasionalkan Penyebut Akar Berbentuk Suku Dua

a. $\\frac{a}{\\sqrt{b}+c} = \\frac{a(\\sqrt{b}-c)}{(\\sqrt{b}+c)(\\sqrt{b}-c)} = \\frac{a(\\sqrt{b}-c)}{b-c^2}$
b. $\\frac{a}{\\sqrt{b}+\\sqrt{c}} = \\frac{a(\\sqrt{b}-\\sqrt{c})}{(\\sqrt{b}+\\sqrt{c})(\\sqrt{b}-\\sqrt{c})} = \\frac{a(\\sqrt{b}-\\sqrt{c})}{b-c}$
c. $\\frac{a}{\\sqrt{b}-\\sqrt{c}} = \\frac{a(\\sqrt{b}+\\sqrt{c})}{(\\sqrt{b}-\\sqrt{c})(\\sqrt{b}+\\sqrt{c})} = \\frac{a(\\sqrt{b}+\\sqrt{c})}{b-c}$

Contoh:
a. Rasionalkan bentuk $\\frac{5}{\\sqrt{5}+3}$
Jawab: $\\frac{5}{\\sqrt{5}+3} = \\frac{5}{\\sqrt{5}+3} \\cdot \\frac{\\sqrt{5}-3}{\\sqrt{5}-3} = \\frac{5(\\sqrt{5}-3)}{5-9} = \\frac{5\\sqrt{5}-15}{-4} = \\frac{-5\\sqrt{5}+15}{4}$

b. Rasionalkan bentuk $\\frac{\\sqrt{5}+\\sqrt{3}}{\\sqrt{5}-\\sqrt{3}}$
Jawab: $\\frac{\\sqrt{5}+\\sqrt{3}}{\\sqrt{5}-\\sqrt{3}} = \\frac{\\sqrt{5}+\\sqrt{3}}{\\sqrt{5}-\\sqrt{3}} \\cdot \\frac{\\sqrt{5}+\\sqrt{3}}{\\sqrt{5}+\\sqrt{3}} = \\frac{5+2\\sqrt{15}+3}{5-3} = \\frac{8+2\\sqrt{15}}{2} = 4+\\sqrt{15}$`
    },
    {
      heading: "J. Menyederhanakan Bentuk Akar dalam Akar",
      content: `$(\\sqrt{a}+\\sqrt{b})^2 = a + b + 2\\sqrt{ab}$

Kebalikannya adalah:
$\\sqrt{a + b + 2\\sqrt{ab}} = \\sqrt{a} + \\sqrt{b}$

Maka:
$\\sqrt{a + b + 2\\sqrt{ab}} = \\sqrt{a} + \\sqrt{b}$

Sehingga bentuk umumnya:
$\\sqrt{a + b + 2\\sqrt{ab}} = \\sqrt{a} + \\sqrt{b}$
$\\sqrt{a + b - 2\\sqrt{ab}} = \\sqrt{a} - \\sqrt{b}$

Contoh:
a. Sederhanakan bentuk $\\sqrt{7+2\\sqrt{10}}$
Jawab: $\\sqrt{7+2\\sqrt{10}} = \\sqrt{(5+2)+2\\sqrt{5 \\cdot 2}} = \\sqrt{5}+\\sqrt{2}$

b. Sederhanakan bentuk $\\sqrt{8-4\\sqrt{3}}$
Jawab: $\\sqrt{8-4\\sqrt{3}} = \\sqrt{8-2\\sqrt{4 \\cdot 3}} = \\sqrt{8-2\\sqrt{12}} = \\sqrt{(6+2)-2\\sqrt{6 \\cdot 2}} = \\sqrt{6}-\\sqrt{2}$`
    },
    {
      heading: "K. Akar Tak Hingga",
      content: `Akar tak hingga adalah bentuk akar yang berulang tanpa batas. Umumnya ditulis seperti:
$\\sqrt{a \\cdot \\sqrt{a \\cdot \\sqrt{a \\cdot \\sqrt{a...}}}}$

Atau
$\\sqrt{a + \\sqrt{a + \\sqrt{a + \\sqrt{a...}}}}$

Strategi Penyelesaian:
Misalkan $x = \\sqrt{a \\cdot \\sqrt{a \\cdot \\sqrt{a \\cdot \\sqrt{a...}}}}$

Karena bentuk setelah akar juga sama seperti x, maka dapat kita tulis:
$x = \\sqrt{a \\cdot x}$
$x^2 = ax$
$x^2 - ax = 0$
$x(x-a) = 0$
$x = 0$ atau $x = a$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Nilai dari $7^{\\frac{2}{3}}$ adalah ...", options: ["A. $\\sqrt[3]{7^2}$", "B. $\\sqrt[2]{7^3}$", "C. $\\sqrt[3]{7}^2$", "D. $\\sqrt[2]{7}^3$"] },
  { no: 2, soal: "Bentuk akar dari $6^{\\frac{1}{3}-2}$ adalah ...", options: ["A. $\\frac{\\sqrt[3]{6}}{6^6}$", "B. $\\frac{1}{6\\sqrt[3]{36}}$", "C. $\\frac{1}{36\\sqrt[3]{6}}$", "D. $\\sqrt[3]{6} \\cdot 36$"] },
  { no: 3, soal: "$\\sqrt{250} = ...$", options: ["A. $\\sqrt{10}$", "B. $3\\sqrt{10}$", "C. $5\\sqrt{10}$", "D. $10\\sqrt{10}$"] },
  { no: 4, soal: "Bentuk sederhana dari ekspresi $\\sqrt{150x^2y^5}$ adalah ...", options: ["A. $5xy^2\\sqrt{7y}$", "B. $5xy^2\\sqrt{6y}$", "C. $5x^2y\\sqrt{6y}$", "D. $5x^2y\\sqrt{7y}$"] },
  { no: 5, soal: "Bentuk sederhana dari $\\sqrt[2]{a} \\cdot \\sqrt[3]{a}$", options: ["A. $\\sqrt[6]{a^3}$", "B. $\\sqrt[6]{a^4}$", "C. $\\sqrt[6]{a^5}$", "D. $\\sqrt[6]{a^7}$"] },
  { no: 6, soal: "Nilai dari $\\sqrt[3]{x^2} \\cdot \\sqrt[6]{x^{12}}$ adalah ...", options: ["A. $\\sqrt{x}$", "B. $\\sqrt{x^7}$", "C. $\\sqrt{x^8}$", "D. $\\sqrt{x^{10}}$"] },
  { no: 7, soal: "$\\left(\\frac{x^{\\frac{1}{2}}y^{-\\frac{1}{3}}}{x^{-\\frac{2}{3}}y^{\\frac{1}{4}}}\\right)^{\\frac{1}{2}} \\cdot \\left(\\frac{y^{\\frac{1}{3}}}{x^{\\frac{1}{2}}}\\right)^{\\frac{1}{3}} = ...$", options: ["A. $x^{\\frac{1}{6}}y^{\\frac{7}{12}}$", "B. $x^{\\frac{17}{4}}y^{\\frac{1}{12}}$", "C. $x^{\\frac{1}{6}}y^{\\frac{1}{12}}$", "D. $xy$"] },
  { no: 8, soal: "$\\sqrt{12} - \\sqrt{27} + 4\\sqrt{3} = ...$", options: ["A. $10\\sqrt{3}$", "B. $5\\sqrt{3}$", "C. $\\sqrt{3}$", "D. $-5\\sqrt{3}$"] },
  { no: 9, soal: "$\\sqrt{8} - \\sqrt{50} + 3\\sqrt{2} + \\sqrt{32} = ...$", options: ["A. $6\\sqrt{2}$", "B. $4\\sqrt{2}$", "C. $2\\sqrt{2}$", "D. $\\sqrt{2}$"] },
  { no: 10, soal: "Nilai dari $2\\sqrt{8} \\times \\sqrt{9} - \\frac{1}{2}\\sqrt{50} + \\sqrt{216} : \\sqrt{3} = ...$", options: ["A. $14\\sqrt{2}$", "B. $14\\sqrt{3}$", "C. $15,5\\sqrt{2}$", "D. $13\\sqrt{3}$"] },
  { no: 11, soal: "Hasil dari $(\\sqrt{2}-3)^2$ adalah ...", options: ["A. $4-\\sqrt{3}$", "B. $7 - 4\\sqrt{3}$", "C. $1 - 2\\sqrt{3}$", "D. $-4\\sqrt{3}$"] },
  { no: 12, soal: "$(\\sqrt{3}-\\sqrt{7})^2 + (\\sqrt{3}+\\sqrt{2})(\\sqrt{7}-\\sqrt{3}) = ...$", options: ["A. $\\sqrt{3}+\\sqrt{7}$", "B. $-\\sqrt{3}-\\sqrt{7}$", "C. $\\sqrt{7}-\\sqrt{3}$", "D. $\\sqrt{3}-\\sqrt{7}$"] },
  { no: 13, soal: "$\\frac{\\sqrt{10}}{\\sqrt{5}} = ...$", options: ["A. $\\sqrt{10} \\cdot \\sqrt{5}$", "B. $5\\sqrt{5}$", "C. $3\\sqrt{5}$", "D. $\\sqrt{2}$"] },
  { no: 14, soal: "Bentuk sederhana dari $\\frac{9}{2\\sqrt{2}}$ adalah...", options: ["A. $\\frac{9\\sqrt{2}}{2}$", "B. $\\frac{9\\sqrt{2}}{4}$", "C. $\\frac{9\\sqrt{2}}{8}$", "D. $9\\sqrt{2}$"] },
  { no: 15, soal: "$\\frac{\\sqrt{3}}{\\sqrt{2}} = ...$", options: ["A. $\\frac{\\sqrt{3}}{2}$", "B. $\\frac{3}{\\sqrt{2}}$", "C. $\\frac{1}{2}\\sqrt{6}$", "D. $\\frac{1}{3}\\sqrt{6}$"] },
  { no: 16, soal: "Hasil dari $4\\sqrt{18} : 3\\sqrt{12}$ adalah ...", options: ["A. $3\\sqrt{6}$", "B. $2\\sqrt{6}$", "C. $\\frac{3}{2}\\sqrt{6}$", "D. $\\frac{2}{3}\\sqrt{6}$"] },
  { no: 17, soal: "Bentuk Sederhana dari $\\frac{8}{2\\sqrt{3}-4}$ = ......", options: ["A. $4\\sqrt{3}+8$", "B. $4\\sqrt{3}-8$", "C. $-4\\sqrt{3}+8$", "D. $-4\\sqrt{3}-8$"] },
  { no: 18, soal: "Bentuk sederhana dari $\\frac{10}{2\\sqrt{3}+\\sqrt{7}}$ adalah ...", options: ["A. $4\\sqrt{3} + 2\\sqrt{7}$", "B. $4\\sqrt{3} + \\sqrt{7}$", "C. $4\\sqrt{3} - \\sqrt{7}$", "D. $4\\sqrt{3} - 2\\sqrt{7}$"] },
  { no: 19, soal: "Urutan bilangan terkecil ke terbesar dari $\\sqrt[3]{4}$, $\\sqrt[4]{5}$, $\\sqrt[6]{8}$ adalah ...", options: ["A. $\\sqrt[3]{4}$, $\\sqrt[4]{5}$, $\\sqrt[6]{8}$", "B. $\\sqrt[4]{5}$, $\\sqrt[6]{8}$, $\\sqrt[3]{4}$", "C. $\\sqrt[6]{8}$, $\\sqrt[3]{4}$, $\\sqrt[4]{5}$", "D. $\\sqrt[6]{8}$, $\\sqrt[4]{5}$, $\\sqrt[3]{4}$"] },
  { no: 20, soal: "Hasil dari $\\frac{\\sqrt{7}+\\sqrt{5}}{\\sqrt{7}-\\sqrt{5}} + \\frac{\\sqrt{7}-\\sqrt{5}}{\\sqrt{7}+\\sqrt{5}}$ adalah ...", options: ["A. 12", "B. $2\\sqrt{7} + 3\\sqrt{5}$", "C. 2", "D. $2\\sqrt{7} - 3\\sqrt{5}$"] },
  { no: 21, soal: "$\\sqrt{6 \\cdot \\sqrt{6 \\cdot \\sqrt{6...}}} = ...$", options: [] },
  { no: 22, soal: "$\\sqrt{72 + \\sqrt{72 + \\sqrt{72 + ...}}} = ...$", options: [] },
  { no: 23, soal: "$\\sqrt{12 - \\sqrt{12 - \\sqrt{12 - ...}}} = ...$", options: [] },
  { no: 24, soal: "$\\sqrt{8-\\frac{1}{2}\\sqrt{15}} = ...$", options: ["A. $\\sqrt{\\frac{1}{3}}+\\sqrt{5}$", "B. $\\sqrt{\\frac{1}{3}}-\\sqrt{5}$", "C. $\\sqrt{5}-\\sqrt{3}$", "D. $\\sqrt{3}+\\sqrt{5}$"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2004 Tingkat Kota\n$\\sqrt{50^2-50} - \\sqrt{49^2-50} = ...$", options: ["A. 10", "B. 100", "C. 1000", "D. 10000"] },
  { no: 2, soal: "OSN Matematika 2004 Tingkat Kota\n$\\frac{\\sqrt{0,036}}{\\sqrt{0,9}} = ...$", options: ["A. 0,002", "B. 0,02", "C. 0,2", "D. 2"] },
  { no: 3, soal: "OSN Matematika 2004 Tingkat Kota\nJika $\\frac{1}{b} = a - \\sqrt{b}$, maka b dinyatakan dalam a adalah ...", options: ["A. $b = \\frac{a^2+1}{2}$", "B. $b = \\frac{a^2}{a^2+1}$", "C. $b = \\frac{a^2-1}{2}$", "D. $b = \\frac{a^2}{a^2-1}$"] },
  { no: 4, soal: "OSN Matematika 2005 Tingkat Kota\nBilangan yang ditunjukkan oleh $(\\sqrt{2}+1)(\\sqrt{3}+\\sqrt{2})(\\sqrt{2}-1)(\\sqrt{3}-\\sqrt{2})$ adalah ...", options: ["A. Bilangan irasional positif", "B. Bilangan bulat negatif", "C. Bilangan rasional tidak bulat", "D. Bilangan irasional negatif"] },
  { no: 5, soal: "OSN Matematika 2006 Tingkat Kota\nSemua bilangan bulat x sehingga $\\sqrt{x+1} + \\sqrt{2-x}$ merupakan bilangan bulat adalah ...", options: [] },
  { no: 6, soal: "OSN Matematika 2008 Tingkat Kota\nDiketahui:\n$A = \\frac{1}{\\sqrt{1}+\\sqrt{2}} + \\frac{1}{\\sqrt{2}+\\sqrt{3}} + \\frac{1}{\\sqrt{3}+\\sqrt{2}} + ... + \\frac{1}{\\sqrt{99}+\\sqrt{100}}$\nBilangan kuadrat terdekat dengan A adalah ...", options: [] },
  { no: 7, soal: "OSN Matematika 2008 Tingkat Kota\n$(\\sqrt{3})^{-3} + (\\sqrt{3})^{-2} + (\\sqrt{3})^{-1} + (\\sqrt{3})^0 + (\\sqrt{3})^1 + (\\sqrt{3})^2 + (\\sqrt{3})^3 = ...$", options: ["A. 1", "B. $\\frac{5}{14\\sqrt{3}+9}$", "C. $\\frac{14}{10\\sqrt{3}} + 4\\sqrt{3} + \\frac{99}{99}$", "D. $4 + \\frac{14\\sqrt{3}}{9} + \\frac{4}{9}$", "E. $8\\sqrt{3}$"] },
  { no: 8, soal: "OSN Matematika 2009 Tingkat Kota\nJika $\\frac{\\sqrt{p}-\\sqrt{q}}{\\sqrt{p}+\\sqrt{q}} = \\frac{p-q}{q} \\cdot \\frac{\\sqrt{p}+\\sqrt{q}}{\\sqrt{p}}$, maka nilai x sama dengan ...", options: ["A. $\\frac{31}{32}$", "B. $\\frac{3}{2}$", "C. $\\frac{1}{3}$", "D. $\\frac{5}{16}$"] },
  { no: 9, soal: "OSN Matematika 2009 Tingkat Provinsi\nSemua bilangan real x yang memenuhi persamaan $\\sqrt[3]{x+4} - \\sqrt[3]{x-1} = 1$ adalah ...", options: [] },
  { no: 10, soal: "OSN Matematika 2010 Tingkat Provinsi\nJika $p = \\frac{1}{\\sqrt{14}-\\sqrt{13}}$, dan $q = \\frac{1}{\\sqrt{14}+\\sqrt{13}}$, maka nilai dari $p^2 + pq + q^2$ adalah ...", options: [] },
  { no: 11, soal: "OSN Matematika 2011 Tingkat Kota\n$\\sqrt{54+14\\sqrt{5}} + \\sqrt{12+2\\sqrt{35}} + \\sqrt{32-10\\sqrt{7}} = ...$", options: ["A. 10", "B. 11", "C. 12", "D. $5\\sqrt{6}$", "E. $6\\sqrt{6}$"] },
  { no: 12, soal: "OSN Matematika 2011 Tingkat Kota\nBanyaknya bilangan bulat x sehingga $\\sqrt{x+1} + \\sqrt{2-x}$ merupakan bilangan bulat adalah", options: ["A. 2", "B. 3", "C. 5", "D. 6", "E. 7"] },
  { no: 13, soal: "OSN Matematika 2012 Tingkat Kota\nSemua nilai x yang memenuhi persamaan $\\sqrt{(6-2x)} \\cdot \\sqrt{(4-3x)} = 1$ adalah ...", options: [] },
  { no: 14, soal: "OSN Matematika 2015 Tingkat Kota\nNilai dari $\\frac{3^{2015} - 3^{2013}}{3^{2015} + 3}$ adalah ...", options: ["A. $\\frac{\\sqrt{3}}{2}$", "B. $\\frac{\\sqrt{3}}{4}$", "C. $\\frac{3}{2}$", "D. $\\frac{3}{4}$"] },
  { no: 15, soal: "OSN Matematika 2016 Tingkat Kota\nNilai dari $\\frac{1 \\cdot 2 \\cdot 4 + 2 \\cdot 4 \\cdot 8 + ... + n \\cdot 2n \\cdot 4n}{1 \\cdot 3 \\cdot 9 + 2 \\cdot 6 \\cdot 18 + ... + n \\cdot 3n \\cdot 9n}$ adalah ...", options: [] },
  { no: 16, soal: "OSN Matematika 2022 Tingkat Kota\nPerhatikan persamaan berikut\n$\\sqrt{x+2} + \\sqrt{4-x} - \\sqrt{7-x+6} - \\sqrt{2+x-1-x} = 2$\nBanyak bilangan bulat x yang memenuhi persamaan tersebut adalah ...", options: ["A. 1", "B. 2", "C. 4", "D. 6"] },
  { no: 17, soal: "OSN Matematika 2022 Tingkat Kota\nBanyaknya kemungkinan bilangan positif n yang kurang dari 95 dan mengakibatkan $\\left(\\frac{200}{3^n}\\right)^{\\frac{1}{6-n}}$ bilangan bulat adalah ...", options: ["A. 14", "B. 15", "C. 16", "D. 17"] },
  { no: 18, soal: "OSN Matematika 2025 Tingkat Kota\nJika\n$a = \\sqrt[3]{(-1)^4+(-1)^3+(-1)^2+(-1)+1} + \\frac{3}{2}$\nMaka nilai dari $\\frac{a+2}{a-2} = ...$", options: ["A. -3", "B. $-\\frac{1}{3}$", "C. $\\frac{1}{3}$", "D. 3"] },
];

const kunciJawaban = {
  dasar: ["B", "B", "C", "B", "C", "B", "A", "C", "B", "C", "B", "B", "D", "B", "C", "D", "D", "D", "A", "A", "0 atau 6", "9", "3", "B"],
  olimpiade: ["B", "C", "B", "B", "{-3, 3}", "81", "D", "C", "-2 + √5 atau -2 - √5", "55", "C", "{-3, 3}", "1 atau 3", "C", "-", "6", "-", "25"]
};

const OlimpiadeBilanganIrasionalPage = () => {
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
          OLIMPIADE - BILANGAN IRASIONAL
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

export default OlimpiadeBilanganIrasionalPage;

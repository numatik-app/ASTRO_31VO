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
  title: "MATERI - ALJABAR",
  sections: [
    {
      heading: "A. Bentuk Umum",
      content: `$ax^n + b$

$x$ disebut variabel, biasanya berupa huruf alfabet
$a$ disebut koefisien (bilangan pengali variabel)
$b$ disebut konstanta, bilangan tunggal (tanpa variabel)
$n$ disebut pangkat/derajat`
    },
    {
      heading: "B. Operasi",
      content: `1. Macam-macam suku
   - Monomial (satu suku)
   - Binomial (dua suku)
   - Polinomial (banyak suku)

2. Jumlah atau kurang
   Menjumlahkan dan mengurangkan suatu bentuk aljabar yaitu dengan menjumlahkan atau mengurangkan suku-suku sejenis.

3. Perkalian
   $a(b+c) = ab + ac$
   $(a+b)(c+d) = ac + ad + bc + bd$
   $(a+b)(a+b) = a^2 + 2ab + b^2$

4. Pembagian
   $\\frac{a^m}{a^n} = a^{m-n}$, dengan $a^n \\neq 0$`
    },
    {
      heading: "C. KPK dan FPB Bentuk Aljabar",
      content: `Untuk mencari KPK dari bentuk aljabar:
- Cari KPK koefisiennya
- Tulis semua variabel yang ada dan pilih pangkat terbesar
- KPK bentuk aljabar digunakan untuk menghitung Pecahan Aljabar.

Untuk mencari FPB dari bentuk aljabar:
- Cari FPB koefisiennya
- Tulis variabel yang sama dan pilih pangkat terkecil
- FPB bentuk aljabar digunakan untuk Faktorisasi Aljabar.`
    },
    {
      heading: "D. Faktorisasi",
      content: `1. $ab + ac = a(b+c)$

2. Selisih dua kuadrat
   $a^2 - b^2 = (a+b)(a-b)$

3. Bentuk $ax^2 + bx + c$
   - Jika $a = 1$: $x^2 + bx + c = (x + p)(x + q)$ dengan $p + q = b$ dan $p \\times q = c$
   - Jika $a \\neq 1$: $ax^2 + bx + c = (ax + p)(ax + q) / a$ dengan $p + q = b$ dan $p \\times q = a \\times c$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Koefisien variabel $x$ dari bentuk aljabar $-x^2 - (m + 1)x + 3m$ adalah ...", options: ["A. $-1$", "B. $1$", "C. $m + 1$", "D. $-m - 1$"] },
  { no: 2, soal: "Pada kelompok suku $7x^2 - 5xy - 9y^2 + 8$ nilai koefisien dari variabel $y^2$ dijumlahkan dengan konstantanya adalah ...", options: ["A. $17$", "B. $16$", "C. $15$", "D. $-1$"] },
  { no: 3, soal: "Bentuk sederhana dari $4x + 12y - 10z - 8x + 5y - 7z$ adalah ...", options: ["A. $12x + 12y - 3z$", "B. $-4x + 17y - 17z$", "C. $4x + 7y - 17z$", "D. $12x + 12y + 17z$"] },
  { no: 4, soal: "Bentuk sederhana dari $5ab + 4bc - 3ac - 2ac - 8bc - ab$ adalah ...", options: ["A. $4ab - 4bc - 5ac$", "B. $4ab + 2bc - 11ac$", "C. $6ab - 2bc + 5ac$", "D. $6ab + 4bc + 5ac$"] },
  { no: 5, soal: "Bentuk sederhana dari $-3p(p^3 - 2p^2) + 2(p^2 - 3p + 6)$ adalah ...", options: ["A. $3p^2 + 6p^3 + 2p^2 - 6p + 12$", "B. $3p^2 + 2p^3 + 2p^2 - 3p + 12$", "C. $-3p^4 + 6p^3 + 2p^2 + 6p + 12$", "D. $-3p^4 + 6p^3 + 2p^2 - 6p + 12$"] },
  { no: 6, soal: "Hasil pengurangan $3x - 4$ dari $2x + 5$ adalah ...", options: ["A. $5x + 9$", "B. $-5x + 1$", "C. $x + 1$", "D. $-x + 9$"] },
  { no: 7, soal: "Hasil dari $(-8m^2n^3) \\cdot (2k^3n^2)$ adalah ...", options: ["A. $-16k^3m^2n^{12}$", "B. $-16k^3m^3n^2$", "C. $16k^3m^2n^{12}$", "D. $-16k^3m^2n^5$"] },
  { no: 8, soal: "Hasil dari $(2x - 2)(x + 5)$ adalah ...", options: ["A. $2x^2 - 12x - 10$", "B. $2x^2 + 12x - 10$", "C. $2x^2 + 8x - 10$", "D. $2x^2 - 8x - 10$"] },
  { no: 9, soal: "Hasil dari $\\left(2a - \\frac{1}{a}\\right)^2$ adalah ...", options: ["A. $4a^2 - 4 + \\frac{1}{a^2}$", "B. $4a^2 + 4 + \\frac{1}{a^2}$", "C. $4a^2 - 4a + \\frac{1}{a^2}$", "D. $4a^2 + 4a + \\frac{1}{a^2}$"] },
  { no: 10, soal: "Hasil dari $(-3x - 4y)^2$ adalah ...", options: ["A. $-9x^2 - 24xy - 16y^2$", "B. $9x^2 - 24xy - 16y^2$", "C. $-9x^2 + 24xy - 16y^2$", "D. $9x^2 + 24xy + 16y^2$"] },
  { no: 11, soal: "Penyederhanaan bentuk $(2x + 3)^2 - (x - 2)^2$ adalah ...", options: ["A. $3x^2 + 8x + 13$", "B. $3x^2 + 16x + 5$", "C. $3x^2 + 4x + 13$", "D. $3x^2 + 8x + 5$"] },
  { no: 12, soal: "Faktor persekutuan dari $6x^2 + 3x - 18$ dan $4x^2 - 9$ adalah ...", options: ["A. $2x + 3$", "B. $3x - 6$", "C. $3x + 6$", "D. $2x - 3$"] },
  { no: 13, soal: "Perhatikan faktor bentuk aljabar di bawah ini\nI. $x^2 - 2x = x(x + 2)$\nII. $x^2 - 9 = (x + 3)(x - 3)$\nIII. $x^2 + 3x - 10 = (x + 5)(x - 2)$\nIV. $6x^2 + 5x - 6 = (2x - 3)(3x - 2)$\nPemfaktoran yang benar adalah ...", options: ["A. I dan III", "B. I dan IV", "C. II dan III", "D. II dan IV"] },
  { no: 14, soal: "Perhatikan pernyataan berikut\nI. $4x^2 - 9 = (2x - 3)(2x + 3)$\nII. $2x^2 + x - 3 = (2x - 3)(x + 1)$\nIII. $x^2 + x - 6 = (x + 3)(x - 2)$\nIV. $x^2 + 4x - 5 = (x - 5)(x + 1)$\nPernyataan yang benar adalah ...", options: ["A. I dan II", "B. II dan III", "C. I dan III", "D. II dan IV"] },
  { no: 15, soal: "Pemfaktoran bentuk kuadrat $x^2 - 3ax + 2a^2$ adalah ...", options: ["A. $(x - 2a)(x + a)$", "B. $(x + 2a)(x + a)$", "C. $(x - 2a)(x - a)$", "D. $(x + 2a)(x - a)$"] },
  { no: 16, soal: "Bentuk paling sederhana dari $\\frac{2x^2 + 5x - 12}{4x^2 - 9}$ adalah ...", options: ["A. $\\frac{x + 4}{2x - 3}$", "B. $\\frac{x + 4}{2x + 3}$", "C. $\\frac{x - 4}{2x - 3}$", "D. $\\frac{x + 4}{2x + 3}$"] },
  { no: 17, soal: "Hasil dari $\\frac{3}{2x} + \\frac{4}{x + 2}$ adalah ...", options: ["A. $\\frac{8x + 2}{2x(x + 2)}$", "B. $\\frac{9x + 2}{2x(x + 2)}$", "C. $\\frac{11x + 6}{2x(x + 2)}$", "D. $\\frac{11x + 7}{2x(x + 2)}$"] },
  { no: 18, soal: "Hasil pengurangan $\\frac{3}{a - b} - \\frac{2}{a + b}$ adalah ...", options: ["A. $\\frac{a - 5b}{a^2 - b^2}$", "B. $\\frac{a - 5b}{(a - b)^2}$", "C. $\\frac{a + 5b}{a^2 + b^2}$", "D. $\\frac{a - 5b}{(a + b)^2}$"] },
  { no: 19, soal: "Diketahui keliling sebuah persegi panjang adalah 48 cm. Jika lebarnya 6 cm kurang dari panjangnya, maka luas persegi panjang tersebut adalah ...", options: ["A. $128$ cm$^2$", "B. $225$ cm$^2$", "C. $567$ cm$^2$", "D. $616$ cm$^2$"] },
  { no: 20, soal: "Kebun Pak Ogah berbentuk persegi panjang dengan ukuran panjang diagonal berturut-turut $(5x - 15)$ meter dan $(3x + 5)$ meter. Panjang diagonal kebun Pak Ogah adalah ...", options: ["A. $10$ meter", "B. $25$ meter", "C. $35$ meter", "D. $50$ meter"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2006 Tingkat Kota\nBentuk sederhana dari $(y + x)\\{(x - y)[x(x - y) + y(y + x)]\\}$ adalah ...", options: ["A. $x^4 + y^4$", "B. $x^4 - y^4$", "C. $y^4 - x^4$", "D. $y^4 + x^4$", "E. Jawaban A, B, C dan D tidak ada yang benar"] },
  { no: 2, soal: "OSN Matematika 2006 Tingkat Kota\nJika jumlah dua bilangan adalah 3 dan selisih kuadrat bilangan itu adalah 6, maka hasil kali kedua bilangan itu adalah ...", options: [] },
  { no: 3, soal: "OSN Matematika 2006 Tingkat Kota\nSemua pasangan bilangan real $(x, y)$ yang memenuhi $x^2 + y^2 = 2x - 4y - 5$ adalah ...", options: [] },
  { no: 4, soal: "OSN Matematika 2007 Tingkat Kota\nKonstanta dari $\\left(3x^3 - \\frac{2}{x}\\right)^8$ adalah ...", options: ["A. $14.328$", "B. $15.552$", "C. $16.112$", "D. $16.128$", "E. $17.128$"] },
  { no: 5, soal: "OSN Matematika 2007 Tingkat Kota\nPerhatikan gambar berikut. Jika bilangan pada daerah persegi tidak diarsir diperoleh dengan menjumlahkan dua bilangan pada persegi tidak diarsir di bawah dan terhubung dengannya maka nilai $x$ adalah ...\n[Tabel: Baris atas: kosong, 6x, kosong | Baris bawah: 1, x, 6, 8]", options: ["A. $1$", "B. $6$", "C. $9$", "D. $27$", "E. $54$"] },
  { no: 6, soal: "OSN Matematika 2012 Tingkat Kota\nJika $a = b + 2$, $a^2 = b^2 + 6$ dan $3(a + b)^2c + 3(a + b)c^2 + c^3 = 10 + (a + b)^3$, maka nilai $c$ adalah ...", options: [] },
  { no: 7, soal: "OSN Matematika 2013 Tingkat Kota\nSemua bilangan asli $n$ yang memenuhi sifat bahwa $6n^2 + 5n - 4$ adalah bilangan prima adalah ...", options: [] },
  { no: 8, soal: "OSN Matematika 2013 Tingkat Kota\nBentuk $x^4 - 1$ mempunyai faktor sebanyak ...", options: ["A. $3$", "B. $4$", "C. $5$", "D. $6$", "E. $7$"] },
  { no: 9, soal: "OSN Matematika 2017 Tingkat Kota\nDiketahui $a$ dan $b$ adalah dua bilangan bulat positif, serta $b$ merupakan bilangan ganjil yang lebih kecil dari 2017. Jika $\\frac{1}{a} + \\frac{4}{b} = \\frac{1}{12}$, maka pasangan bilangan $(a, b)$ yang mungkin ada sebanyak ...", options: ["A. $2$", "B. $3$", "C. $5$", "D. $8$"] },
  { no: 10, soal: "OSN Matematika 2019 Tingkat Kota\nJika $x = 2p - 4q$ dan $y = -p + 2q$, maka nilai $\\frac{2x^2 - 3xy + y^2}{x^2 - y^2}$ adalah ...", options: ["A. $\\frac{1}{5}$", "B. $\\frac{1}{3}$", "C. $3$", "D. $5$"] },
  { no: 11, soal: "OSN Matematika 2019 Tingkat Kota\nDiketahui $xy + 2x + y = 10$ dengan $x$, $y$ bilangan bulat positif. Nilai dari $x + y$ adalah ...", options: ["A. $4$", "B. $5$", "C. $8$", "D. $10$"] },
  { no: 12, soal: "OSN Matematika 2022 Tingkat Kota\nBerikut ini adalah sel $3 \\times 3$ yang akan diisi dengan bilangan bulat positif sedemikian sehingga jumlah 3 bilangan dalam setiap baris, kolom maupun diagonal sama. Jika $n$ adalah nilai terkecil yang mungkin untuk mengisi sel pojok kiri atas, maka jumlah semua bilangan yang berada di keempat sel pojok adalah ...\n[Grid: $n$ | 5 | 41 dan 17 | ... | ...]", options: ["A. $104$", "B. $105$", "C. $107$", "D. $110$"] },
  { no: 13, soal: "OSN Matematika 2022 Tingkat Kota\nJika $a$, $b$, $c$, $d$ bilangan-bilangan asli sehingga $a^5 = b^2$, $c^3 = d^2$, dan $c - a = 19$, maka nilai dari $d - b$ adalah ...", options: ["A. $757$", "B. $243$", "C. $1000$", "D. $81$"] },
  { no: 14, soal: "OSN Matematika 2023 Tingkat Kota\nPerhatikan kedua persamaan berikut.\n$A = \\frac{(p^2 + q^2 + r^2)^2}{p^2q^2 + q^2r^2 + r^2p^2}$\n$B = \\frac{q^2 - pr}{p^2 + q^2 + r^2}$\nJika $p + q + r = 0$, maka $A^2 - 4B$ adalah ...", options: ["A. $6$", "B. $8$", "C. $12$", "D. $14$"] },
  { no: 15, soal: "OSN Matematika 2024 Tingkat Kota\nDiketahui sistem persamaan dengan $a$, $b$ dan $c$ adalah bilangan real positif.\n$a = bc$\n$b = c(a + 2)$\n$c = b(a - 2)$\nNilai dari $a^2 + b^2 + c^2$ adalah ...", options: ["A. $15$", "B. $15 - 4\\sqrt{5}$", "C. $225$", "D. $15 + 4\\sqrt{5}$"] },
  { no: 16, soal: "OSN Matematika 2024 Tingkat Kota\nJika bilangan real positif $p$, $q$, $r$, $s$ memenuhi sistem persamaan\n$p^2 + q^2 = r^2 + s^2$\n$p^2 + s^2 - ps = q^2 + r^2 + qr$\nNilai dari $\\frac{pq + rs}{ps + qr}$ adalah ...", options: ["A. $\\frac{\\sqrt{2}}{3}$", "B. $\\frac{\\sqrt{2}}{2}$", "C. $\\frac{\\sqrt{3}}{3}$", "D. $\\frac{\\sqrt{3}}{2}$"] },
  { no: 17, soal: "OSN Matematika 2024 Tingkat Kota\nDiketahui bilangan bulat $x_1, x_2, ..., x_{2023}$ yang memenuhi tiga syarat berikut:\n$x_1 + x_2 + ... + x_{2023} = 25(x_2 + x_4 + ... + x_{2022})$\n$x_1^2 + x_2^2 + ... + x_{2023}^2 = 125(x_2^2 + x_4^2 + ... + x_{2022}^2)$\n$-2 \\leq x_i \\leq 1$, untuk $i = 1, 2, 3, ..., 2023$\nNilai terkecil yang mungkin untuk $x_1^3 + x_2^3 + ... + x_{2023}^3$ adalah ...", options: ["A. $-100$", "B. $-71$", "C. $-51$", "D. $-16$"] },
];

const OlimpiadeAljabarPage = () => {
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
          OLIMPIADE - ALJABAR
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

export default OlimpiadeAljabarPage;

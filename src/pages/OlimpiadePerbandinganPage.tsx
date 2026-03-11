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
  title: "MATERI - PERBANDINGAN",
  sections: [
    {
      heading: "A. Pengertian Perbandingan",
      content: `Perbandingan adalah suatu cara untuk membandingkan dua besaran yang sejenis, baik secara nilai maupun jumlah.

Contoh:
Jika tinggi Ani adalah 150 cm dan tinggi Budi 165 cm, maka perbandingan tinggi Ani dan Budi adalah:
$150 : 165 = 10 : 11$ (dibagi 15)`
    },
    {
      heading: "B. Jenis-Jenis Perbandingan",
      content: `1. Perbandingan Senilai (Seharga / Sebanding)
Perbandingan senilai adalah perbandingan dua besaran yang jika salah satunya bertambah, maka yang lain juga bertambah secara tetap.

Contoh:
- Jumlah barang bertambah → harga total bertambah
- Waktu kerja bertambah → hasil kerja bertambah

Rumus:
$\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$

2. Perbandingan Berbalik Nilai
Perbandingan berbalik nilai adalah perbandingan dua besaran di mana jika satu bertambah, yang lain justru berkurang.

Contoh:
- Banyak pekerja bertambah → waktu kerja berkurang
- Kecepatan bertambah → waktu tempuh berkurang

Rumus:
$\\frac{a_1}{a_2} = \\frac{b_2}{b_1}$

3. Perbandingan Campuran
Perbandingan campuran adalah metode matematika yang digunakan untuk menyelesaikan masalah yang melibatkan penggabungan dua atau lebih komponen dengan sifat (seperti harga, konsentrasi, atau kadar) yang berbeda untuk menciptakan campuran baru dengan sifat yang diinginkan.

Prinsip utamanya adalah rata-rata tertimbang (weighted average). Artinya, nilai akhir dari campuran bergantung pada proporsi dari setiap komponen yang dicampurkan.

Rumus dasar yang sering digunakan adalah:
$(\\text{Kuantitas}_1 \\times \\text{Nilai}_1) + (\\text{Kuantitas}_2 \\times \\text{Nilai}_2) = (\\text{Kuantitas Total} \\times \\text{Nilai Campuran})$`
    },
    {
      heading: "C. Skala",
      content: `Skala (S) merupakan perbandingan antara jarak/ukuran pada peta atau denah (Jp) dengan jarak/ukuran sebenarnya (Js).

$S = \\frac{J_p}{J_s}$`
    },
    {
      heading: "D. Menentukan Luas sebenarnya dan Luas pada peta",
      content: `Jika skala pada peta adalah $\\frac{1}{k}$ maka:

- Mencari luas sebenarnya (Ls)
$L_s = \\text{Luas Peta} \\times k^2$

- Mencari Luas Peta (Lp)
$L_p = \\frac{\\text{Luas Sebenarnya}}{k^2}$`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Sebuah toko menjual beberapa jenis kue. Untuk membuat 12 loyang kue bolu diperlukan 3 kg mentega. Mentega yang diperlukan untuk membuat 20 loyang kue bolu adalah ...", options: ["A. 4 kg", "B. 5 kg", "C. 6 kg", "D. 8 kg"] },
  { no: 2, soal: "Sebuah pekerjaan dapat diselesaikan oleh 50 orang dalam waktu 8 bulan. Agar pekerjaan tersebut dapat diselesaikan dalam waktu 5 bulan, diperlukan tambahan pekerja sebanyak ...", options: ["A. 20 orang", "B. 42 orang", "C. 45 orang", "D. 80 orang"] },
  { no: 3, soal: "Jarak kota A ke kota B ditempuh oleh mobil dengan kecepatan rata-rata 60 km/jam dalam waktu 3 jam 30 menit. Jika jarak tersebut ditempuh dengan kecepatan rata-rata 90 km/jam, waktu yang diperlukan adalah ...", options: ["A. 2 jam 20 menit", "B. 2 jam 30 menit", "C. 2 jam 33 menit", "D. 2 jam 50 menit"] },
  { no: 4, soal: "Pembangunan sebuah jembatan direncanakan selesai dalam waktu 132 hari oleh 24 pekerja. Sebelum pekerjaan dimulai ditambah 8 orang pekerja. Waktu untuk menyelesaikan pembangunan jembatan tersebut adalah ...", options: ["A. 99 hari", "B. 108 hari", "C. 126 hari", "D. 129 hari"] },
  { no: 5, soal: "Sebuah rumah direncanakan dibangun selama 40 hari oleh 12 pekerja. Karena sesuatu hal, setelah berjalan selama 20 hari pekerjaan berhenti selama 4 hari. Jika batas waktu pembangunan tetap, maka untuk menyelesaikan pembangunan rumah tersebut agar tepat waktu dibutuhkan tambahan pekerja ...", options: ["A. 3 orang", "B. 6 orang", "C. 12 orang", "D. 15 orang"] },
  { no: 6, soal: "Perbandingan berat badan A : B : C adalah 2 : 3 : 5. Jika selisih berat badan A dan C adalah 24 kg, maka jumlah berat badan ketiganya adalah ...", options: ["A. 90 kg", "B. 85 kg", "C. 80 kg", "D. 75 kg"] },
  { no: 7, soal: "Perbandingan nilai A dan B adalah 2 : 3, sedangkan perbandingan nilai B dan C adalah 1 : 2. Jumlah nilai mereka bertiga adalah 176, maka selisih nilai A dan C adalah ...", options: ["A. 48", "B. 64", "C. 68", "D. 72"] },
  { no: 8, soal: "Perbandingan uang Ali dan Budi adalah 2 : 3, sedangkan perbandingan uang Budi dan Citra adalah 4 : 5. Jika uang Ali Rp. 30.000,00, maka uang Citra adalah ...", options: ["A. 45.000,00", "B. 54.000,00", "C. 56.250,00", "D. 75.500,00"] },
  { no: 9, soal: "Perbandingan jumlah tabungan Narda dan Rizki adalah 3 : 4, sedangkan perbandingan tabungan Narda dan Lutfi adalah 5 : 2. Jika jumlah tabungan mereka bertiga Rp 8.200.000,00, maka selisih tabungan Rizki dan Lutfi adalah ....", options: ["A. Rp 350.000,00", "B. Rp 1.000.000,00", "C. Rp 1.400.000,00", "D. Rp 2.800.000,00"] },
  { no: 10, soal: "Jarak dua kota pada peta adalah 20 cm. Jika skala peta 1 : 600.000, jarak dua kota sebenarnya adalah...", options: ["A. 1.200 km", "B. 120 km", "C. 30 km", "D. 12 km"] },
  { no: 11, soal: "Sebuah kebun pada denah berukuran 12 cm x 15 cm. Jika ukuran kebun yang sebenarnya 50 m x 40 m, maka skala yang digunakan adalah....", options: ["A. 3 : 100", "B. 3 : 800", "C. 3 : 1.250", "D. 3 : 1.000"] },
  { no: 12, soal: "Pada denah skala 1 : 200 terdapat gambar kebun yang berbentuk persegi panjang dengan ukuran 7 cm x 4,5 cm. Luas kebun sebenarnya adalah...", options: ["A. 58 $m^2$", "B. 63 $m^2$", "C. 126 $m^2$", "D. 140 $m^2$"] },
  { no: 13, soal: "Perhatikan denah sebuah rumah berikut!\nJika skala denah rumah adalah 1 : 200, maka luas bangunan rumah sebenarnya adalah ...", options: ["A. 46 $m^2$", "B. 92 $m^2$", "C. 184 $m^2$", "D. 368 $m^2$"] },
  { no: 14, soal: "Denah sebuah gedung berskala 1 : 300. Jika luas denah 125 $cm^2$, maka luas gedung sebenarnya adalah ...", options: ["A. 375 $m^2$", "B. 1.125 $m^2$", "C. 3.750 $m^2$", "D. 11.250 $m^2$"] },
  { no: 15, soal: "Diketahui denah sebuah rumah digambar dengan skala 1 : 30. Ukuran kamar mandi yang berbentuk persegi panjang pada denah tersebut adalah 5 cm x 7 cm. Luas kamar mandi tersebut yang sebenarnya adalah ...", options: ["A. 3,15 $m^2$", "B. 3,50 $m^2$", "C. 4,25 $m^2$", "D. 10,50 $m^2$"] },
  { no: 16, soal: "Adi dapat menyelesaikan suatu pekerjaan selama 4 jam. Budi dapat menyelesaikan pekerjaan yang sama dalam waktu 6 jam. Jika pekerjaan tersebut dikerjakan Adi dan Budi bersama-sama, maka pekerjaan tersebut akan selesai dalam waktu ...", options: ["A. 1 jam 4 menit", "B. 1 jam 24 menit", "C. 2 jam 4 menit", "D. 2 jam 24 menit"] },
  { no: 17, soal: "Pompa air \"A\" dapat mengisi kolam sampai penuh dalam waktu 3 jam. Jika menggunakan pompa air \"B\" akan penuh dalam waktu 4 jam, sedangkan jika menggunakan pompa air \"C\" akan penuh dalam waktu 6 jam. Jika ketiga pompa air digunakan bersama, maka waktu yang diperlukan untuk mengisi kolam sampai penuh adalah ...", options: ["A. 1 jam 15 menit", "B. 1 jam 20 menit", "C. 2 jam 15 menit", "D. 2 jam 20 menit"] },
  { no: 18, soal: "Suatu pekerjaan jika dikerjakan oleh 3 orang tenaga profesional akan selesai dalam waktu 10 hari, sedangkan jika dikerjakan oleh 8 orang tenaga nonprofesional akan selesai dalam waktu 9 hari. Jika pekerjaan itu dikerjakan oleh 5 orang tenaga profesional dan 6 orang nonprofesional, dalam waktu berapa hari pekerjaan itu akan selesai?", options: ["A. 4 hari", "B. 5 hari", "C. 6 hari", "D. 8 hari"] },
  { no: 19, soal: "Sebuah perusahaan konstruksi mengerahkan 12 pekerja untuk menyelesaikan 2 unit rumah dalam waktu 30 hari. Jika perusahaan tersebut ingin menyelesaikan 3 unit rumah serupa dalam waktu 24 hari, berapa banyak pekerja yang harus mereka kerahkan?", options: ["A. 23 pekerja", "B. 22 pekerja", "C. 18 pekerja", "D. 15 pekerja"] },
  { no: 20, soal: "Seorang peternak memiliki 40 ekor sapi yang dapat menghabiskan 60 karung pakan dalam waktu 15 hari. Jika peternak tersebut menjual 10 ekor sapinya (tersisa 30 ekor) dan ia hanya memiliki 45 karung pakan, berapa lama persediaan pakan tersebut akan habis?", options: ["A. 15 hari", "B. 20 hari", "C. 12 hari", "D. 25 hari"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2003 Tingkat Kota\nPada sebuah peta dengan skala 1 : 100.000, luas tanah sebuah sekolah adalah 50 $cm^2$. Luas tanah sekolah tersebut pada peta dengan skala 1 : 200.000 adalah ...", options: [] },
  { no: 2, soal: "OSN Matematika 2004 Tingkat Kota\nTujuh ekor kambing menghabiskan rumput seluas 7 kali ukuran lapangan sepak bola dalam waktu 7 hari. Waktu yang diperlukan oleh 3 ekor kambing untuk menghabiskan rumput seluas 3 kali ukuran lapangan sepak bola adalah ... hari", options: [] },
  { no: 3, soal: "OSN Matematika 2006 Tingkat Kota\nPada suatu peta tertulis perbandingan 1 : 200.000. Jika jarak antara dua kota adalah 50 km, maka jarak kedua kota itu dalam peta adalah ...", options: ["A. 0,25 cm", "B. 2,5 cm", "C. 25 cm", "D. 1 cm", "E. 10 cm"] },
  { no: 4, soal: "OSN Matematika 2007 Tingkat Kota\nSebuah pabrik pembuat tas memiliki pekerja laki-laki sama banyak dengan pekerja wanita. Kecepatan kerja pekerja laki-laki dan wanita sama. Dalam waktu 6 hari, 6 pekerja laki-laki dan 8 pekerja wanita dapat menghasilkan 4.200 tas. Dalam waktu tujuh hari, seluruh pekerja pabrik dapat menghasilkan 5.600 tas, maka pekerja laki-laki pada pabrik tersebut ada sebanyak... orang", options: [] },
  { no: 5, soal: "OSN Matematika 2009 Tingkat Kota\nTujuh orang tukang kayu dalam waktu 5 jam menghasilkan 6 papan tulis. Dalam waktu 1 jam papan tulis yang dihasilkan oleh seorang tukang kayu adalah ...", options: ["A. $\\frac{1}{35}$", "B. $\\frac{1}{7}$", "C. $\\frac{6}{35}$", "D. $\\frac{2}{7}$"] },
  { no: 6, soal: "OSN Matematika 2009 Tingkat Kota\nPada hari minggu, jumlah uang Tora dan Ani berbanding 3 : 1. Pada hari senin Tora memberi uang sejumlah Rp50.000,00 kepada Ani. Sekarang perbandingan jumlah uang Tora dan Ani menjadi 1 : 2. Jumlah uang Tora dan Ani pada hari Minggu adalah ...", options: ["A. Rp720.000,00", "B. Rp600.000,00", "C. Rp450.000,00", "D. Rp400.000,00", "E. Rp120.000,00"] },
  { no: 7, soal: "OSN Matematika 2010 Tingkat Kota\nSuatu pekerjaan jika dikerjakan oleh Anto dan Dini dapat diselesaikan dalam waktu 6 jam. Jika pekerjaan itu dikerjakan oleh Dini sendirian akan selesai 5 jam lebih lambat dibandingkan Anto. Pekerjaan itu dapat diselesaikan Anto sendirian dalam waktu... jam", options: [] },
  { no: 8, soal: "OSN Matematika 2011 Tingkat Kota\nSuatu jam dinding selalu menghasilkan keterlambatan lima menit untuk setiap jamnya. Jika saat sekarang jam tersebut menunjukkan waktu yang tepat, maka jam tersebut akan menunjukkan waktu yang tepat setelah ... jam", options: ["A. 105", "B. 110", "C. 114", "D. 124", "E. 144"] },
  { no: 9, soal: "OSN Matematika 2012 Tingkat Kota\nEnam pipa besar dapat mengeringkan sebuah kolam dalam waktu 5 jam, sedangkan delapan pipa kecil dapat mengeringkan kolam tersebut dalam waktu 10 jam. Waktu yang diperlukan untuk mengeringkan kolam tersebut apabila menggunakan 3 pipa besar dan 5 pipa kecil adalah ... jam", options: ["A. $\\frac{60}{13}$", "B. $\\frac{80}{13}$", "C. $\\frac{90}{13}$", "D. 8", "E. 9"] },
  { no: 10, soal: "OSN Matematika 2013 Tingkat Kota\nSuatu hari perbandingan jumlah uang Netty dan Agit adalah 2 : 1. Sehari kemudian Netty memberikan uangnya sejumlah Rp100.000 kepada Agit. Sekarang perbandingan uang Netty dan Agit adalah 1 : 3. Jumlah uang Netty sekarang adalah Rp ....", options: ["A. 240.000,00", "B. 180.000,00", "C. 120.000,00", "D. 60.000,00"] },
  { no: 11, soal: "OSN Matematika 2021 Tingkat Kota\nSebuah lantai berbentuk persegi dilapisi dengan ubin berbentuk persegi dengan panjang sisi p satuan sebanyak n buah. Untuk n = 4 dapat dilihat seperti gambar berikut.\nDiketahui q adalah jarak antar ubin pada satu baris dan kolom serta jarak ubin terluar dengan sisi lantai. Jika n = 81 maka persentase luas seluruh ubin dibandingkan luas lantai adalah 64%. Perbandingan nilai p dan q adalah ...", options: ["A. 40 : 9", "B. 40 : 3", "C. 8 : 6", "D. 8 : 3"] },
  { no: 12, soal: "OSN Matematika 2023 Tingkat Kota\nMisalkan populasi ikan A semula adalah x dan populasi ikan B semula adalah y. Sekarang, populasi ikan A meningkat 28% dan populasi B berkurang 28% sehingga rasio ikan A dan B menjadi $\\frac{x}{y}$. Persentase perubahan populasi keseluruhan ikan sekarang dibandingkan total populasi ikan semula adalah ...", options: ["A. 0%", "B. 4%", "C. 28%", "D. 33%"] },
];

const OlimpiadePerbandinganPage = () => {
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
          OLIMPIADE - PERBANDINGAN
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

export default OlimpiadePerbandinganPage;

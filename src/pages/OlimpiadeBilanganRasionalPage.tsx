import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";

const materiSection = {
  title: "MATERI - BILANGAN RASIONAL",
  sections: [
    {
      heading: "A. Pengertian Bilangan Rasional",
      content: `Bilangan rasional adalah bilangan yang dapat dinyatakan dalam bentuk:
a/b, dengan a,b ∈ Z dan b ≠ 0

Contoh:
• 1/2, -3/4, -5/1
• 0.75 = 3/4, 1,3333.... = 4/3`
    },
    {
      heading: "B. Ciri-Ciri Bilangan Rasional",
      content: `• Bisa ditulis sebagai pecahan biasa
• Desimalnya berhenti (terminating) atau berulang (repeating)
  ➢ Contoh terminasi: 0.25 = 1/4
  ➢ Contoh desimal berulang: 0.333...= 1/3`
    },
    {
      heading: "C. Pecahan campuran dan pecahan biasa",
      content: `• a(b/c) = (a×c + b)/c
• (a/c) + (b/c) = (a+b)/c`
    },
    {
      heading: "D. Operasi hitung bilangan Rasional",
      content: `1. Penjumlahan / Pengurangan
   a/b ± c/d = (ad ± bc)/bd

2. Perkalian
   a/b × c/d = ac/bd

3. Pembagian
   a/b : c/d = a/b × d/c = ad/bc`
    },
  ]
};

const latihanDasar = [
  { no: 1, soal: "Hasil dari 1(1/2) + 2(2/3) × 1(2/5) adalah ...", options: ["A. 2(5/5)", "B. 5(5/6)", "C. 4(6/25)", "D. 6(23/20)"] },
  { no: 2, soal: "Hasil dari 2(2/4) : 1(1/3) - 2(3/5) adalah ...", options: ["A. -1(3/4)", "B. -2(3/5)", "C. 4(5/5)", "D. 8(11/45)"] },
  { no: 3, soal: "Hasil dari 3,5 : 1,75 + 60 % - 2(1/2) adalah ...", options: ["A. 1/10", "B. 2/10", "C. 3/10", "D. 13/17"] },
  { no: 4, soal: "Urutan pecahan terkecil ke terbesar dari bilangan 0,6 ; 55% ; 2/3; 0,54 adalah ...", options: ["A. 55% ; 0,54 ; 0,6 ; 2/3", "B. 0,54 ; 55% ; 0,6 ; 2/3", "C. 2/3; 0,6 ; 55% ; 0,54", "D. 0,54 ; 55% ; 2/3; 0,6"] },
  { no: 5, soal: "Urutan pecahan terkecil ke terbesar dari 0,45 ; 0,85 ; 7/8 ; 78% adalah ...", options: ["A. 0,45 ; 78% ; 7/8; 0,85", "B. 0,45 ; 78% ; 0,85 ; 7/8", "C. 0,85 ; 7/8; 78% ; 0,45", "D. 7/8; 0,85 ; 78% ; 7/8"] },
  { no: 6, soal: "Bentuk paling sederhana dari 1/(1 - 3/11) + 2/4 adalah ....", options: ["A. 3/11", "B. 3/16", "C. 11/3", "D. 16/3"] },
  { no: 7, soal: "Bentuk paling sederhana dari (2/1 - 3/4)/(1/1 + 4/2) adalah ...", options: ["A. 5/9", "B. 7/9", "C. 9/7", "D. 9/5"] },
  { no: 8, soal: "Pak Hari mempunyai sejumlah uang. Seperlimanya digunakan untuk membeli kaos, duapertiganya digunakan untuk membeli baju dan sisanya sebesar Rp60.000,00 digunakan untuk membeli topi. Besar uang pak Hari seluruhnya adalah ...", options: ["A. 360.000,00", "B. 400.000,00", "C. 425.000,00", "D. 450.000,00"] },
  { no: 9, soal: "Ibu membeli gula sebanyak 6(2/3) kg. Ternyata di rumah masih tersedia gula sebanyak 10(5/6) kg. Gula tersebut akan dimasukkan dalam kantong plastik dengan berat masing-masing kantong plastik 1(3/4) kg. Banyak kantong plastik yang diperlukan adalah ...", options: ["A. 9 buah", "B. 10 buah", "C. 11 buah", "D. 12 buah"] },
  { no: 10, soal: "Pada kegiatan sosial menerima terigu beratnya 21(3/4) kg dan 23(1/4) kg untuk dibagikan pada warga. Jika setiap warga menerima 2(1/2) kg. Banyak warga yang menerima sumbangan terigu tersebut adalah ...", options: ["A. 21 orang", "B. 20 orang", "C. 18 orang", "D. 15 orang"] },
  { no: 11, soal: "Jamie membeli 6(2/5) lot saham di sebuah bank dengan harga total Rp7.200.000. Harga 1 lot saham di bank tersebut adalah ...", options: ["A. Rp 1.000.000", "B. Rp1.125.000", "C. Rp1.200.000", "D. Rp1.350.000"] },
  { no: 12, soal: "Husein mampu mengecat tembok sebuah bangunan dalam waktu 3 hari, sedangkan Amir dalam waktu 6 hari. Jika Husen dan Amir bekerja bersama-sama melakukan pengecatan, maka waktu yang diperlukan adalah ...", options: ["A. 1 hari", "B. 2 hari", "C. 3 hari", "D. 4 hari"] },
  { no: 13, soal: "Jika satu stel seragam dikerjakan oleh Anida sendiri akan selesai selama 9 jam sedangkan satu stel seragam yang sama dikerjakan oleh Anisa sendiri akan selesai selama 6 jam, maka waktu yang dibutuhkan oleh Anida bersama Anisa untuk menyelesaikan satu stel seragam sekolah tersebut adalah ...", options: ["A. 3 jam 30 menit", "B. 3 jam 36 menit", "C. 7 jam 30 menit", "D. 7 jam 50 menit"] },
  { no: 14, soal: "Pompa air \"A\" dapat mengisi kolam sampai penuh dalam waktu 3 jam. Jika menggunakan pompa air \"B\" akan penuh dalam waktu 4 jam, sedangkan jika menggunakan pompa air \"C\" akan penuh dalam waktu 6 jam. Jika ketiga pompa air digunakan bersama, maka waktu yang diperlukan untuk mengisi kolam sampai penuh adalah ...", options: ["A. 1 jam 15 menit", "B. 1 jam 20 menit", "C. 2 jam 15 menit", "D. 2 jam 20 menit"] },
  { no: 15, soal: "Jika desimal 0,3636363636..., diubah kedalam bentuk pecahan a/b maka hasil dari a + b adalah....", options: ["A. 13", "B. 14", "C. 15", "D. 16"] },
  { no: 16, soal: "Jika P = 0,123123123.... maka nilai dari 333/P = ...", options: ["A. 33", "B. 41", "C. 44", "D. 51"] },
  { no: 17, soal: "Nilai dari (1 - 1/2)(1 - 1/3)(1 - 1/4)...(1 - 1/2016) adalah ...", options: ["A. 1/2011", "B. 1/2013", "C. 1/2015", "D. 1/2016"] },
  { no: 18, soal: "Jika x = 3 + 2/(3 + 2/(3 + 2/(3 + 2/x)))\nMaka nilai x adalah ...", options: ["A. 3", "B. 4", "C. 5", "D. 6"] },
  { no: 19, soal: "Jumlah semua bilangan bulat n sehingga (n + 5)/(n - 2) adalah bilangan bulat adalah ....", options: ["A. 4", "B. 6", "C. 8", "D. 12"] },
];

const latihanOlimpiade = [
  { no: 1, soal: "OSN Matematika 2003 Tingkat Kota\nHasil operasi terbesar yang dapat diperoleh dari penempatan angka-angka 4, 6, 7 dan 8 pada kotak yang tersusun seperti di bawah ini adalah ...\n[Jawaban: 20]", options: [] },
  { no: 2, soal: "OSN Matematika 2004 Tingkat Kota\nPecahan s/t adalah pecahan sejati, jika s < t dan faktor persekutuan terbesarnya adalah 1. Jika t memiliki nilai mulai dari 2 sampai dengan 9 dan s bilangan positif, maka banyaknya pecahan sejati berbeda yang dapat dibuat adalah ...", options: ["A. 26", "B. 27", "C. 28", "D. 30", "E. 36"] },
  { no: 3, soal: "OSN Matematika 2004 Tingkat Kota\nSemua n sehingga n dan (n + 3)/(n - 1) sehingga merupakan bilangan bulat adalah ...\n[Jawaban: {-3, -1, 0, 2, 3, 5}]", options: [] },
  { no: 4, soal: "OSN Matematika 2004 Tingkat Kota\nMisalkan N = 2/10 + 3/10² + 11/10³ + ... + 11/10¹¹. Dalam bentuk desimal Nilai N adalah ...\n[Jawaban: 0,12345679011]", options: [] },
  { no: 5, soal: "OSN Matematika 2005 Tingkat Kota\nBentuk sederhana dari 1/2 + 1/6 + 1/12 + 1/20 + ... + 1/(2005×2006) adalah ...\n[Jawaban: 2005/2006]", options: [] },
  { no: 6, soal: "OSN Matematika 2006 Tingkat Kota\nJika 1/6 + 1/12 = 1/x, maka x = ...", options: ["A. 4", "B. 4 dan -4", "C. 2", "D. 2 dan -2", "E. Tidak ada yang memenuhi"] },
  { no: 7, soal: "OSN Matematika 2006 Tingkat Kota\n2006/(1×2) + 2006/(2×3) + 2006/(3×4) + ... + 2006/(2005×2006) = ...\n[Jawaban: 2005]", options: [] },
  { no: 8, soal: "OSN Matematika 2006 Tingkat Kota\nDiantara bilangan-bilangan berikut, manakah yang terletak diantara 11/15 dan 13/18", options: ["A. 12/15", "B. 13/15", "C. 15/18", "D. 11/13", "E. 24/33"] },
  { no: 9, soal: "OSN Matematika 2006 Tingkat Kota\nBilangan asli n sedemikian sehingga hasil kali:\n(1 + 1/2)(1 + 1/3)(1 + 1/4)...(1 + 1/n)\nMerupakan bilangan bulat adalah ...", options: ["A. n ganjil", "B. n genap", "C. n kelipatan 3", "D. n sembarang", "E. Tidak ada n yang memenuhi"] },
  { no: 10, soal: "OSN Matematika 2006 Tingkat Kota\nMisalkan m dan n adalah bilangan bulat dan 0 < m < n. Jika 1/m + 1/n = 1/3, maka 1/m - 1/n = ...", options: ["A. 2/3", "B. 1/6", "C. -1/6", "D. -2/3", "E. 5/6"] },
  { no: 11, soal: "OSN Matematika 2007 Tingkat Kota\nMisalkan untuk bilangan bulat a dan b didefinisikan a*b = (a+b)/2, untuk semua bilangan bulat a, b dan c\nI. a*b = b*a\nII. a*a = a\nIII. a*(b*c) = (a*b)*c\nPernyataan yang benar adalah ...", options: ["A. I saja", "B. II saja", "C. III saja", "D. I dan II saja", "E. I. II dan III"] },
  { no: 12, soal: "OSN Matematika 2008 Tingkat Kota\nJika 173/61 = 1 + 1/(a + 1/(b + 1/(c + 1/d))),\nMaka 25a + 5b + 100c + 500d = ...", options: ["A. 6325", "B. 5635", "C. 5555", "D. 4545", "E. 3475"] },
  { no: 13, soal: "OSN Matematika 2008 Tingkat Kota\nPada saat makan siang, Taufan menghabiskan 1/3 dari uang yang ia miliki. Setelah makan siang, ia menerima uang dari temannya sebesar Rp 25.000,00. Sore harinya, ia membeli tiket bioskop bola seharga Rp 40.000,00 dan membeli makanan seharga Rp 12.500,00. Sekarang uangnya tersisa Rp 52.500,00, maka besar uang Taufan sebelum makan siang adalah?\n[Jawaban: Rp120.000,00]", options: [] },
  { no: 14, soal: "OSN Matematika 2009 Tingkat Kota\nBerat seekor gajah pada awal tahun adalah 655,36 kg. Selama bulan januari, berat gajah naik sebanyak 25%. Karena debu dari efek meteoroit yang menghalangi sinar matahari sepanjang bulan februari, berat gajah turun 25%. Kemudian sepanjang bulan maret sinar matahari kembali normal dan berat gajah kembali naik 25%. Pada bulan april, karena keracunan makanan, gajah terserang sakit perut yg menyebabkan beratnya kembali turun 25%. Keadaan seperti ini berlanjut hingga bulan bulan berikutnya. Berat gajah pada akhir juli adalah...kg.", options: ["A. 675,00", "B. 625,00", "C. 600,00", "D. 540,00"] },
  { no: 15, soal: "OSN Matematika 2009 Tingkat Kota\nEdy berangkat ke sekolah pukul 6.00 setiap pagi. Bila bermobil kecepatan mobil 40 km/jam, dia tiba disekolah terlambat 20 menit. Jika kecepatan 60 km/jam,dia tiba 15 menit lebih awal. Di sekolah edy, jam pertama dimulai pukul?", options: ["A. 7.30", "B. 7.25", "C. 7.15", "D. 7.00"] },
  { no: 16, soal: "OSN Matematika 2010 Tingkat Kota\nJika x : y = 3: 4, maka nilai (x² - x)/(x² - xy + y²) adalah ...", options: ["A. -84/25", "B. -66/25", "C. 66/25", "D. 84/25", "E. 115/25"] },
  { no: 17, soal: "OSN Matematika 2010 Tingkat Kota\nJika operasi * terhadap bilangan rasional positif didefinisikan sebagai:\na*b = ab/(a+b)\nMaka nilai 3*(3*3) adalah ...\n[Jawaban: 1]", options: [] },
  { no: 18, soal: "OSN Matematika 2010 Tingkat Kota\nDiketahui x/3, x/3, x/15 adalah bilangan bulat. Manakah dari ketiga bentuk di bawah ini yang juga merupakan bilangan bulat untuk nilai-nilai x yang memenuhi ketiga bentuk di atas?\nI. (x + 1)/3²\nII. x/2\nIII. x/6", options: ["A. I", "B. II", "C. III", "D. I dan III", "E. II dan III"] },
  { no: 19, soal: "OSN Matematika 2011 Tingkat Kota\nNilai 1/8! - 2/9! + 3/10! = ...", options: ["A. 113/10!", "B. 91/10!", "C. 73/10!", "D. 71/10!", "E. 4/10!"] },
  { no: 20, soal: "OSN Matematika 2012 Tingkat Kota\nMisalkan ab adalah bilangan terdiri dari dua angka. Jika bilangan itu ditambah 45, maka diperoleh bilangan ba. Pada bilangan ab, jika diantara a dan b disisipkan angka 0, maka diperoleh bilangan yang nilainya 7(2/3) kali bilangan ab. Bilangan ab tersebut adalah ...\n[Jawaban: 27]", options: [] },
  { no: 21, soal: "OSN Matematika 2012 Tingkat Kota\nJalan Majapahit sejajar dengan jalur kereta api yang membentang lurus. Anton menumpang bus OSN di jalan Majapahit dengan kecepatan (tetap) 40 km/jam. Dari arah yang berlawanan, bus yang ditumpangi Anton berpapasan dengan kereta api barang yang bergerak dengan kecepatan konstan 20 km/jam. Anton mencatat bahwa bus dan kereta api berpapasan selama seperempat menit terhitung mulai dari lokomotif (bagian paling depan) sampai bagian paling belakang. Panjang kereta api tersebut adalah....meter", options: [] },
  { no: 22, soal: "OSN Matematika 2013 Tingkat Kota\nJika jumlah dua bilangan positif adalah 24, maka nilai terkecil dari jumlah kebalikan bilangan-bilangan tersebut adalah ...", options: ["A. 1", "B. 1/2", "C. 1/3", "D. 1/4", "E. 1/6"] },
  { no: 23, soal: "OSN Matematika 2013 Tingkat Kota\nJika 2013/7000 ditulis dalam bentuk decimal, maka angka ke-2013 di belakang koma adalah ...", options: ["A. 1", "B. 2", "C. 4", "D. 5", "E. 8"] },
  { no: 24, soal: "OSN Matematika 2013 Tingkat Kota\nSuatu hasil perbandingan jumlah uang Netty dan Agit adalah 2 : 1. Sehari kemudian Netty memberikan uangnya sejumlah Rp100.000 kepada Agit. Sekarang perbandingan uang Netty dan Agit adalah 1 : 3. Jumlah uang Netty sekarang adalah Rp ....", options: ["A. 240.000,00", "B. 180.000,00", "C. 120.000,00", "D. 100.000,00", "E. 60.000,00"] },
  { no: 25, soal: "OSN Matematika Tingkat Kota 2013\nBanyak bilangan positif n sehingga (2013 - n²)/3 berupa bilangan bulat positif adalah ...", options: [] },
  { no: 26, soal: "OSN Matematika 2014 Tingkat Kota\nJika hasil penjumlahan empat dari enam pecahan 1/2, 1/4, 1/8, 1/16, 1/20, dan 1/40 adalah 9/10, maka hasil kali dua pecahan lainnya adalah ...", options: [] },
  { no: 27, soal: "OSN Matematika 2014 Tingkat Kota\nBerikut diberikan data siswa kelas VIII SMP Bina Prestasi. Tiga perlima bagian dari seluruh siswa adalah perempuan. Setengah dari siswa laki-laki diketahui pergi ke sekolah naik bus sekolah, sedangkan siswa perempuan hanya seperenamnya yang pergi kesekolah naik bus sekolah. Diketahui juga bahwa terdapat 147 siswa pergi sekolah tidak naik bus sekolah. Banyak siswa kelas VIII di sekolah tersebut adalah ...", options: ["A. 320", "B. 245", "C. 210", "D. 193"] },
  { no: 28, soal: "OSN Matematika 2016 Tingkat Kota\nNilai dari (2017² × (2016² - 16) × 2015)/(2020² × (2016² - 1)) adalah ...", options: ["A. 2012", "B. 2013", "C. 2014", "D. 2015"] },
  { no: 29, soal: "OSN Matematika 2016 Tingkat Kota\nSuatu survey dilakukan pada siswa kelas VII untuk mengetahui siswa yang berminat mengikuti kegiatan Paskibra. Hasil Survei adalah sebagai berikut:\n• 25% dari total siswa putra dan 50% dari siswa putri ternyata berminat mengikuti kegiatan tersebut\n• 90% dari total peminat kegiatan Paskibra adalah siswa putri.\nRasio total siswa putri dan total siswa putra kelas VII di sekolah tersebut adalah ...", options: ["A. 9 : 1", "B. 9 : 2", "C. 9 : 3", "D. 9 : 4"] },
  { no: 30, soal: "OSN Matematika 2019 Tingkat Kota\nHasil Ikan Tangkapan (HIT) seorang nelayan selama bulan Januari 2019 turun 25% dibanding bulan sebelumnya dan HIT selama bulan Februari 2019 turun 20% dibanding bulan sebelumnya. HIT selama bulan Maret 2019 turun 10% dibanding bulan sebelumnya sehingga menjadi 108 kg. Pernyataan berikut yang benar adalah", options: ["A. HIT bulan Desember 2018 sebanyak 200 kg", "B. HIT bulan Januari 2019 sebanyak 120 kg", "C. HIT bulan Februari 2019 sebanyak 130 kg", "D. HIT bulan Februari 2019 sebanyak 150 kg"] },
  { no: 31, soal: "OSN Matematika 2020 Tingkat Kota\nJumlah semua bilangan bulat positif n sedemikian sehingga\n(n - 2)²/(n + 3)\nMerupakan bilangan bulat adalah ...", options: ["A. 0", "B. 24", "C. 3", "D. tak hingga"] },
  { no: 32, soal: "OSN Matematika Tingkat Kota 2020\nJika a, b, c, d adalah bilangan bulat positif berbeda sehingga abcd = 2020, maka nilai terkecil yang mungkin dari (a+b)/(c+d) adalah ...", options: ["A. 3/507", "B. 5/106", "C. 1/17", "D. 1/69"] },
  { no: 33, soal: "OSN Matematika 2021 Tingkat Kota\nMisalkan bilangan pecahan 27/5 dapat dinyatakan sebagai\n27/5 = A + 1/(B + 1/(C + 1))\nDengan A, B, C adalah bilangan bulat. Nilai A × B × C adalah ...", options: ["A. 9", "B. 10", "C. 15", "D. 20"] },
  { no: 34, soal: "OSN Matematika 2022 Tingkat Kota\nSMP Nusantara mengadakan kegiatan menanam pohon yang diikuti oleh sejumlah guru pria dan guru Wanita. Sepertiga dari keseluruhan guru tersebut mengajak serta siswa dengan aturan satu guru hanya mengajak satu siswa. Terdapat 159 pohon yang ditanam. Jika satu orang guru pria menanam 13 pohon, satu orang guru Wanita menanam 10 pohon, dan 1 orang siswa menanam 6 pohon, maka banyaknya guru Wanita yang menanam pohon adalah ...", options: ["A. 5", "B. 7", "C. 9", "D. 12"] },
  { no: 35, soal: "OSN Matematika 2023 Tingkat Kota\nMisalkan populasi ikan A semula adalah x dan populasi ikan B semula adalah y. Sekarang populasi ikan A meningkat 28% dan populasi B berkurang 28%, sehingga rasio populasi ikan A dan B menjadi y/x. Persentase perubahan populasi keseluruhan ikan sekarang dibandingkan total populasi ikan semula adalah ...", options: ["A. 0%", "B. 4%", "C. 28%", "D. 33%"] },
  { no: 36, soal: "OSN Matematika 2023 Tingkat Kota\nJika M = (1/3 + 1/5 + ... + 1/2023)/(1/(1×2023) + 1/(3×2021) + 1/(5×2019) + ... + 1/(2013×1))\nMaka hasil penjumlahan semua faktor prima dari M adalah ...", options: ["A. 10", "B. 17", "C. 30", "D. 36"] },
];

const kunciJawaban = {
  latihanDasar: ["B", "B", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  latihanOlimpiade: ["20", "B", "{-3, -1, 0, 2, 3, 5}", "0,12345679011", "2005/2006", "C", "2005", "E", "A", "B", "D", "C", "Rp120.000,00", "A", "B", "C", "1", "C", "C", "27", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
};

const OlimpiadeBilanganRasionalPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"materi" | "dasar" | "olimpiade" | "kunci">("materi");
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
          OLIMPIADE - BILANGAN RASIONAL
        </h1>
        <p className="text-white/50 text-xs text-center mb-1 font-body">Irawan Sutiawan, M.Pd</p>
        <p className="text-white/40 text-xs text-center mb-6 font-body">Indikator 2: Menyelesaikan masalah yang berkaitan dengan operasi tambah, kurang, kali atau bagi pada bilangan Rasional</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {[
            { key: "materi" as const, label: "Materi" },
            { key: "dasar" as const, label: "Latihan Dasar" },
            { key: "olimpiade" as const, label: "Latihan Olimpiade" },
            { key: "kunci" as const, label: "Kunci Jawaban" },
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
                <p className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal}
                </p>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {opt}
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
                <p className="font-body text-sm text-white mb-3 whitespace-pre-wrap">
                  <span className="text-accent font-bold">{soal.no}.</span> {soal.soal}
                </p>
                {soal.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soal.options.map((opt, j) => (
                      <div key={j} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Kunci Jawaban Tab */}
        {activeTab === "kunci" && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
              <h3 className="font-display text-sm text-accent font-bold mb-4">LATIHAN DASAR</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {kunciJawaban.latihanDasar.map((jawaban, idx) => (
                  <div key={idx} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2">
                    <span className="text-accent font-bold">{idx + 1}.</span> {jawaban || "-"}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-5 py-4">
              <h3 className="font-display text-sm text-accent font-bold mb-4">LATIHAN OLIMPIADE</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {kunciJawaban.latihanOlimpiade.map((jawaban, idx) => (
                  <div key={idx} className="font-body text-xs text-white/70 bg-muted/30 rounded-lg px-3 py-2 break-all">
                    <span className="text-accent font-bold">{idx + 1}.</span> {jawaban || "-"}
                  </div>
                ))}
              </div>
            </div>
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

export default OlimpiadeBilanganRasionalPage;

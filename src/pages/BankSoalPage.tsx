import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";

const BankSoalPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-2xl w-full px-4 text-center">
        <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-4">
          BANK SOAL
        </h1>
        <p className="text-white/70 text-sm font-body mb-8">
          Koleksi lengkap soal-soal matematika
        </p>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-8">
          <p className="text-white font-body text-sm">
            Bank soal dengan ribuan soal matematika akan segera tersedia. Pantau terus!
          </p>
        </div>

        <button
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className="mt-8 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default BankSoalPage;

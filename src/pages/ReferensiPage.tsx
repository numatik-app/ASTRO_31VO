import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const ReferensiPage = () => {
  const navigate = useNavigate();

  const refs = [
    "Abdur Rahman As'ari, dkk. 2017. Matematika SMP/MTs Kelas VIII Semester I. Edisi Revisi. Jakarta: Kementerian Pendidikan dan Kebudayaan RI.",
    "Raharjo, M dan Setiawan, A. 2019. Matematik 2 untuk SMP/MTS Kelas VIII. Jakarta: Erlangga.",
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation prevPath="/latihan" />
      <div className="relative z-10 max-w-2xl w-full px-4">
        <h1 className="font-display text-3xl font-bold text-primary text-glow-cyan mb-8 text-center">
          SUMBER REFERENSI
        </h1>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 space-y-4 mb-6">
          {refs.map((r, i) => (
            <div key={i} className="flex gap-3 text-sm text-muted-foreground font-body animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-primary font-display font-bold shrink-0">[{i + 1}]</span>
              <p>{r}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate("/menu")} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferensiPage;

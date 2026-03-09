import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import ExitDialog from "./ExitDialog";
import { playPopSound } from "@/hooks/useAudio";

interface PageNavigationProps {
  prevPath?: string;
  nextPath?: string;
}

const PageNavigation = ({ prevPath, nextPath }: PageNavigationProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Bottom-left: Back / Next */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => { playPopSound(); navigate(-1); }}
          className="w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border 
            flex items-center justify-center text-primary hover:border-primary/60 
            hover:box-glow-cyan transition-all duration-300 cursor-pointer"
          title="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {nextPath && (
          <button
            onClick={() => { playPopSound(); navigate(nextPath); }}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border 
              flex items-center justify-center text-primary hover:border-primary/60 
              hover:box-glow-cyan transition-all duration-300 cursor-pointer"
            title="Halaman berikutnya"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Top-right: Exit on top, Home below */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <ExitDialog />
        <button
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className="w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border 
            flex items-center justify-center text-primary hover:border-primary/60 
            hover:box-glow-cyan transition-all duration-300 cursor-pointer"
          title="Menu Utama"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default PageNavigation;

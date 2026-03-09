import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import ExitDialog from "./ExitDialog";
import { playPopSound } from "@/hooks/useAudio";

const QuizNavigation = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default QuizNavigation;

import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { Settings, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";

const PengaturanPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    playPopSound();
    toggleTheme();
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
      theme === "dark" ? "gradient-space" : "gradient-snow"
    }`}>
      {theme === "dark" ? <Starfield /> : <Snowfall />}
      <PageNavigation />
      <div className="relative z-10 max-w-2xl w-full px-4 text-center">
        <Settings className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-primary" : "text-blue-600"}`} />
        <h1 className={`font-display text-2xl md:text-3xl font-bold mb-4 ${
          theme === "dark" ? "text-primary text-glow-cyan" : "text-blue-700"
        }`}>
          PENGATURAN
        </h1>
        <p className={`text-sm font-body mb-8 ${
          theme === "dark" ? "text-white/70" : "text-gray-600"
        }`}>
          Atur preferensi aplikasi
        </p>

        <div className={`backdrop-blur border rounded-xl p-8 space-y-6 ${
          theme === "dark"
            ? "bg-card/80 border-border"
            : "bg-white/80 border-blue-200"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
              <span className={`font-body text-sm ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                {theme === "dark" ? "Mode Gelap (Tema Luar Angkasa)" : "Mode Terang (Tema Salju)"}
              </span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleToggle}
            />
          </div>

          <div className={`border-t pt-6 ${
            theme === "dark" ? "border-border" : "border-blue-200"
          }`}>
            <p className={`font-body text-xs ${
              theme === "dark" ? "text-white/60" : "text-gray-600"
            }`}>
              {theme === "dark"
                ? "Mode gelap dengan tema luar angkasa dan bintang bergerak aktif."
                : "Mode terang dengan tema salju cerah dan efek salju jatuh aktif."
              }
            </p>
          </div>
        </div>

        <button
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className={`mt-8 text-sm transition-colors cursor-pointer font-body ${
            theme === "dark"
              ? "text-muted-foreground hover:text-primary"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
};

export default PengaturanPage;

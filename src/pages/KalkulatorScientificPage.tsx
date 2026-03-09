import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playPopSound } from "@/hooks/useAudio";
import { useState, useRef } from "react";
import { create, all } from "mathjs";



type AngleMode = "DEG" | "RAD";

type HistoryItem = {
  expression: string;
  result: string;
  timestamp: number;
};

type TokenType = "number" | "operator" | "func" | "paren" | "constant";

type Token = {
  type: TokenType;
  value: string;
};

type Assoc = "left" | "right";

const OP_INFO: Record<
  string,
  { precedence: number; assoc: Assoc; argCount: 1 | 2 }
> = {
  "+": { precedence: 2, assoc: "left", argCount: 2 },
  "-": { precedence: 2, assoc: "left", argCount: 2 },
  "*": { precedence: 3, assoc: "left", argCount: 2 },
  "/": { precedence: 3, assoc: "left", argCount: 2 },
  "^": { precedence: 4, assoc: "right", argCount: 2 },
  "!": { precedence: 5, assoc: "left", argCount: 1 },
  "u-": { precedence: 5, assoc: "right", argCount: 1 }, // unary minus
};

const isDigit = (ch: string) => ch >= "0" && ch <= "9";

const tokenize = (expr: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;
  let lastToken: Token | null = null;

  while (i < expr.length) {
    const ch = expr[i];

    if (ch === " " || ch === "\t") {
      i += 1;
      continue;
    }

    if (isDigit(ch) || ch === ".") {
      let num = ch;
      i += 1;
      while (i < expr.length && (isDigit(expr[i]) || expr[i] === ".")) {
        num += expr[i];
        i += 1;
      }
      tokens.push({ type: "number", value: num });
      lastToken = tokens[tokens.length - 1];
      continue;
    }

    if (ch === "π") {
      tokens.push({ type: "constant", value: "pi" });
      lastToken = tokens[tokens.length - 1];
      i += 1;
      continue;
    }

    if (/[a-zA-Z]/.test(ch)) {
      let name = ch;
      i += 1;
      while (i < expr.length && /[a-zA-Z]/.test(expr[i])) {
        name += expr[i];
        i += 1;
      }
      const lower = name.toLowerCase();
      if (lower === "pi") {
        tokens.push({ type: "constant", value: "pi" });
      } else if (lower === "e") {
        tokens.push({ type: "constant", value: "e" });
      } else {
        tokens.push({ type: "func", value: lower });
      }
      lastToken = tokens[tokens.length - 1];
      continue;
    }

    if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch });
      lastToken = tokens[tokens.length - 1];
      i += 1;
      continue;
    }

    const mapped =
      ch === "×" ? "*" :
      ch === "÷" ? "/" :
      ch;

    if ("+-*/^!".includes(mapped)) {
      let op = mapped;
      if (mapped === "-") {
        const prev = lastToken;
        if (
          !prev ||
          prev.type === "operator" ||
          (prev.type === "paren" && prev.value === "(")
        ) {
          op = "u-";
        }
      }
      tokens.push({ type: "operator", value: op });
      lastToken = tokens[tokens.length - 1];
      i += 1;
      continue;
    }

    throw new Error(`Karakter tidak dikenali: '${ch}'`);
  }

  return tokens;
};

const toRPN = (tokens: Token[]): Token[] => {
  const output: Token[] = [];
  const stack: Token[] = [];

  for (const token of tokens) {
    if (token.type === "number" || token.type === "constant") {
      output.push(token);
    } else if (token.type === "func") {
      stack.push(token);
    } else if (token.type === "operator") {
      const o1 = token;
      const o1Info = OP_INFO[o1.value];
      if (!o1Info) {
        throw new Error(`Operator tidak didukung: ${o1.value}`);
      }

      while (stack.length > 0) {
        const o2 = stack[stack.length - 1];
        if (o2.type === "operator") {
          const o2Info = OP_INFO[o2.value];
          if (!o2Info) {
            break;
          }
          const shouldPop =
            (o1Info.assoc === "left" && o1Info.precedence <= o2Info.precedence) ||
            (o1Info.assoc === "right" && o1Info.precedence < o2Info.precedence);
          if (shouldPop) {
            output.push(stack.pop() as Token);
            continue;
          }
        } else if (o2.type === "func") {
          output.push(stack.pop() as Token);
          continue;
        }
        break;
      }

      stack.push(o1);
    } else if (token.type === "paren" && token.value === "(") {
      stack.push(token);
    } else if (token.type === "paren" && token.value === ")") {
      while (stack.length > 0 && stack[stack.length - 1].type !== "paren") {
        output.push(stack.pop() as Token);
      }
      if (stack.length === 0) {
        throw new Error("Kurung buka/tutup tidak seimbang");
      }
      stack.pop(); // "("

      if (stack.length > 0 && stack[stack.length - 1].type === "func") {
        output.push(stack.pop() as Token);
      }
    }
  }

  while (stack.length > 0) {
    const t = stack.pop() as Token;
    if (t.type === "paren") {
      throw new Error("Kurung buka/tutup tidak seimbang");
    }
    output.push(t);
  }

  return output;
};

const factorial = (n: number): number => {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Faktorial hanya untuk bilangan bulat ≥ 0");
  }
  if (n > 170) {
    throw new Error("Nilai faktorial terlalu besar");
  }
  let res = 1;
  for (let i = 2; i <= n; i += 1) {
    res *= i;
  }
  return res;
};

const log10 = (x: number): number => {
  if (x <= 0) {
    throw new Error("log hanya untuk x > 0");
  }
  return Math.log(x) / Math.LN10;
};

const evalRPN = (tokens: Token[], angleMode: AngleMode): number => {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token.type === "number") {
      const value = parseFloat(token.value);
      if (Number.isNaN(value)) {
        throw new Error("Angka tidak valid");
      }
      stack.push(value);
    } else if (token.type === "constant") {
      if (token.value === "pi") {
        stack.push(Math.PI);
      } else if (token.value === "e") {
        stack.push(Math.E);
      } else {
        throw new Error(`Konstanta tidak dikenali: ${token.value}`);
      }
    } else if (token.type === "operator") {
      const info = OP_INFO[token.value];
      if (!info) {
        throw new Error(`Operator tidak didukung: ${token.value}`);
      }

      if (info.argCount === 2) {
        const b = stack.pop();
        const a = stack.pop();
        if (a === undefined || b === undefined) {
          throw new Error("Ekspresi tidak valid");
        }
        let res: number;
        switch (token.value) {
          case "+":
            res = a + b;
            break;
          case "-":
            res = a - b;
            break;
          case "*":
            res = a * b;
            break;
          case "/":
            if (b === 0) {
              throw new Error("Pembagian dengan nol");
            }
            res = a / b;
            break;
          case "^":
            res = Math.pow(a, b);
            break;
          default:
            throw new Error(`Operator tidak didukung: ${token.value}`);
        }
        stack.push(res);
      } else {
        const a = stack.pop();
        if (a === undefined) {
          throw new Error("Ekspresi tidak valid");
        }
        let res: number;
        if (token.value === "!") {
          res = factorial(a);
        } else if (token.value === "u-") {
          res = -a;
        } else {
          throw new Error(`Operator unary tidak didukung: ${token.value}`);
        }
        stack.push(res);
      }
    } else if (token.type === "func") {
      const a = stack.pop();
      if (a === undefined) {
        throw new Error("Ekspresi tidak valid");
      }
      let res: number;
      switch (token.value) {
        case "sin": {
          const rad = angleMode === "DEG" ? (a * Math.PI) / 180 : a;
          res = Math.sin(rad);
          break;
        }
        case "cos": {
          const rad = angleMode === "DEG" ? (a * Math.PI) / 180 : a;
          res = Math.cos(rad);
          break;
        }
        case "tan": {
          const rad = angleMode === "DEG" ? (a * Math.PI) / 180 : a;
          res = Math.tan(rad);
          break;
        }
        case "log":
          res = log10(a);
          break;
        case "ln":
          if (a <= 0) {
            throw new Error("ln hanya untuk x > 0");
          }
          res = Math.log(a);
          break;
        case "sqrt":
          if (a < 0) {
            throw new Error("Akar kuadrat hanya untuk x ≥ 0");
          }
          res = Math.sqrt(a);
          break;
        default:
          throw new Error(`Fungsi tidak didukung: ${token.value}`);
      }
      stack.push(res);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Ekspresi tidak valid");
  }

  const value = stack[0];
  if (!Number.isFinite(value)) {
    throw new Error("Hasil tidak terdefinisi");
  }
  return value;
};

const evaluateExpression = (expr: string, angleMode: AngleMode): number => {
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  return evalRPN(rpn, angleMode);
};

const formatResult = (value: number): string => {
  if (!Number.isFinite(value)) {
    return "Error";
  }
  const rounded = parseFloat(value.toPrecision(12));
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toString();
};

const KalkulatorScientificPage = () => {
  const navigate = useNavigate();
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [memory, setMemory] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastWasEqual, setLastWasEqual] = useState(false);

  const handleClearAll = () => {
    playPopSound();
    setExpression("");
    setResult("0");
    setLastWasEqual(false);
  };

  const handleDelete = () => {
    playPopSound();
    setExpression((prev) => (lastWasEqual ? "" : prev.slice(0, -1)));
    setLastWasEqual(false);
  };

  const handleNumberClick = (value: string) => {
    playPopSound();
    setExpression((prev) => (lastWasEqual ? value : prev + value));
    if (lastWasEqual) {
      setLastWasEqual(false);
    }
  };

  const handleDotClick = () => {
    playPopSound();
    setExpression((prev) => {
      const base = lastWasEqual ? "" : prev;
      const match = base.match(/([0-9.]+)$/);
      if (match && match[0].includes(".")) {
        return base;
      }
      if (!base || !/[0-9]$/.test(base)) {
        return base + "0.";
      }
      return base + ".";
    });
    if (lastWasEqual) {
      setLastWasEqual(false);
    }
  };

  const handleOperatorClick = (op: string) => {
    playPopSound();
    setExpression((prev) => {
      const base = lastWasEqual ? result : prev;
      if (!base && op !== "-") {
        return base;
      }
      return base + op;
    });
    setLastWasEqual(false);
  };

  const handleParenClick = (paren: "(" | ")") => {
    playPopSound();
    setExpression((prev) => (lastWasEqual ? paren : prev + paren));
    if (lastWasEqual) {
      setLastWasEqual(false);
    }
  };

  const handleFunctionClick = (funcName: "sin" | "cos" | "tan" | "log" | "ln" | "sqrt") => {
    playPopSound();
    setExpression((prev) => {
      const base = lastWasEqual ? "" : prev;
      const needsMul = base && /[0-9πe)]$/.test(base);
      const prefix = needsMul ? `${base}×` : base;
      return `${prefix}${funcName}(`;
    });
    if (lastWasEqual) {
      setLastWasEqual(false);
    }
  };

  const handleConstantClick = (constant: "π" | "e") => {
    playPopSound();
    setExpression((prev) => {
      const base = lastWasEqual ? "" : prev;
      const needsMul = base && /[0-9πe)]$/.test(base);
      const prefix = needsMul ? `${base}×` : base;
      return `${prefix}${constant}`;
    });
    if (lastWasEqual) {
      setLastWasEqual(false);
    }
  };

  const handleFactorialClick = () => {
    playPopSound();
    setExpression((prev) => (lastWasEqual ? `${result}!` : `${prev}!`));
    setLastWasEqual(false);
  };

  const handleEqual = () => {
    playPopSound();
    if (!expression.trim()) {
      return;
    }
    try {
      const value = evaluateExpression(expression, angleMode);
      const formatted = formatResult(value);
      setResult(formatted);
      setHistory((prev) =>
        [
          { expression, result: formatted, timestamp: Date.now() },
          ...prev,
        ].slice(0, 20),
      );
    } catch {
      setResult("Error");
    }
    setLastWasEqual(true);
  };

  const toggleAngleMode = () => {
    playPopSound();
    setAngleMode((prev) => (prev === "DEG" ? "RAD" : "DEG"));
  };

  const handleMemoryPlus = () => {
    playPopSound();
    const current = parseFloat(result);
    if (Number.isNaN(current)) {
      return;
    }
    setMemory((prev) => (prev ?? 0) + current);
  };

  const handleMemoryMinus = () => {
    playPopSound();
    const current = parseFloat(result);
    if (Number.isNaN(current)) {
      return;
    }
    setMemory((prev) => (prev ?? 0) - current);
  };

  const handleMemoryRecall = () => {
    playPopSound();
    if (memory == null) {
      return;
    }
    const value = formatResult(memory);
    setExpression(value);
    setResult(value);
    setLastWasEqual(true);
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    playPopSound();
    setExpression(item.expression);
    setResult(item.result);
    setLastWasEqual(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 w-full max-w-5xl px-4 py-8 md:py-10">
        <div className="flex items-center justify-between mb-4 md:mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 border border-accent/40 text-accent shadow-lg shadow-accent/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan">
                KALKULATOR SCIENTIFIC
              </h1>
              <p className="text-xs md:text-sm text-white/60 font-body">
                Mode saintifik modern dengan dukungan fungsi trigonometri, logaritma, memori, dan riwayat.
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end text-xs text-white/50 font-mono">
            <span className="uppercase tracking-wide">Mode Sudut</span>
            <span className="text-accent font-semibold">{angleMode}</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] items-start">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
            <div className="mb-4 md:mb-6 rounded-xl bg-black/60 border border-white/10 px-3 py-3 md:px-4 md:py-4 text-right font-mono">
              <div className="text-[11px] md:text-xs text-white/60 truncate min-h-[1.1em]">
                {expression || "0"}
              </div>
              <div className="mt-1 md:mt-2 text-2xl md:text-3xl text-white font-semibold break-all min-h-[1.4em]">
                {result}
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 p-1 text-xs md:text-sm">
                <button
                  type="button"
                  onClick={toggleAngleMode}
                  className={`px-3 py-1 rounded-full transition-all ${
                    angleMode === "DEG"
                      ? "bg-primary text-black shadow-[0_0_18px_rgba(56,189,248,0.9)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  DEG
                </button>
                <button
                  type="button"
                  onClick={toggleAngleMode}
                  className={`px-3 py-1 rounded-full transition-all ${
                    angleMode === "RAD"
                      ? "bg-primary text-black shadow-[0_0_18px_rgba(56,189,248,0.9)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  RAD
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] md:text-xs">
                <button
                  type="button"
                  onClick={handleMemoryPlus}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-emerald-500/40 font-semibold cursor-pointer"
                >
                  M+
                </button>
                <button
                  type="button"
                  onClick={handleMemoryMinus}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-rose-300 border border-rose-500/40 font-semibold cursor-pointer"
                >
                  M-
                </button>
                <button
                  type="button"
                  onClick={handleMemoryRecall}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-sky-300 border border-sky-500/40 font-semibold cursor-pointer"
                >
                  MR
                </button>
                <span className="ml-1 text-white/40 font-mono hidden sm:inline">
                  {memory != null ? `M: ${formatResult(memory)}` : "M: 0"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-sm md:text-base">
              <button
                type="button"
                onClick={handleClearAll}
                className="h-10 md:h-11 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold border border-rose-500/50 cursor-pointer active:scale-[0.97] transition-all"
              >
                AC
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-10 md:h-11 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold border border-amber-500/50 cursor-pointer active:scale-[0.97] transition-all"
              >
                DEL
              </button>
              <button
                type="button"
                onClick={() => handleParenClick("(")}
                className="h-10 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer active:scale-[0.97] transition-all"
              >
                (
              </button>
              <button
                type="button"
                onClick={() => handleParenClick(")")}
                className="h-10 md:h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white cursor-pointer active:scale-[0.97] transition-all"
              >
                )
              </button>

              <button
                type="button"
                onClick={() => handleFunctionClick("sin")}
                className="h-10 md:h-11 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                sin
              </button>
              <button
                type="button"
                onClick={() => handleFunctionClick("cos")}
                className="h-10 md:h-11 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                cos
              </button>
              <button
                type="button"
                onClick={() => handleFunctionClick("tan")}
                className="h-10 md:h-11 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                tan
              </button>
              <button
                type="button"
                onClick={handleFactorialClick}
                className="h-10 md:h-11 rounded-xl bg-accent/20 hover:bg-accent/30 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                !
              </button>

              <button
                type="button"
                onClick={() => handleFunctionClick("log")}
                className="h-10 md:h-11 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                log
              </button>
              <button
                type="button"
                onClick={() => handleFunctionClick("ln")}
                className="h-10 md:h-11 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                ln
              </button>
              <button
                type="button"
                onClick={() => handleFunctionClick("sqrt")}
                className="h-10 md:h-11 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                √
              </button>
              <button
                type="button"
                onClick={() => handleOperatorClick("÷")}
                className="h-10 md:h-11 rounded-xl bg-accent/25 hover:bg-accent/35 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                ÷
              </button>

              <button
                type="button"
                onClick={() => handleConstantClick("π")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                π
              </button>
              <button
                type="button"
                onClick={() => handleConstantClick("e")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                e
              </button>
              <button
                type="button"
                onClick={() => handleOperatorClick("^")}
                className="h-10 md:h-11 rounded-xl bg-accent/25 hover:bg-accent/35 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                xʸ
              </button>
              <button
                type="button"
                onClick={() => handleOperatorClick("×")}
                className="h-10 md:h-11 rounded-xl bg-accent/25 hover:bg-accent/35 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                ×
              </button>

              <button
                type="button"
                onClick={() => handleNumberClick("7")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                7
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("8")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                8
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("9")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                9
              </button>
              <button
                type="button"
                onClick={() => handleOperatorClick("-")}
                className="h-10 md:h-11 rounded-xl bg-accent/25 hover:bg-accent/35 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                −
              </button>

              <button
                type="button"
                onClick={() => handleNumberClick("4")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                4
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("5")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                5
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("6")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                6
              </button>
              <button
                type="button"
                onClick={() => handleOperatorClick("+")}
                className="h-10 md:h-11 rounded-xl bg-accent/25 hover:bg-accent/35 text-accent font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => handleNumberClick("1")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("2")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                2
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("3")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                3
              </button>
              <button
                type="button"
                onClick={handleEqual}
                className="h-10 md:h-11 rounded-xl bg-emerald-500/80 hover:bg-emerald-400 text-black font-semibold cursor-pointer active:scale-[0.97] transition-all shadow-[0_0_24px_rgba(16,185,129,0.9)]"
              >
                =
              </button>

              <button
                type="button"
                onClick={() => handleNumberClick("0")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all col-span-2"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDotClick}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                .
              </button>
              <button
                type="button"
                onClick={() => handleNumberClick("00")}
                className="h-10 md:h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer active:scale-[0.97] transition-all"
              >
                00
              </button>
            </div>
          </div>

          <div className="bg-black/35 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 max-h-[360px] md:max-h-[430px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-sm md:text-base text-white/80">
                Riwayat Perhitungan
              </h2>
              <span className="text-[10px] md:text-xs text-white/40 font-mono">
                {history.length} entri
              </span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2">
              {history.length === 0 ? (
                <p className="text-xs md:text-sm text-white/45 font-body">
                  Belum ada riwayat. Lakukan perhitungan dan hasilnya akan muncul di sini.
                </p>
              ) : (
                history.map((item) => (
                  <button
                    key={item.timestamp}
                    type="button"
                    onClick={() => handleHistoryItemClick(item)}
                    className="w-full text-left rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 cursor-pointer transition-colors"
                  >
                    <div className="text-[10px] md:text-xs text-white/50 font-mono truncate">
                      {item.expression}
                    </div>
                    <div className="text-sm md:text-base text-emerald-300 font-semibold font-mono">
                      = {item.result}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              navigate("/menu");
            }}
            className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body"
          >
            ← Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default KalkulatorScientificPage;
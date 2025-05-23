// components/ui/button.tsx

type Variant = "default" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string; // ✅ Agrega esta línea
}

const base = "rounded px-4 py-2 font-semibold transition";
const styles: Record<Variant, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
};

export function Button({ children, onClick, variant = "default", className = "" }: ButtonProps) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

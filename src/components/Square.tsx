import { cn } from "@/lib/utils";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button
      className={cn(
        "w-20 h-20 text-4xl font-bold rounded-lg transition-all duration-200",
        "hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        value === "X" ? "text-indigo-600" : "text-purple-600",
        "bg-white border-2 border-indigo-200",
        "flex items-center justify-center"
      )}
      onClick={onClick}
    >
      {value === "O" ? (
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
          alt="O"
          className="w-12 h-12 object-contain rounded-full"
        />
      ) : (
        value
      )}
    </button>
  );
};
import TicTacToe from "@/components/TicTacToe";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Removed the title */}
      <TicTacToe />
    </div>
  );
};

export default Index;
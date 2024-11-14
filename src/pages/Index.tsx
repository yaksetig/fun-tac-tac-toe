import TicTacToe from "@/components/TicTacToe";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-[400px] h-[580px] flex items-center justify-center">
        <TicTacToe />
      </div>
    </div>
  );
};

export default Index;
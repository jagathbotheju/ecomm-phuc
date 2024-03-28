import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center container mx-auto mt-20 h-screen">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loading;

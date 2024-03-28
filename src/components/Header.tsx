import { Separator } from "./ui/separator";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className="fle flex-col">
      <h1 className="text-3xl font-bold text-slate-700">{title}</h1>
      <Separator className="my-4 mr-4 mb-8" />
    </div>
  );
};

export default Header;

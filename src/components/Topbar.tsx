import Image from "next/image";
import LeftDrawer from "./LeftDrawer";
import NavLinks from "./NavLinks";

const Topbar = () => {
  return (
    <div className="sticky top-0 z-20 w-full justify-between items-center px-8 py-4 bg-blue-200 shadow-xl flex">
      <div className="px-10 py-4 flex shrink-0 relative">
        <Image src="/images/logo.png" alt="logo" width={150} height={75} />
      </div>

      <div className="gap-4 text-slate-700 hidden md:flex">
        <NavLinks />
      </div>
      <LeftDrawer />
    </div>
  );
};

export default Topbar;

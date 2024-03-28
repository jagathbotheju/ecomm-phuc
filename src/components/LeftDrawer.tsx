import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import NavLinks from "./NavLinks";

const LeftDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="flex md:hidden cursor-pointer text-blue-700" />
      </SheetTrigger>
      <SheetContent className="bg-blue-100 w-fit">
        <SheetHeader>
          <div className="px-10 py-4 shrink-0 flex">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={150}
              height={75}
              className="shrink-0"
            />
          </div>
        </SheetHeader>
        <NavLinks asDrawer />
      </SheetContent>
    </Sheet>
  );
};

export default LeftDrawer;

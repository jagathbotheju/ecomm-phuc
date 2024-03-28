"use client";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  asDrawer?: boolean;
}

const NavLinks = ({ asDrawer = false }: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex gap-4 text-slate-700",
        asDrawer ? "flex-col" : "flex"
      )}
    >
      {navLinks.map((link) => (
        <Link
          href={link.url}
          key={link.label}
          className={cn(
            "flex gap-4 px-6 py-2 font-semibold",
            pathname === link.url && "text-blue-500"
          )}
        >
          {asDrawer && link.icon} <p>{link.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

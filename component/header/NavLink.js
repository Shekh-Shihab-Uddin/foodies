"use client";
import { usePathname } from "next/navigation";
import s from "./navlink.module.css";
import Link from "next/link";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <>
      <li>
        <Link
          href={href}
          className={path.endsWith(href) ? s.active : undefined}
        >
          {children}
        </Link>
      </li>
    </>
  );
};

export default NavLink;

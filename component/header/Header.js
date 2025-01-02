import logoImage from "@/assets/logo.png";
import Link from "next/link";
import s from "./header.module.css";
import Image from "next/image";
import HeaderBackground from "./Header-background";
import NavLink from "./NavLink";
const Header = () => {
  return (
    <>
      <HeaderBackground />
      <header className={s.header}>
        <Link className={s.logo} href="/">
          <Image priority src={logoImage} alt="Logo" />
          Foods & Foodies
        </Link>
        <nav className={s.nav}>
          <ul>
            <NavLink href="/meals">Browse Meals</NavLink>
            <NavLink href="/community">Our Community</NavLink>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

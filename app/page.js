import Link from "next/link";
import s from "./page.module.css";
import ImageSlideshow from "@/component/images/ImageSlideshow";

export default function Home() {
  return (
    <>
      <header className={s.header}>
        <div className={s.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={s.hero}>
            <h1>Delicious Food for Your Cravings</h1>
            <p>Taste, share and explore food all around.</p>
          </div>
          <div className={s.cta}>
            <Link href="/community">Join our Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={s.section}>
          <h2>How it works</h2>
          <p>
            Foods for Foodies is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            Foods for Foodies is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={s.section}>
          <h2>Why Foods for Foodies?</h2>
          <p>
            Foods for Foodies is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            Foods for Foodies is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}

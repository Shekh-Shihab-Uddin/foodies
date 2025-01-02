import Link from "next/link";
import s from "./page.module.css";
import MealsGrid from "@/component/meals/MealsGrid";
import { MealsAPI } from "@/lib/mealsAPi";
import { Suspense } from "react";

export const metadata = {
  title: "Meals",
  description: "All delicious meals shared by community.",
};

async function Meals() {
  const meals = await MealsAPI.fetchAllMeal();
  return <MealsGrid meals={meals} />;
}

const MealsPage = () => {
  return (
    <>
      <header className={s.header}>
        <h1>
          Delicious meals prapared <span className={s.highlight}>by you</span>
        </h1>
        <p>Discover new recipes, get inspired by others and try yourself.</p>
        <p className={s.cta}>
          <Link href="/meals/share">Share your recipe</Link>
        </p>
      </header>
      <main className={s.main}></main>
      <Suspense fallback={<h1 className={s.loading}>Loading data...</h1>}>
        <Meals />
      </Suspense>
    </>
  );
};

export default MealsPage;

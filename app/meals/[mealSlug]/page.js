import Image from "next/image";
import s from "./page.module.css";
import { MealsAPI } from "@/lib/mealsAPi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = await MealsAPI.fetchMealBySlug(params.mealSlug);
  if (meal === "No meal found with the given slug") {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealSlug = async ({ params }) => {
  const slug = (await params).mealSlug;
  const meal = await MealsAPI.fetchMealBySlug(slug);

  if (meal === "No meal found with the given slug") {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\\n/g, "<br/>");

  return (
    <>
      <header className={s.header}>
        <div className={s.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={s.headerText}>
          <h1>{meal.title}</h1>
          <p className={s.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={s.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <pre>
          <p
            className={s.instructions}
            dangerouslySetInnerHTML={{ __html: meal.instructions }}
          ></p>
        </pre>
      </main>
    </>
  );
};

export default MealSlug;

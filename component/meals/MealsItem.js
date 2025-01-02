import Image from "next/image";
import s from "./mealsItem.module.css";
const MealsItem = ({ title, slug, image, summary, creator }) => {
  return (
    <>
      <article className={s.meal}>
        <header>
          <div className={s.image}>
            <Image src={image} alt={title} fill />
          </div>
          <div className={s.headerText}>
            <h2>{title}</h2>
            <p>by {creator}</p>
          </div>
        </header>
        <div className={s.content}>
          <p className={s.summary}>{summary}</p>
          <div className={s.actions}>
            <a href={`/meals/${slug}`}>Read more</a>
          </div>
        </div>
      </article>
    </>
  );
};

export default MealsItem;

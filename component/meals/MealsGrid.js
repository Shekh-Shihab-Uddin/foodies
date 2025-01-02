import s from "./mealsGrid.module.css";
import MealsItem from "./MealsItem";
const MealsGrid = ({ meals }) => {
  return (
    <>
      <ul className={s.meals}>
        {meals.map((meal) => {
          return (
            <li key={meal.id}>
              <MealsItem {...meal} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MealsGrid;

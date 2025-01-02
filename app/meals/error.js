"use client";
import s from "./error.module.css";
const error = () => {
  return (
    <div className={s.error}>
      <h1>Error</h1>
      <p>An error occurred. Please try again later.</p>
    </div>
  );
};

export default error;

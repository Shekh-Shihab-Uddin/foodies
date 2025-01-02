"use server";
import { redirect } from "next/navigation";
import { MealsAPI } from "./mealsAPi";
import { revalidatePath } from "next/cache";

export const submitMeal = async (prevState, formData) => {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    instructions: formData.get("instructions"),
    summary: formData.get("summary"),
    title: formData.get("title"),
    image: formData.get("image"),
  };

  const isInvalidText = (text) => {
    if (!text && text.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

  const isInvalidImage = (image) => {
    if (!image || 512000 < image.size === 0) {
      return true;
    }
    return false;
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@")
  ) {
    return { message: "All fields are required" };
  }

  if (isInvalidImage(meal.image)) {
    return { message: "Please select an image (Max 0.5 MB)" };
  }

  const addedMeal = await MealsAPI.addMeal(meal);
  revalidatePath("/meals");
  redirect(`/meals/${addedMeal.slug}`);
};

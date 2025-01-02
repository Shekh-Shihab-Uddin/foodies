import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore, storage } from "./fbConfig";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export class MealsAPI {
  static async fetchAllMeal() {
    try {
      const q = query(collection(firestore, "meals"));
      const response = await getDocs(q);
      return response.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          slug: doc.data().slug,
          image: doc.data().image,
          summary: doc.data().summary,
          instructions: doc.data().instructions,
          creator: doc.data().creator,
          creator_email: doc.data().creator_email,
        };
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw new Error("Failed to fetch meals");
    }
  }

  static async fetchMealBySlug(slug) {
    try {
      const q = query(
        collection(firestore, "meals"),
        where("slug", "==", slug)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return "No meal found with the given slug";
      } else {
        const meal = querySnapshot.docs[0];
        return {
          id: meal.id,
          title: meal.data().title,
          slug: meal.data().slug,
          image: meal.data().image,
          summary: meal.data().summary,
          instructions: meal.data().instructions,
          creator: meal.data().creator,
          creator_email: meal.data().creator_email,
        };
      }
    } catch (error) {
      console.error("Error getting document by slug: ", error);
      throw new Error("Failed to fetch meal by slug");
    }
  }

  static async addMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}-${Date.now()}.${extension}`;
    const bufferedImage = await meal.image.arrayBuffer();

    //for storing inlocal storage
    // const stream = fs.createWriteStream(`public/images/${fileName}`);
    // stream.write(Buffer.from(bufferedImage), (error) => {
    //   if (error) {
    //     throw new Error(`${error.message}`);
    //   }
    // });
    // meal.image = `/images/${fileName}`;

    // Storing in firebase storage
    const storageRef = ref(storage, `images/${fileName}`);
    const imageBlob = new Blob([bufferedImage], {
      type: "image/png, image/jpg, image/jpeg",
    });
    try {
      const snapshot = await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      if (!downloadURL) {
        throw new Error(`Error adding meal`);
      }
      meal.image = downloadURL;

      const response = await addDoc(collection(firestore, "meals"), meal);

      return {
        id: response.id,
        ...meal,
      };
    } catch (error) {
      console.error("Error adding meal:", error);
      throw error;
    }
  }
}

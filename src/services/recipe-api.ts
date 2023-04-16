import axios from "axios";
import { IRecipe } from "../shared/recipe-types";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getRecipes = async (): Promise<IRecipe[]> => {
  try {
    const recipes: IRecipe[] = (await instance.get("/recipes")).data;
    return recipes;

    // console.log(recipes)
  } catch (error) {
    console.log(error);
    return [];
  }
};

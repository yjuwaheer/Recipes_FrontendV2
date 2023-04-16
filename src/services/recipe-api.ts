import axios from "axios";
import { IRecipe } from "../shared/recipe-types";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getRecipes = async (page: string, sort: string): Promise<IRecipe[]> => {
  try {
    const recipes: IRecipe[] = (await instance.get(`/recipes?page=${page}&sort=${sort}`)).data;
    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

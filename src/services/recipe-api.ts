import axios from "axios";
import { IRecipe } from "../shared/recipe-types";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getRecipes = async (
  page: string,
  sort: string
): Promise<IRecipe[]> => {
  try {
    const recipes: IRecipe[] = (
      await instance.get(`/recipes?page=${page}&sort=${sort}`)
    ).data;
    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRecipe = async (id: string): Promise<IRecipe | null> => {
  try {
    const recipe: IRecipe = (await instance.get(`/recipes/${id}`)).data;
    return recipe;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchRecipes = async (
  search: string
): Promise<IRecipe[] | null> => {
  try {
    const recipe: IRecipe[] = (await instance.get(`/recipes/search?search=${search}`))
      .data;
    return recipe;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export interface IRecipe {
  id?: number;
  title: string;
  ingredients: string[];
  instructions: { type: string; text: string }[];
  times: string[];
  image: string;
}

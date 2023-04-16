import { useEffect, useState } from "react";
import { Container, Flex, Select, Grid } from "@mantine/core";
import { getRecipes } from "../services/recipe-api";
import Search from "../components/Search";
import { IRecipe } from "../shared/recipe-types";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>();
  const [sort, setSort] = useState<string | null>("0"); // 1 ? Descending : Ascending

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <Container>
      <Search />

      <Flex mb={30}>
        <Select
          label="Sort number of ingredients from"
          placeholder="low to high"
          data={[
            { value: "0", label: "low to high" },
            { value: "1", label: "high to low" },
          ]}
          value={sort}
          onChange={(value) => setSort(value)}
        />
      </Flex>

      <Grid columns={3}>
        {recipes?.map((recipe: IRecipe) => (
          <Grid.Col span={1} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Flex, Title, Box } from "@mantine/core";
import SearchBox from "../components/SearchBox";
import { searchRecipes } from "../services/recipe-api";
import { IRecipe } from "../shared/recipe-types";
import RecipeCard from "../components/RecipeCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);
  const [searching, setSearching] = useState<boolean>(true);

  useEffect(() => {
    handleSearchRecipes();
  }, [searchParams]);

  const handleSearchRecipes = async () => {
    const searchValue = searchParams.get("search");

    if (searchValue) {
      const data = await searchRecipes(searchValue);
      setRecipes(data);
      setSearching(false);
    }
  };

  return (
    <Container>
      <SearchBox />

      <Title my={10} color="dimmed">
        Search results for `{searchParams.get("search")}`
      </Title>

      <Flex wrap="wrap" justify="center" gap={10} mb={10}>
        {recipes?.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Flex>

      {!searching && recipes?.length === 0 && (
        <Flex bg="yellow.0" p={10} justify="center" mt={10}>
          <Title order={2} color="yellow.5">
            No recipes found
          </Title>
        </Flex>
      )}
    </Container>
  );
};

export default Search;

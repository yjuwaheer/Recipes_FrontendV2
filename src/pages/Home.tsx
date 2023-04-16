import { useEffect, useState } from "react";
import { Container, Flex, Select, Grid, Button } from "@mantine/core";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { getRecipes } from "../services/recipe-api";
import Search from "../components/Search";
import { IRecipe } from "../shared/recipe-types";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<IRecipe[]>();
  const [page, setPage] = useState<string | null>(searchParams.get("page"));
  const [sort, setSort] = useState<string | null>(searchParams.get("sort")); // 1 ? Descending : Ascending
  const [prevDisabled, setPrevDisabled] = useState<boolean>(true);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (page && page !== "1") {
      setPrevDisabled(false);
    }

    fetchRecipes();
  }, [page, sort]);

  const fetchRecipes = async () => {
    const data = await getRecipes(page ? page : "1", sort ? sort : "0");
    setRecipes(data);
  };

  const handlePagination = (direction: string) => {
    const currentPage = page ? Number(page) : 1;
    const nextPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    setPage(nextPage.toString());

    nextPage === 1 ? setPrevDisabled(true) : setPrevDisabled(false);

    navigate({
      search: createSearchParams({
        page: nextPage.toString(),
        sort: sort === null ? "0" : sort.toString(),
      }).toString(),
    });
  };

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
          onChange={(value: string) => setSort(value)}
        />
      </Flex>

      <Grid columns={3} mb={30}>
        {recipes?.map((recipe: IRecipe) => (
          <Grid.Col span={1} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>

      <Flex mb={30} justify="center" gap={50}>
        <Button
          w={150}
          disabled={prevDisabled}
          onClick={() => handlePagination("prev")}
        >
          Previous
        </Button>
        <Button
          w={150}
          disabled={nextDisabled}
          onClick={() => handlePagination("next")}
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
};

export default Home;

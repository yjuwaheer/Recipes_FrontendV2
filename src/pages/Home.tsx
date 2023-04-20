import { useEffect, useState } from "react";
import { Container, Flex, Select, Skeleton, Button, Text } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  Link,
} from "react-router-dom";
import { getRecipes } from "../services/recipe-api";
import { IRecipe } from "../shared/recipe-types";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
  });
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

    scrollIntoView({
      alignment: "center",
    });
  };

  return (
    <Container>
      <SearchBox />

      <Link to="/random">
        <Text underline align="center" color="green">
          Get a random recipe
        </Text>
      </Link>

      <Flex mb={10} ref={targetRef}>
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

      <Flex mb={10} justify="end" gap={10}>
        <Button
          disabled={prevDisabled}
          onClick={() => handlePagination("prev")}
          color="green.4"
        >
          <AiOutlineArrowLeft />
        </Button>
        <Button
          disabled={nextDisabled}
          onClick={() => handlePagination("next")}
          color="green.4"
        >
          <AiOutlineArrowRight />
        </Button>
      </Flex>

      <Flex mb={30} wrap="wrap" justify="center" gap={10}>
        {recipes?.map((recipe: IRecipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}

        {!recipes &&
          [...Array(9)].map((x, i) => (
            <Skeleton
              height={300}
              radius="md"
              maw={{ 300: "100%", sm: 300 }}
              key={`key-${i}`}
            />
          ))}
      </Flex>

      <Flex mb={30} justify="center" gap={25}>
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

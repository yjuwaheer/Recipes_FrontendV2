import { useState, useEffect } from "react";
import {
  Container,
  Image,
  Title,
  Box,
  List,
  Paper,
  Button,
} from "@mantine/core";
import { getRandomRecipe } from "../services/recipe-api";
import { IRecipe } from "../shared/recipe-types";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";

const Random = () => {
  const [recipe, setRecipe] = useState<IRecipe>();

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const fetchRandomRecipe = async () => {
    const data = await getRandomRecipe();
    setRecipe(data[0]);
  };

  return (
    <Container>
      <Button
        mb={10}
        leftIcon={<FaRandom />}
        onClick={() => fetchRandomRecipe()}
      >
        Randomize
      </Button>

      {recipe && (
        <>
          <Image src={recipe.image} radius="md" height={350} alt="Broken Image :-(" />

          <Title my={10}>{recipe.title}</Title>

          <Box mb={15}>
            <Title mb={5} order={4} color="dimmed">
              Ingredients
            </Title>
            <List icon={<BiRightArrowAlt size={12} />}>
              {recipe.ingredients.map((ing) => (
                <List.Item key={ing}>{ing}</List.Item>
              ))}
            </List>
          </Box>

          <Box mb={15}>
            <Title mb={5} order={4} color="dimmed">
              Instructions
            </Title>
            {recipe.instructions.map((ins) => (
              <Paper shadow="sm" p="sm" my={10} withBorder key={ins.text}>
                {ins.text}
              </Paper>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Random;

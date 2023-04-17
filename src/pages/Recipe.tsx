import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Flex, Title, List, Box, Paper } from "@mantine/core";
import { IRecipe } from "../shared/recipe-types";
import { getRecipe } from "../services/recipe-api";
import { BiRightArrowAlt } from "react-icons/bi";

const Recipe = () => {
  const { id } = useParams();
  const [image, setImage] = useState<string | undefined>("");
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    if (id) {
      const data = await getRecipe(id);
      setRecipe(data);
      setImage(data?.image);
    }
  };

  return (
    <Container>
      {recipe && (
        <Flex direction="column">
          <Image
            height={300}
            mx="auto"
            radius="md"
            src={image}
            alt={recipe.title}
            onError={() => {
              setImage(
                "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              );
            }}
          />

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
        </Flex>
      )}
    </Container>
  );
};

export default Recipe;

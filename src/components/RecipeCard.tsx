import { Card, Image, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IRecipe } from "../shared/recipe-types";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      miw={{ 300: "100%", sm: 300 }}
    >
      <Card.Section>
        <Image src={recipe.image} height={160} alt="Broken image" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>
          {recipe.title.length > 25
            ? `${recipe.title.substring(0, 25)}...`
            : recipe.title}
        </Text>
      </Group>

      <Text size="sm" color="dimmed">
        {recipe.ingredients[0].substring(0, 20)}...
      </Text>

      <Button
        variant="light"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigate(`/recipes/${recipe.id}`)}
      >
        View Recipe
      </Button>
    </Card>
  );
};

export default RecipeCard;

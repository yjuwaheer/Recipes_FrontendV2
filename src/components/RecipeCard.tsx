import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { IRecipe } from "../shared/recipe-types";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={300}>
      <Card.Section>
        <Image src={recipe.image} height={160} alt="Recipe image" />
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

      <Button variant="light" fullWidth mt="md" radius="md">
        View Recipe
      </Button>
    </Card>
  );
};

export default RecipeCard;

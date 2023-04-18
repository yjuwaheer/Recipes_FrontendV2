import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Flex,
  Input,
  Title,
  Paper,
} from "@mantine/core";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [singleIngr, setSingleIngr] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [singleIns, setSingleIns] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [singleTime, setSingleTime] = useState<string>("");
  const [times, setTimes] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleAdd = (field: string) => {
    switch (field) {
      case "ing":
        ingredients.push(singleIngr);
        setSingleIngr("");
        break;
      case "ins":
        instructions.push(singleIns);
        setSingleIns("");
        break;
      case "time":
        times.push(singleTime);
        setSingleTime("");
        break;
      default:
        break;
    }
  };

  const handleRemove = (field: string, value: string) => {
    let tempArray;

    switch (field) {
      case "ing":
        tempArray = ingredients;
        tempArray = tempArray.filter((ing) => ing !== value);
        setIngredients(tempArray);
      case "ins":
        tempArray = instructions;
        tempArray = tempArray.filter((ins) => ins !== value);
        setInstructions(tempArray);
      case "time":
        tempArray = times;
        tempArray = tempArray.filter((time) => time !== value);
        setTimes(tempArray);
      default:
        break;
    }
  };

  return (
    <Container>
      <Flex direction="column">
        <Title mb={10}>Add a new Recipe</Title>

        <Card shadow="sm" padding="lg" radius="md" withBorder mb={20}>
          <Input
            placeholder="Title *"
            mb={10}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Ingredients */}
          <Flex mb={10} gap={10}>
            <Input
              placeholder="Ingredients *"
              w="90%"
              value={singleIngr}
              onChange={(e) => setSingleIngr(e.target.value)}
            />
            <Button
              w="10%"
              color="green.3"
              disabled={singleIngr === ""}
              onClick={() => {
                handleAdd("ing");
              }}
            >
              <GrAdd />
            </Button>
          </Flex>
          {ingredients.length > 0 && (
            <Flex mb={10} direction="column">
              {ingredients.map((ing) => (
                <Flex gap={10} key={ing}>
                  <Paper p={5} mb={5} withBorder shadow="md" w="90%">
                    {ing}
                  </Paper>
                  <Button
                    color="red.6"
                    w="10%"
                    onClick={() => {
                      handleRemove("ing", ing);
                    }}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </Flex>
              ))}
            </Flex>
          )}

          {/* Instructions */}
          <Flex mb={10} gap={10}>
            <Input
              placeholder="Instructions *"
              w="90%"
              value={singleIns}
              onChange={(e) => setSingleIns(e.target.value)}
            />
            <Button
              w="10%"
              color="green.3"
              disabled={singleIns === ""}
              onClick={() => {
                handleAdd("ins");
              }}
            >
              <GrAdd />
            </Button>
          </Flex>
          {instructions.length > 0 && (
            <Flex mb={10} direction="column">
              {instructions.map((ins) => (
                <Flex gap={10} key={ins}>
                  <Paper p={5} mb={5} withBorder shadow="md" w="90%">
                    {ins}
                  </Paper>
                  <Button
                    color="red.6"
                    w="10%"
                    onClick={() => {
                      handleRemove("ins", ins);
                    }}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </Flex>
              ))}
            </Flex>
          )}

          {/* Times */}
          <Flex mb={10} gap={10}>
            <Input
              placeholder="Times"
              w="90%"
              value={singleTime}
              onChange={(e) => setSingleTime(e.target.value)}
            />
            <Button
              w="10%"
              color="green.3"
              disabled={singleTime === ""}
              onClick={() => {
                handleAdd("time");
              }}
            >
              <GrAdd />
            </Button>
          </Flex>
          {times.length > 0 && (
            <Flex mb={10} direction="column">
              {times.map((time) => (
                <Flex gap={10} key={time}>
                  <Paper p={5} mb={5} withBorder shadow="md" w="90%">
                    {time}
                  </Paper>
                  <Button
                    color="red.6"
                    w="10%"
                    onClick={() => {
                      handleRemove("time", time);
                    }}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </Flex>
              ))}
            </Flex>
          )}

          <Input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Card>

        <Flex justify="center">
          <Button
            disabled={
              title === "" ||
              ingredients.length === 0 ||
              instructions.length === 0
            }
          >
            Add Recipe
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Create;

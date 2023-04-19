import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Modal, Input, Flex, Paper, Button } from "@mantine/core";
import { IRecipe } from "../shared/recipe-types";
import { updateRecipe } from "../services/recipe-api";
import { GrAdd } from "react-icons/gr";
import { RiDeleteBin7Fill } from "react-icons/ri";

const EditModal = ({
  opened,
  close,
  recipe,
  fetchRecipe,
}: {
  opened: boolean;
  close: () => void;
  recipe: IRecipe;
  fetchRecipe: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [singleIngr, setSingleIngr] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [singleIns, setSingleIns] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [singleTime, setSingleTime] = useState<string>("");
  const [times, setTimes] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(
      recipe.instructions.map((ins) => {
        return ins.text;
      })
    );
    setTimes(recipe.times);
    setImageUrl(recipe.image);
  }, [opened]);

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

  const handleUpdateRecipe = async () => {
    const constructInstructions: { type: string; text: string }[] =
      instructions.map((ins) => {
        return { type: "HowToStep", text: ins };
      });

    const newRecipe = {
      title,
      ingredients,
      instructions: constructInstructions,
      times,
      image: imageUrl,
    };

    if (recipe.id) {
      const response = await updateRecipe(recipe.id, newRecipe);

      if (response) {
        resetFields();
        fetchRecipe();
        close();
      }
    }
  };

  const resetFields = () => {
    setTitle("");
    setIngredients([]);
    setInstructions([]);
    setTimes([]);
    setImageUrl("");
    setSingleIngr("");
    setSingleIns("");
    setSingleTime("");
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Recipe" size="xl">
      <Input.Wrapper label="TITLE">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={10}
          placeholder="Add Title"
        />
      </Input.Wrapper>

      <Input.Wrapper label="INGREDIENTS">
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

        <Flex direction="column">
          {ingredients.length > 0 &&
            ingredients.map((ing) => (
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
      </Input.Wrapper>

      <Input.Wrapper label="INSTRUCTIONS">
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

        <Flex direction="column">
          {instructions.length > 0 &&
            instructions.map((ins) => (
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
      </Input.Wrapper>

      <Input.Wrapper label="TIMES">
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

        <Flex direction="column">
          {times.length > 0 &&
            times.map((time) => (
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
      </Input.Wrapper>

      <Input.Wrapper label="IMAGE URL">
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          mb={20}
          placeholder="Add Image URL"
        />
      </Input.Wrapper>

      <Flex justify="end" gap={10}>
        <Button onClick={() => handleUpdateRecipe()}>Update</Button>
        <Button color="gray" onClick={close}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};

export default EditModal;

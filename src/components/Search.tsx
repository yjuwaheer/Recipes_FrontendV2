import React from "react";
import { Input, Flex } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <Flex justify="center" mb={10}>
      <Input
        placeholder="Search recipes, ingredients..."
        size="md"
        icon={<AiOutlineSearch />}
        variant="filled"
      />
    </Flex>
  );
};

export default Search;

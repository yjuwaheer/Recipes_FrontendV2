import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Input, Flex, Button } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");

  const handleNavigate = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        search: searchText,
      }).toString(),
    });
  };

  return (
    <Flex justify="center" mb={10} align="center">
      <Input
        placeholder="Search recipes, ingredients..."
        size="md"
        icon={<AiOutlineSearch />}
        variant="filled"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {searchText !== "" && (
        <Button
          size="md"
          ml={5}
          p={8}
          onClick={() => {
            handleNavigate();
          }}
        >
          <AiOutlineSearch size={20} />
        </Button>
      )}
    </Flex>
  );
};

export default SearchBox;

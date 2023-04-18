import { Link } from "react-router-dom";
import { Container, Title, Flex, Button } from "@mantine/core";

const Navbar = () => {
  return (
    <Container py={12}>
      <Flex justify="space-between" align="center">
        <Link to="/">
          <Title order={2}>
            EAT<span style={{ color: "#26cc00" }}>WELL</span>
          </Title>
        </Link>

        <Flex columnGap={10}>
          <Link to="/">
            <Button color="green">Home</Button>
          </Link>
          <Link to="/create">
            <Button color="green">New Recipe</Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;

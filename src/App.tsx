import "./App.css";
import { Divider, Container, Box } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Recipe from "./pages/Recipe";
import Search from "./pages/Search";
import Random from "./pages/Random";

function App() {
  return (
    <div className="App">
      <Router>
        <Box bg="green.0">
          <Navbar />
        </Box>
        <Divider mb={"md"} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/random" element={<Random />} />
          <Route path="*" element={<Container>Error 404</Container>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

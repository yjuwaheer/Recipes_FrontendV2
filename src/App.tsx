import "./App.css";
import { Divider, Container } from "@mantine/core";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Divider mb={"md"} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="*" element={<Container>Error 404</Container>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

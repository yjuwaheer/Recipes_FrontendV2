import "./App.css";
import { Divider, Container } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Divider mb={"md"} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<Container>Error 404</Container>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

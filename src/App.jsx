import React from "react";
import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks"
import Container from "./components/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<Tasks />} />
          <Route exact path="/add-task" element={<AddTasks />}/>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

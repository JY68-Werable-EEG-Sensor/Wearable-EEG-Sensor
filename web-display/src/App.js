import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Graph from "./components/graph/graph";
import History from "./components/history/history";
import NavBar from "./components/navBar/NavBar";

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
              path="/"
              element={<Navigate exact from="/" to="main"></Navigate>}
          ></Route>
          <Route path="/main" element={<Graph />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

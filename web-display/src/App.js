//import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import SidebarNav from "./scenes/global/SidebarNav";
import Dashboard from "./scenes";

/*
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Graph from "./components/graph";
import History from "./components/history";
import NavBar from "./components/NavBar";
*/


function App() {
  const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SidebarNav />
              <main className="content"> 
                <Topbar /> 
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>

    
  );
}

export default App;

/*
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
*/
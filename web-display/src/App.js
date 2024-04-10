//import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material";

import Dashboard from "./scenes/Connect";
import Main from "./scenes/Main"
import History from "./scenes/History"

function App() {
  const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
              <main className="content"> 
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/connect" element={<Dashboard />} />
                  <Route path="/history" element={<History />} />
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
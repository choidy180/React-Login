import React from "react";
import styled, { ThemeProvider,DefaultTheme  } from "styled-components";
import Router from "../Router";

const theme:DefaultTheme = {
  
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    </>
  );
}

export default App;

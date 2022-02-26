import { createContext, useState } from "react";
import React from "react";
const ColorContext = createContext({
  state: { color: "yellow" },
  actions: {
    setColor: () => {},
  }
});

const { Consumer: ColorConsumer } = ColorContext;

export { ColorConsumer };
import { createContext } from "react";
import { Game } from "types/types";

export const GameContext = createContext({
  gameDataToRender: {} as Game,
});

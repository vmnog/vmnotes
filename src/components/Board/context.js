import { createContext } from "react";

export default createContext({
  // valores iniciais que nao sao obrigatorios mas é legal deixar aqui pra ter uma ideia da onde vem o data
  lists: [],
  move: () => {}
});

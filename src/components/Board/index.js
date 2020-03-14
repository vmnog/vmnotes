import React, { useState } from "react";
import { loadLists } from "../../services/api";
import BoardContext from "./context";

import List from "../List";

import { Container } from "./styles";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(from, to) {
    console.log(from, to);
  }

  return (
    // Serve para fornecer um valor para o contexto e os elementos que estao dentro podem acessar esses valores
    // Quando o lists mudar ela vai mudar o contexto que consequentemente muda o valor em todos os lugares do app
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}

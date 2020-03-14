import React, { useState } from "react";
import produce from "immer";
import { loadLists } from "../../services/api";
import BoardContext from "./context";

import List from "../List";

import { Container } from "./styles";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    // immer permite que façamos mudanças no state de forma mais limpa
    // com immer nao precisamos criar um "newList, setNewList"

    //produce gera um draft que é uma copia de lists onde podemos alterar e vai colocar o valor no state
    setLists(
      produce(lists, draft => {
        const dragged = draft[fromList].cards[from];

        // removendo o item que está sendo arrasto da lista (onde fica o dashed border)
        draft[fromList].cards.splice(from, 1);

        // na posicao "to", coloca antes, o item que está sendo arrastado
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    // Serve para fornecer um valor para o contexto e os elementos que estao dentro podem acessar esses valores
    // Quando o lists mudar ela vai mudar o contexto que consequentemente muda o valor em todos os lugares do app
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}

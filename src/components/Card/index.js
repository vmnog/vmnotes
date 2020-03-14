import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Container, Label } from "./styles";

export default function Card({ data, index }) {
  const ref = useRef();

  // o monitor atribui o valor da funcao isDragging que vem do parametro, e type "CARD" pois todo item tem que ter um type unico
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: "CARD",
      index
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // sem primeiro parametro pois só quero a propriedade de referencia
  const [, dropRef] = useDrop({
    // É possivel ser dropado somente itens do tipo "CARD"
    accept: "CARD",
    // item = qual card está sendo arrastado, monitor = monitora os eventos
    hover(item, monitor) {
      console.log(item.index); // posicao  na lista do item sendo arrastado
      console.log(index); // posicao futura do item atual na nova lista
    }
  });

  // Passa para o dragRef a referencia useRef como referencia do objeto a ser dropado com dropRef
  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label color={label} key={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
}

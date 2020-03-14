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
      const draggedIndex = item.index; // card sendo arrastado
      const targetIndex = index; // qual é o alvo que sofrerá alteracoes na posicao da lista

      // se arrastar o item pro mesmo lugar que ele estava antes ele nao faz nada
      if (draggedIndex === targetIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect(); // returns the items dimension and position
      const targetCenter = (targetSize.bottom - targetSize.top) / 2; // returns the items horizontal middle

      // returns how much did the item moved from the original position
      const draggedOffset = monitor.getClientOffset();

      // calcs the empty space that it has when we drag an item out of the list
      const draggedTop = draggedOffset.y - targetSize.top;

      // se um item que esta antes do target tentar ser arrastado pra antes do target
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      // se um item que esta depois do target tentar ser arrastado pra depois do target
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      console.log("aprovado");
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

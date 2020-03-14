import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Container, Label } from "./styles";

import BoardContext from "../Board/context";

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  // o monitor atribui o valor da funcao isDragging que vem do parametro, e type "CARD" pois todo item tem que ter um type unico
  const [{ isDragging }, dragRef] = useDrag({
    // informacoes que precisam ser passadas para que o item quando for arrastado mantenha as informacoes
    item: {
      type: "CARD",
      index,
      listIndex
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
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index; // card sendo arrastado
      const targetIndex = index; // qual é o alvo que sofrerá alteracoes na posicao da lista

      // se arrastar o item pro mesmo lugar que ele estava antes ele nao faz nada
      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect(); // returns the items dimension and position
      const targetCenter = (targetSize.bottom - targetSize.top) / 2; // returns the items horizontal middle

      // returns how much did the item moved from the original position
      const draggedOffset = monitor.getClientOffset();

      // calcs the empty space that it has when we drag an item out of the list
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      // calling function from BoardContext using Card's data
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      // mudando a propriedade de index assim que o item é arrastado para evitar "flick"
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  // Passa para o dragRef a referencia useRef como referencia do objeto a ser dropado com dropRef
  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
}

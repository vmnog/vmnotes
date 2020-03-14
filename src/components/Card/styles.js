import styled, { css } from "styled-components";
// o { css } serve pra quando queremos utilizar multiplos css baseado numa condicao

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 237, 245, 0.4);
  cursor: grab;

  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }

  p {
    font-weight: 500px;
    line-height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }

  ${props =>
    props.isDragging &&
    css`
      /* deixa uma borda dashed no lugar do card */
      border: 2px dashed rgba(0, 0, 0, 0.2);
      padding-top: 31px;

      background: transparent;
      box-shadow: none;
      cursor: grabbing;

      /* some o card que fica na lista, mas continua com a borda dashed */
      p,
      img,
      header {
        opacity: 0;
      }
    `}
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  /* Pega a cor passada pelas props do Component */
  background: ${props => props.color};
`;

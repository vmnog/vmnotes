import styled from "styled-components";

export const Container = styled.div`
  opacity: ${props => (props.done ? "60%" : "100%")};
  padding: 0 15px;
  height: 100%;
  flex-grow: 0; /* estica? */
  flex-shrink: 0; /* encolhe? */
  flex-basis: 320px; /* tamanho base, se baseia no flex direction do elemento pai para saber se é width ou height*/

  /* estiliza toda div que tem uma outra div antes */
  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }

  ul {
    margin-top: 30px;
  }
`;

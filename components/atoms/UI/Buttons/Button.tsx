import styled from "@emotion/styled";

interface ButtonProps {
  width?: string;
  background?: string;
  block?: string;
  inline?: string;
  radius?: string;
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  width: ${(props) => (props.width ? props.width : "100%")};
  border: none;
  padding-block: ${(props) => (props.block ? props.block : "1.1rem")};
  padding-inline: ${(props) => (props.inline ? props.inline : "4.5rem")};

  border-radius: ${(props) => (props.radius ? props.radius : "23px")};

  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;

  cursor: pointer;
`;

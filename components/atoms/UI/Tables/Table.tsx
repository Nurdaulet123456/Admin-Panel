import styled from "@emotion/styled";

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  text-align: left;
`;

export const Thead = styled.thead`
  width: 100%;
  background-color: #4090ff;
`;

export const Th = styled.th`
  padding: 2rem;

  color: white;
  font-weight: 700;
  font-size: 1.6rem;
`;

export const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #e0e0e066;
  }
`;

export const Td = styled.td`
  padding: 2rem;
  font-weight: 400;
  color: #4f4f4f;
  font-size: 1.6rem;

  &:last-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    div {
      cursor: pointer;
    }
  }
`;

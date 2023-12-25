import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TabsClass = () => {
    const router = useRouter()
  return (
    <>
      <TabsClassStyled>
        {Array.from({ length: 50 }, (_, index) => index).map((item) => (
          <Link href={`/schedule/1/${item + 1}А`}>
            <TabClassStyled key={item}>{item + 1} A</TabClassStyled>
          </Link>
        ))}
      </TabsClassStyled>
    </>
  );
};

const TabsClassStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 30px;

  margin-top: 4.7rem;
`;
const TabClassStyled = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  color: #1b447a;
  text-transform: uppercase;
  width: 94px;
  height: 67px;
  border: 1px solid #4090ff;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: #4090ff;
    color: #ffffff;
  }
`;

export default TabsClass;

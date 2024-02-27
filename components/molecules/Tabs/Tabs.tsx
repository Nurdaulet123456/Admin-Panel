import { IdBlock } from "@/components/atoms/UI/Blocks/IdBlock";
import { ITabs } from "@/types/assets.type";
import Link from "next/link";

import { useRouter } from "next/router";
import { FC } from "react";

interface IProps {
  tabs?: ITabs[];
  link?: string;
  handleAddButtonClick?: any;
}

const Tabs: FC<IProps> = ({ tabs, link, handleAddButtonClick }) => {
  const router = useRouter();

  return (
    <>
      {tabs?.map((item) => (
        <Link href={`/${link}/${item.id}`} key={item.id}>
          <IdBlock
            background={
              router?.asPath?.split("/")[2] === String(item.id) ? "#4090FF" : ""
            }
            color={
              router?.asPath?.split("/")[2] === String(item.id) ? "#fff" : ""
            }
            border={
              router?.asPath?.split("/")[2] === String(item.id) ? "white" : ""
            }
            onClick={handleAddButtonClick}
          >
            {item.type}
          </IdBlock>
        </Link>
      ))}
    </>
  );
};

export default Tabs;

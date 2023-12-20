import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import NewsTableBlock from "@/components/molecules/NewsTableBlock";
import NewsTable from "@/components/organisms/NewsTable";
import MainLayouts from "@/layouts/MainLayouts";
import { useState } from "react";

const NewsPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false)
  return (
    <MainLayouts>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1.6rem'}}>
        <Button
          background="#27AE60"
          radius="14px"
          style={{
            width: "auto",
            display: "flex",
            alignItems: "center",
            gap: ".8rem",
          }}
          onClick={() => setShowActive(!showActive)}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {showActive && <NewsTableBlock />}
      
      <NewsTable />
    </MainLayouts>
  );
};

export default NewsPage;

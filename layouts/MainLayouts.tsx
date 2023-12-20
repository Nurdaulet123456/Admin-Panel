import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode } from "react";

interface ILayouts {
  children: ReactNode;
}

const MainLayouts = ({ children }: ILayouts) => {
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
          <div className="main_inner">{children}</div>
      </div>
    </div>
  );
};

export default MainLayouts;

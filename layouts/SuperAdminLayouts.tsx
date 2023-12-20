import SuperAdminSidebar from "@/components/organisms/SuperAdminSidebar";
import { ReactNode } from "react";

interface ILayouts {
  children: ReactNode;
}

const SuperAdminLayouts = ({ children }: ILayouts) => {
  return (
    <div className="container">
      <SuperAdminSidebar />

      <div className="main">
          <div className="main_inner">{children}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayouts;

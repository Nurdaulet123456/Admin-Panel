import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode } from "react";
import { ButtonLogout } from "@/components/atoms/UI/Buttons/Button";
import { LogoutIcons } from "@/components/atoms/Icons";
import { localStorageWrapper } from "@/components/data/storage";
import { useRouter } from "next/router";

interface ILayouts {
  children: ReactNode;
}

const MainLayouts = ({ children }: ILayouts) => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      router.push("/");
      localStorageWrapper.remove("token");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <div className="container">
      <Sidebar />

      <div className="main">
        <div className="main_inner">
          <div
            className="flex-end"
            style={{
              width: "100%",
              marginBottom: "2.5rem",
              alignItems: "center",
              gap: "4rem",
            }}
          >
            <ButtonLogout onClick={onLogout}>
              <LogoutIcons />
              Шығу
            </ButtonLogout>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayouts;

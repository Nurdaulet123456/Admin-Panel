import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";

const AdministratorTableBlock = () => {
  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Админстраторы</div>

      <div>
        <div className="main_table-modal_forms" style={{ width: "100%" }}>
          <div className="forms flex">
            <div style={{ width: "75%" }}>
              <div className="login_forms-label_pink">Admin *</div>

              <Input type="text" placeholder="admin@aa11" name="admin" />
            </div>

            <div>
              <div className="login_forms-label_pink">Пароль</div>

              <Input type="password" placeholder="пароль" name="password" />
            </div>
          </div>

          <div
            className="forms flex"
            style={{ justifyContent: "flex-start", gap: "2.4rem" }}
          >
            <div style={{ width: "40%" }}>
              <div className="login_forms-label_pink">Школа</div>

              <Input type="text" placeholder="школа" name="school" />
            </div>

            <div>
              <div className="login_forms-label_pink">URL</div>

              <div className="flex" style={{ gap: "1.6rem" }}>
                <div style={{ fontWeight: "700" }}>my.kestesi.kz</div>
                <Input type="text" placeholder="url" name="url" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#CACACA" color="#645C5C" style={{ width: "auto" }}>
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default AdministratorTableBlock;

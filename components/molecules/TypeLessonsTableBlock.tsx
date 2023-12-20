import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";

const typeColor = [
  "#27AE60",
  "#E2B93B",
  "#F2994A",
  "#CF3535",
  "#E0E0E0",
  "#64748B",
  "#3F6212",
  "#CA8A04",
  "#C84D24",
  "#9F1239",
  "#86198F",
  "#1E293B",
];

const TypeLessonsTableBlock = () => {
  return (
    <div className="main_table-modal">
      <div className="login_forms-label_pink">Тип занятий</div>
      <div className="main_table-modal_forms">
        <div className="forms">
          <div className="login_forms-label_pink">Тип занятий</div>

          <Input type="text" placeholder="Тип занятий" name="type" />
        </div>

        <div className="login_forms-label_pink">Цвет</div>

        <div
          className="forms flex"
          style={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "1rem",
            width: "70%",
          }}
        >
          {typeColor.map((item) => (
            <ColorBlock color={item} key={item} />
          ))}
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

export default TypeLessonsTableBlock;

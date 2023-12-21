import { ChangeEvent, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../../atoms/UI/Inputs/Input";

const SchoolTableBlock3 = () => {
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>();

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input type="file" name="file" />
          <div style={{ marginTop: "2.7rem" }}>
            <div className="login_forms-label_pink">Құрылған жылы *</div>
            <Input type="text" name="startyear" />
          </div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Мектеп аты *</div>

            <Input type="text" placeholder="мектеп аты" name="name" />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Адрес *</div>

            <TextArea rows={10} name="address" />

            <div className="length">0/2000</div>
          </div>
        </div>
      </div>

      <div
        className="forms flex"
        style={{ gap: "2.4rem", marginTop: "2.4rem", alignItems: "flex-start" }}
      >
        {/* 1 */}

        <div style={{ width: "33.33333%" }}>
          <div className="login_forms-label_pink" style={{ color: "#E1000E" }}>
            Мектеп төлқұжаты
          </div>
          <div className="forms school_table">
            <div className="login_forms-label_pink">Жалпы бала саны *</div>

            <Input type="text" placeholder="" name="san" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Ұлдың саны *</div>

            <Input type="text" placeholder="" name="san2" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Қыздың саны *</div>

            <Input type="text" placeholder="" name="san3" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Отбасы саны *</div>

            <Input type="text" placeholder="" name="san4" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Ата-ана саны *</div>

            <Input type="text" placeholder="" name="san5" />
          </div>
        </div>

        {/* 2 */}

        <div style={{ width: "33.33333%" }}>
          <div className="login_forms-label_pink" style={{ color: "#E1000E" }}>
            Жалпы сынып-комплект
          </div>
          <div className="forms school_table">
            <div className="login_forms-label_pink">Жалпы сынып комплект *</div>

            <Input type="text" placeholder="" name="com" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Оқыту тілі *</div>

            <Input type="text" placeholder="" name="com2" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Статусы *</div>

            <Input type="text" placeholder="" name="com3" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Сыйымдылығы *</div>

            <Input type="text" placeholder="" name="com4" />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Нақты оқитыны *</div>

            <Input type="text" placeholder="" name="com5" />
          </div>
        </div>

        {/* 3 */}

        <div style={{ width: "33.33333%" }}>
          <div className="login_forms-label_pink" style={{ color: "#E1000E" }}>
            Даярлық сынып
          </div>
          <div className="flex school_table" style={{ gap: "1.6rem" }}>
            <div className="forms">
              <div className="login_forms-label_pink">Сынып саны</div>

              <Input type="text" placeholder="" name="class" />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input type="text" placeholder="" name="class2" />
            </div>
          </div>
          <div
            className="login_forms-label_pink"
            style={{ color: "#E1000E", marginBottom: "1.2rem" }}
          >
            1-4 сынып комплект
          </div>
          <div className="flex school_table" style={{ gap: "1.6rem" }}>
            <div className="forms">
              <div className="login_forms-label_pink">Сынып саны</div>

              <Input type="text" placeholder="" name="class3" />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input type="text" placeholder="" name="class4" />
            </div>
          </div>
          <div
            className="login_forms-label_pink"
            style={{ color: "#E1000E", marginBottom: "1.2rem" }}
          >
            5-9 сынып комплект
          </div>
          <div className="flex school_table" style={{ gap: "1.6rem" }}>
            <div className="forms">
              <div className="login_forms-label_pink">Сынып саны</div>

              <Input type="text" placeholder="" name="class5" />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input type="text" placeholder="" name="class6" />
            </div>
          </div>
          <div
            className="login_forms-label_pink"
            style={{ color: "#E1000E", marginBottom: "1.2rem" }}
          >
            10-11 сынып комплект
          </div>
          <div className="flex school_table" style={{ gap: "1.6rem" }}>
            <div className="forms">
              <div className="login_forms-label_pink">Сынып саны</div>

              <Input type="text" placeholder="" name="class7" />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input type="text" placeholder="" name="class8" />
            </div>
          </div>
        </div>
      </div>

      <div className="form flex" style={{ justifyContent: "flex-start" }}>
        <div
          className="login_forms-label_pink"
          style={{ color: "#E1000E", marginBottom: "1.2rem", width: "30%" }}
        >
          Педагогтардың жалпы саны
        </div>

        <Input type="text" placeholder="" name="ped" style={{ width: "40%" }} />
      </div>

      <div className="form flex" style={{ marginTop: "2.4rem", gap: "1.6rem" }}>
        <div className="form">
          <div className="login_forms-label_pink">Педагог-шебер *</div>

          <Input type="text" placeholder="" name="ped1" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-зерттеуші *</div>

          <Input type="text" placeholder="" name="ped2" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-сарапшы *</div>

          <Input type="text" placeholder="" name="ped3" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-модератор *</div>

          <Input type="text" placeholder="" name="ped4" />
        </div>
      </div>

      <div
        className="form flex"
        style={{
          marginTop: "2.4rem",
          gap: "1.6rem",
          justifyContent: "flex-start",
        }}
      >
        <div className="form">
          <div className="login_forms-label_pink">Педагог *</div>

          <Input type="text" placeholder="" name="ped5" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-тағылымдамашы *</div>

          <Input type="text" placeholder="" name="ped6" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Жоғары *</div>

          <Input type="text" placeholder="" name="ped7" />
        </div>
      </div>

      <div
        className="form flex"
        style={{
          marginTop: "2.4rem",
          gap: "1.6rem",
          justifyContent: "flex-start",
        }}
      >
        <div className="form">
          <div className="login_forms-label_pink">I санатты*</div>

          <Input type="text" placeholder="" name="ped8" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">II санатты*</div>

          <Input type="text" placeholder="" name="ped9" />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Санаты жоқ *</div>

          <Input type="text" placeholder="" name="ped10" />
        </div>
      </div>

      <div className="forms" style={{ marginBlock: "1.6rem", width: "80%" }}>
        <div className="login_forms-label_pink">Мектеп тарихы *</div>

        <TextArea rows={10} name="history" />

        <div className="length">0/2000</div>
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

export default SchoolTableBlock3;

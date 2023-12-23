import { ChangeEvent, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

const SchoolTableBlock3 = () => {
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>();
  const [fileInput, setFileInput] = useState<any>();

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    const requiredFields: (keyof UpdateInputProps)[] = [
      "address",
      "class2",
      "class3",
      "class4",
      "class5",
      "class6",
      "class7",
      "class8",
      "class",
      "com2",
      "com3",
      "com4",
      "com5",
      "com",
      "ped",
      "ped1",
      "ped2",
      "ped3",
      "ped4",
      "ped5",
      "ped6",
      "ped7",
      "ped8",
      "ped9",
      "ped10",
      "san",
      "san2",
      "san3",
      "san4",
      "san5",
      "startyear",
      "history",
      "address",
    ];

    const allFieldsPresent = requiredFields.every(
      (field) => !!updateInput?.[field]
    );

    if (allFieldsPresent) {
      await instance
        .post(
          "/api/schoolpasport/",
          {
            photo: fileInput,
            school_address: updateInput?.address,
            established: updateInput?.startyear,
            amount_of_children: updateInput?.san,
            ul_sany: Number(updateInput?.san2),
            kiz_sany: Number(updateInput?.san3),
            school_lang: updateInput?.com2,
            status: updateInput?.com3,
            vmestimost: Number(updateInput?.com4),
            dayarlyk_class_number: Number(updateInput?.class),
            dayarlyk_student_number: Number(updateInput?.class2),
            number_of_students: Number(updateInput?.com5),
            number_of_classes: Number(updateInput?.com),
            number_of_1_4_students: Number(updateInput?.class4),
            number_of_1_4_classes: Number(updateInput?.class3),
            number_of_5_9_students: Number(updateInput?.class6),
            number_of_5_9_classes: Number(updateInput?.class5),
            number_of_10_11_students: Number(updateInput?.class8),
            number_of_10_11_classes: Number(updateInput?.class7),
            amount_of_family: updateInput?.san4,
            amount_of_parents: updateInput?.san5,
            all_pedagog_number: Number(updateInput?.ped),
            pedagog_sheber: Number(updateInput?.ped1),
            pedagog_zertteushy: Number(updateInput?.ped2),
            pedagog_sarapshy: Number(updateInput?.ped3),
            pedagog_moderator: Number(updateInput?.ped4),
            pedagog: Number(updateInput?.ped5),
            pedagog_stazher: Number(updateInput?.ped6),
            pedagog_zhogary: Number(updateInput?.ped7),
            pedagog_1sanat: Number(updateInput?.ped8),
            pedagog_2sanat: Number(updateInput?.ped9),
            pedagog_sanat_zhok: Number(updateInput?.ped10),
            school_history: updateInput?.history,
          },
          {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            setUpdateInput({})
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input
            type="file"
            name="file"
            onChange={(e) => {
              if (e.currentTarget.files && e.currentTarget.files.length > 0) {
                const file = new FormData();
                if (e.currentTarget.files![0])
                  file.append("file", e.currentTarget.files![0]);
                console.log(file);
                setFileInput(file);
              }
            }}
          />
          <div style={{ marginTop: "2.7rem" }}>
            <div className="login_forms-label_pink">Құрылған жылы *</div>
            <Input
              type="text"
              name="startyear"
              value={updateInput?.startyear}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Мектеп аты *</div>

            <Input
              type="text"
              placeholder="мектеп аты"
              name="name"
              value={updateInput?.name}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Адрес *</div>

            <TextArea
              rows={10}
              name="address"
              value={updateInput?.address}
              onChange={(e) => onChangeUpdateInput(e)}
              maxLength={2000}
            />

            <div className="length">{updateInput?.address?.length}/2000</div>
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

            <Input
              type="text"
              placeholder=""
              name="san"
              value={updateInput?.san}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Ұлдың саны *</div>

            <Input
              type="text"
              placeholder=""
              name="san2"
              value={updateInput?.san2}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Қыздың саны *</div>

            <Input
              type="text"
              placeholder=""
              name="san3"
              value={updateInput?.san3}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Отбасы саны *</div>

            <Input
              type="text"
              placeholder=""
              name="san4"
              value={updateInput?.san4}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Ата-ана саны *</div>

            <Input
              type="text"
              placeholder=""
              name="san5"
              value={updateInput?.san5}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>
        </div>

        {/* 2 */}

        <div style={{ width: "33.33333%" }}>
          <div className="login_forms-label_pink" style={{ color: "#E1000E" }}>
            Жалпы сынып-комплект
          </div>
          <div className="forms school_table">
            <div className="login_forms-label_pink">Жалпы сынып комплект *</div>

            <Input
              type="text"
              placeholder=""
              name="com"
              value={updateInput?.com}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Оқыту тілі *</div>

            <Input
              type="text"
              placeholder=""
              name="com2"
              value={updateInput?.com2}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Статусы *</div>

            <Input
              type="text"
              placeholder=""
              name="com3"
              value={updateInput?.com3}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Сыйымдылығы *</div>

            <Input
              type="text"
              placeholder=""
              name="com4"
              value={updateInput?.com4}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms school_table">
            <div className="login_forms-label_pink">Нақты оқитыны *</div>

            <Input
              type="text"
              placeholder=""
              name="com5"
              value={updateInput?.com5}
              onChange={(e) => onChangeUpdateInput(e)}
            />
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

              <Input
                type="text"
                placeholder=""
                name="class"
                value={updateInput?.class}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input
                type="text"
                placeholder=""
                name="class2"
                value={updateInput?.class2}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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

              <Input
                type="text"
                placeholder=""
                name="class3"
                value={updateInput?.class3}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input
                type="text"
                placeholder=""
                name="class4"
                value={updateInput?.class4}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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

              <Input
                type="text"
                placeholder=""
                name="class5"
                value={updateInput?.class5}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input
                type="text"
                placeholder=""
                name="class6"
                value={updateInput?.class6}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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

              <Input
                type="text"
                placeholder=""
                name="class7"
                value={updateInput?.class7}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Оқушы саны</div>

              <Input
                type="text"
                placeholder=""
                name="class8"
                value={updateInput?.class8}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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

        <Input
          type="text"
          placeholder=""
          name="ped"
          style={{ width: "40%" }}
          value={updateInput?.ped}
          onChange={(e) => onChangeUpdateInput(e)}
        />
      </div>

      <div className="form flex" style={{ marginTop: "2.4rem", gap: "1.6rem" }}>
        <div className="form">
          <div className="login_forms-label_pink">Педагог-шебер *</div>

          <Input
            type="text"
            placeholder=""
            name="ped1"
            value={updateInput?.ped1}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-зерттеуші *</div>

          <Input
            type="text"
            placeholder=""
            name="ped2"
            value={updateInput?.ped2}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-сарапшы *</div>

          <Input
            type="text"
            placeholder=""
            name="ped3"
            value={updateInput?.ped3}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-модератор *</div>

          <Input
            type="text"
            placeholder=""
            name="ped4"
            value={updateInput?.ped4}
            onChange={(e) => onChangeUpdateInput(e)}
          />
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

          <Input
            type="text"
            placeholder=""
            name="ped5"
            value={updateInput?.ped5}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Педагог-тағылымдамашы *</div>

          <Input
            type="text"
            placeholder=""
            name="ped6"
            value={updateInput?.ped6}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Жоғары *</div>

          <Input
            type="text"
            placeholder=""
            name="ped7"
            value={updateInput?.ped7}
            onChange={(e) => onChangeUpdateInput(e)}
          />
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

          <Input
            type="text"
            placeholder=""
            name="ped8"
            value={updateInput?.ped8}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">II санатты*</div>

          <Input
            type="text"
            placeholder=""
            name="ped9"
            value={updateInput?.ped9}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="form">
          <div className="login_forms-label_pink">Санаты жоқ *</div>

          <Input
            type="text"
            placeholder=""
            name="ped10"
            value={updateInput?.ped10}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>
      </div>

      <div className="forms" style={{ marginBlock: "1.6rem", width: "80%" }}>
        <div className="login_forms-label_pink">Мектеп тарихы *</div>

        <TextArea
          rows={10}
          name="history"
          value={updateInput?.history}
          onChange={(e) => onChangeUpdateInput(e)}
          maxLength={2000}
        />

        <div className="length">{history.length}/2000</div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default SchoolTableBlock3;

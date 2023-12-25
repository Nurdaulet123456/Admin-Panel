import { useRouter } from "next/router";
import Tabs from "@/components/molecules/Tabs/Tabs";
import TabsClass from "@/components/molecules/Tabs/TabsClass";
import ScheduleTable from "@/components/organisms/ScheduleTable";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";

const ScheduleComponents = () => {
  const router = useRouter();

  return (
    <MainLayouts>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "1.6rem",
          gap: "2.4rem",
        }}
      >
        <Tabs link="schedule" tabs={tabs} />
      </div>

      {router.asPath === "/schedule/1" ? (
        <TabsClass />
      ) : (
        <ScheduleTable
          schedule={[
            {
              id: 7,
              week_day: "2",
              ring: {
                id: 8,
                plan: 1,
                smena: 1,
                number: 3,
                start_time: "09:50:00",
                end_time: "10:35:00",
                school: 1,
              },
              classl: {
                id: 1,
                class_name: "7A",
                language: "KZ",
                classroom: 1,
                class_teacher: 4,
                osnova_plan: 3,
                osnova_smena: 1,
                dopurok_plan: 10,
                dopurok_smena: 3,
                school: 1,
              },
              teacher: {
                id: 2,
                full_name: "Сарсенбаева Акмарал Данияркызы",
                photo3x4: "https://www.bilimge.kz/media/woman_1.jpeg",
                subject: "Informatika",
                pedagog: "Pedagog Sheber",
                school: 1,
                job_history: [
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic: "asdasdasad asd asd a",
                  },
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic:
                      "Алатау ауданын мектебинде зерттеуши мугалим болып жумыс аткарды .",
                  },
                  {
                    start_date: 2021,
                    end_date: 2022,
                    job_characteristic:
                      "Тагы бир ауданнын тагы бир мектебинде тагы биреу болып жумыс истеди.",
                  },
                ],
                speciality_history: [
                  {
                    end_date: 2023,
                    speciality_university: "as das dasd asd",
                    mamandygy: "as da",
                    degree: "Среднее",
                  },
                  {
                    end_date: 2012,
                    speciality_university: "KBTU",
                    mamandygy: "Informatika teacher",
                    degree: "Высшее",
                  },
                ],
              },
              subject: {
                id: 10,
                full_name: "Физика",
                type: "HARD",
                school: 1,
              },
              classroom: {
                id: 1,
                classroom_name: "21 Kabinet",
                classroom_number: 21,
                flat: 2,
                korpus: 2,
                school: 1,
              },
              teacher2: null,
              classroom2: null,
              typez: null,
              school: 1,
            },
            {
              id: 8,
              week_day: "2",
              ring: {
                id: 10,
                plan: 1,
                smena: 1,
                number: 5,
                start_time: "11:30:00",
                end_time: "12:15:00",
                school: 1,
              },
              classl: {
                id: 3,
                class_name: "2",
                language: "KZ",
                classroom: 2,
                class_teacher: 3,
                osnova_plan: 3,
                osnova_smena: 1,
                dopurok_plan: 3,
                dopurok_smena: 1,
                school: 1,
              },
              teacher: {
                id: 2,
                full_name: "Сарсенбаева Акмарал Данияркызы",
                photo3x4: "https://www.bilimge.kz/media/woman_1.jpeg",
                subject: "Informatika",
                pedagog: "Pedagog Sheber",
                school: 1,
                job_history: [
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic: "asdasdasad asd asd a",
                  },
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic:
                      "Алатау ауданын мектебинде зерттеуши мугалим болып жумыс аткарды .",
                  },
                  {
                    start_date: 2021,
                    end_date: 2022,
                    job_characteristic:
                      "Тагы бир ауданнын тагы бир мектебинде тагы биреу болып жумыс истеди.",
                  },
                ],
                speciality_history: [
                  {
                    end_date: 2023,
                    speciality_university: "as das dasd asd",
                    mamandygy: "as da",
                    degree: "Среднее",
                  },
                  {
                    end_date: 2012,
                    speciality_university: "KBTU",
                    mamandygy: "Informatika teacher",
                    degree: "Высшее",
                  },
                ],
              },
              subject: {
                id: 1,
                full_name: "Matematika",
                type: "HARD",
                school: null,
              },
              classroom: {
                id: 5,
                classroom_name: "202-Кабинет Информатики",
                classroom_number: 201,
                flat: 2,
                korpus: 2,
                school: 1,
              },
              teacher2: null,
              classroom2: null,
              typez: null,
              school: 1,
            },
            {
              id: 9,
              week_day: "5",
              ring: {
                id: 10,
                plan: 1,
                smena: 1,
                number: 5,
                start_time: "11:30:00",
                end_time: "12:15:00",
                school: 1,
              },
              classl: {
                id: 1,
                class_name: "7A",
                language: "KZ",
                classroom: 1,
                class_teacher: 4,
                osnova_plan: 3,
                osnova_smena: 1,
                dopurok_plan: 10,
                dopurok_smena: 3,
                school: 1,
              },
              teacher: {
                id: 2,
                full_name: "Сарсенбаева Акмарал Данияркызы",
                photo3x4: "https://www.bilimge.kz/media/woman_1.jpeg",
                subject: "Informatika",
                pedagog: "Pedagog Sheber",
                school: 1,
                job_history: [
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic: "asdasdasad asd asd a",
                  },
                  {
                    start_date: 2023,
                    end_date: 2023,
                    job_characteristic:
                      "Алатау ауданын мектебинде зерттеуши мугалим болып жумыс аткарды .",
                  },
                  {
                    start_date: 2021,
                    end_date: 2022,
                    job_characteristic:
                      "Тагы бир ауданнын тагы бир мектебинде тагы биреу болып жумыс истеди.",
                  },
                ],
                speciality_history: [
                  {
                    end_date: 2023,
                    speciality_university: "as das dasd asd",
                    mamandygy: "as da",
                    degree: "Среднее",
                  },
                  {
                    end_date: 2012,
                    speciality_university: "KBTU",
                    mamandygy: "Informatika teacher",
                    degree: "Высшее",
                  },
                ],
              },
              subject: {
                id: 10,
                full_name: "Физика",
                type: "HARD",
                school: 1,
              },
              classroom: {
                id: 1,
                classroom_name: "21 Kabinet",
                classroom_number: 21,
                flat: 2,
                korpus: 2,
                school: 1,
              },
              teacher2: null,
              classroom2: null,
              typez: null,
              school: 1,
            },
          ]}
        />
      )}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Ручной",
  },

  {
    id: 2,
    type: "Автораспределение",
  },
];

export default ScheduleComponents;

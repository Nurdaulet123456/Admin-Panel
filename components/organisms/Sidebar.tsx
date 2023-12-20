import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <div className="sidebar_top">Мектеп атауы</div>

      <nav className="sidebar_links">
        {sidebar.map((item) => (
          <Link
            href={`/${item.link}`}
            key={item.id}
            className={`${
              router.asPath.split('/')[1] === item.link?.split("/")[0]
                ? "active"
                : ""
            }`}
          >
            <div>{item.type}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

interface IType {
  id?: number;
  type?: string;
  link?: string;
}

const sidebar: IType[] = [
  {
    id: 1,
    type: "Расписание",
    link: "schedule",
  },

  {
    id: 2,
    type: "Преподаватели",
    link: "teachers",
  },

  {
    id: 3,
    type: "Предметы",
    link: "lessons",
  },

  {
    id: 4,
    type: "Гордость школы",
    link: "prideschool/1",
  },

  {
    id: 5,
    type: "О школе",
    link: "school/1",
  },

  {
    id: 6,
    type: "Новости",
    link: "news",
  },

  {
    id: 7,
    type: "Кабинет",
    link: "cabinet",
  },

  {
    id: 8,
    type: "Меню",
    link: "menu",
  },

  {
    id: 9,
    type: "Кружок",
    link: "main",
  },

  {
    id: 10,
    type: "Класс",
    link: "class",
  },

  {
    id: 11,
    type: "Тип занятий",
    link: "typelessons",
  },

  {
    id: 12,
    type: "Звонки",
    link: "calls",
  },
];

export default Sidebar;

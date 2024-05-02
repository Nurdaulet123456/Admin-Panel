import Link from "next/link";
import { useRouter } from "next/router";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useEffect, useState } from "react";
import { instance } from "@/api/axios.instance";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {getUserIdThunk} from "@/store/thunks/available.thunk";

const Sidebar = () => {
  const router = useRouter();


  return (
    <div className="sidebar">
      <Link href={"/"}>
        <div className="sidebar_top">KESTESI.KZ</div>
      </Link>

      <nav className="sidebar_links">
        {sidebar.map((item) => (
          <Link
            href={`/${item.link}`}
            key={item.id}
            className={`${
              router.asPath.split("/")[1] === item.link?.split("/")[0]
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
    link: "schedule/1",
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
    link: "prideschool",
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
    link: "calls/1",
  },

  {
    id: 13,
    type: "Уведомления",
    link: "notification",
  },
  {
    id: 14,
    type: "Карта школы",
    link: "map",
  },
  {
    id: 15,
    type: "Фото-слайдер",
    link: "slider"
  }
];

export default Sidebar;

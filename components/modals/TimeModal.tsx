import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setText?: Dispatch<SetStateAction<string>>;
  setShowActive?: Dispatch<SetStateAction<boolean>>;
}

const TimeModal: FC<IProps> = ({ setText, setShowActive }) => {
  const handleGetTime = (text: string) => {
    if (setText && setShowActive) {
      setText(text);
      setShowActive(false);
    }
  };

  return (
    <>
      {timeArr.map((item) => (
        <div
          className="main_table-modal-active"
          key={item.id}
          onClick={() => handleGetTime(item.time)}
        >
          {item.time}
        </div>
      ))}
    </>
  );
};

const timeArr = [
  {
    id: 1,
    time: "Дүйсенбі",
  },

  {
    id: 2,
    time: "Сейсенбі",
  },

  {
    id: 3,
    time: "Сәрсенбі",
  },

  {
    id: 4,
    time: "Бейсінбі",
  },

  {
    id: 5,
    time: "Жұма",
  },

  {
    id: 6,
    time: "Сенбі",
  },
];

export default TimeModal;

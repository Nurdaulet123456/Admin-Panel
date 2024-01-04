import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import ScheduleModal from "../forms/ScheduleModal";
import { useState } from "react";
import { useRouter } from "next/router";
import { ISchedule } from "@/types/assets.type";

interface IProps {
  schedule?: ISchedule[];
  selectModePaste?: boolean;
  selectMode?: boolean;
  selectedCellsPaste?: any;
  selectedCells?: any;
  handleCheckboxClick?: any;
  handleCheckboxClickPaste?: any;
}

const ScheduleTable = ({
  schedule,
  selectModePaste,
  selectMode,
  selectedCellsPaste,
  selectedCells,
  handleCheckboxClick,
  handleCheckboxClickPaste,
}: IProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedCell, setSelectedCell] = useState<{
    day?: any;
    start_time?: any;
    end_time?: any;
  }>();

  const router = useRouter();

  const handleCellClick = (day: any, start_time: any, end_time: any) => {
    setOpenModal(true);
    setSelectedCell({ day, start_time, end_time });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ScheduleModal
          onReject={handleCloseModal}
          selectedCell={selectedCell}
          classnames={decodeURIComponent(
            router.asPath.split("/").at(-1) as string
          )}
        />
      )}

      <TableContainer
        component={Paper}
        elevation={0}
        style={{ boxShadow: "none" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ border: "2px solid #4090FF", textAlign: "center" }}
              >
                <div
                  style={{
                    color: "#000000",
                    fontSize: "2rem",
                    fontWeight: "500",
                    marginBottom: "1.6rem",
                  }}
                >
                  Дата
                </div>{" "}
                <div
                  style={{
                    color: "#878787",
                    fontSize: "2rem",
                    fontWeight: "500",
                  }}
                >
                  Время
                </div>
              </TableCell>
              {days.map((day, index) => (
                <TableCell
                  key={index}
                  style={{
                    border: "2px solid #4090FF",
                    color: "#000000",
                    fontSize: "2rem",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {time.map((timeRange, timeIndex) => (
              <TableRow key={timeIndex}>
                <TableCell
                  style={{ border: "2px solid #4090FF", textAlign: "center" }}
                >
                  <div
                    style={{
                      color: "#000000",
                      fontSize: "2rem",
                      fontWeight: "500",
                    }}
                  >
                    {timeRange.start_time.split(":")[0]}:
                    {timeRange.start_time.split(":")[1]}
                  </div>
                  <div
                    style={{
                      color: "#878787",
                      fontSize: "2rem",
                      fontWeight: "500",
                    }}
                  >
                    {timeRange.end_time.split(":")[0]}:
                    {timeRange.end_time.split(":")[1]}
                  </div>
                </TableCell>
                {days.map((day, dayIndex) => {
                  const scheduleItem =
                    schedule &&
                    schedule.find(
                      (item) =>
                        item.week_day === (dayIndex + 1).toString() &&
                        item?.ring?.start_time === timeRange.start_time
                    );

                  const isSelected = selectedCells.some(
                    (selectedCell: any) =>
                      selectedCell.day === day &&
                      selectedCell.start_time === timeRange.start_time &&
                      selectedCell.end_time === timeRange.end_time
                  );

                  const isSelectedPaste = selectedCellsPaste.some(
                    (selectedCell: any) =>
                      selectedCell.day === day &&
                      selectedCell.start_time === timeRange.start_time &&
                      selectedCell.end_time === timeRange.end_time
                  );

                  return (
                    <TableCell
                      key={dayIndex}
                      style={{ border: "2px solid #4090FF" }}
                    >
                      {scheduleItem ? (
                        <div style={{ textAlign: "center" }}>
                          <div
                            style={{
                              color: "#000000",
                              fontSize: "2rem",
                              fontWeight: "500",
                              marginBottom: "1.8rem",
                            }}
                          >
                            {scheduleItem?.subject?.full_name}
                          </div>
                          <div
                            style={{
                              color: "#116AE5",
                              fontSize: "2rem",
                              fontWeight: "500",
                              marginBottom: "1.8rem",
                            }}
                          >
                            {scheduleItem?.classl?.class_name}
                          </div>
                          <div
                            style={{
                              color: "#116AE5",
                              fontSize: "2rem",
                              fontWeight: "500",
                            }}
                          >
                            {scheduleItem?.teacher?.full_name}
                          </div>

                          {selectMode && (
                            <Checkbox
                              defaultChecked={isSelected}
                              onClick={() =>
                                handleCheckboxClick(
                                  day,
                                  timeRange.start_time,
                                  timeRange.end_time,
                                  scheduleItem?.teacher?.id,
                                  scheduleItem?.ring?.id,
                                  scheduleItem?.classl?.id,
                                  scheduleItem?.subject?.id,
                                  scheduleItem?.classroom?.id,
                                  scheduleItem?.typez?.id
                                )
                              }
                            />
                          )}
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              color: "#000000",
                              fontSize: "2rem",
                              fontWeight: "500",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleCellClick(
                                day,
                                timeRange.start_time,
                                timeRange.end_time
                              )
                            }
                          >
                            +
                          </div>

                          {selectModePaste && (
                            <Checkbox
                              checked={isSelectedPaste}
                              onClick={() =>
                                handleCheckboxClickPaste(
                                  day,
                                  timeRange.start_time,
                                  timeRange.end_time
                                )
                              }
                            />
                          )}
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

let time = [
  {
    start_time: "08:00:00",
    end_time: "08:50:00",
  },

  {
    start_time: "08:55:00",
    end_time: "09:40:00",
  },

  {
    start_time: "09:50:00",
    end_time: "10:35:00",
  },

  {
    start_time: "10:45:00",
    end_time: "11:35:00",
  },

  {
    start_time: "11:40:00",
    end_time: "12:30:00",
  },

  {
    start_time: "12:35:00",
    end_time: "13:25:00",
  },

  {
    start_time: "13:30:00",
    end_time: "14:10:00",
  },

  {
    start_time: "14:15:00",
    end_time: "15:00:00",
  },

  {
    start_time: "15:40:00",
    end_time: "16:10:00",
  },
];

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export default ScheduleTable;

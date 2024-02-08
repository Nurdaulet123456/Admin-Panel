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
import { IARing, ISchedule } from "@/types/assets.type";

interface IProps {
  schedule?: ISchedule[];
  selectModePaste?: boolean;
  selectMode?: boolean;
  selectedCellsPaste?: any;
  selectedCells?: any;
  handleCheckboxClick?: any;
  handleCheckboxClickPaste?: any;
  iaring?: any;
}

const ScheduleTable = ({
  schedule,
  selectModePaste,
  selectMode,
  selectedCellsPaste,
  selectedCells,
  handleCheckboxClick,
  iaring,
  handleCheckboxClickPaste,
}: IProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedCell, setSelectedCell] = useState<{
    day?: any;
    start_time?: any;
    end_time?: any;
    timeId?: any;
  }>();

  const router = useRouter();

  const handleCellClick = (
    day: any,
    start_time: any,
    end_time: any,
    timeId?: any,
  ) => {
    setOpenModal(true);
    setSelectedCell({ day, start_time, end_time, timeId });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sortArr = [...(iaring || [])].sort((a: IARing, b: IARing) => {
    const timeA = new Date(`2000-01-01 ${a.start_time}`);
    const timeB = new Date(`2000-01-01 ${b.start_time}`);

    return timeA.getTime() - timeB.getTime();
  });

  return (
    <>
      {openModal && (
        <ScheduleModal
          onReject={handleCloseModal}
          selectedCell={selectedCell}
          classnames={decodeURIComponent(
            router.asPath.split("/").at(-1) as string,
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
            {sortArr.map((timeRange: any, timeIndex: any) => (
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
                        item?.ring?.start_time === timeRange.start_time &&
                        item?.classl?.class_name ===
                          decodeURIComponent(
                            router.asPath?.split("/")?.at(-1) as string,
                          ),
                    );

                  const isSelected = selectedCells.some(
                    (selectedCell: any) =>
                      selectedCell.day === day &&
                      selectedCell.start_time === timeRange.start_time &&
                      selectedCell.end_time === timeRange.end_time,
                  );

                  const isSelectedPaste = selectedCellsPaste.some(
                    (selectedCell: any) =>
                      selectedCell.day === day &&
                      selectedCell.start_time === timeRange.start_time &&
                      selectedCell.end_time === timeRange.end_time,
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
                                  scheduleItem?.typez?.id,
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
                                timeRange.end_time,
                                timeRange.id,
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
                                  timeRange.end_time,
                                  timeRange.id,
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

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export default ScheduleTable;

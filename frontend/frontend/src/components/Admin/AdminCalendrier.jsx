import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
const AdminCalendrier = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentWeek, setCurrentWeek] = useState(0); // Semaine actuelle (index)
  const rooms = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"];
  const reservations = [
    { room: "Salle 1", day: "Lun", date: "2025-01-01", info: "Réunion A" },
    { room: "Salle 2", day: "Mar", date: "2025-01-02", info: "Réunion B" },
    { room: "Salle 3", day: "Jeu", date: "2025-01-10", info: "Réunion C" },
  ];

  const getFirstMonday = (date) => {
    const startOfMonth = date.startOf("month");
    return startOfMonth.day() === 1
      ? startOfMonth
      : startOfMonth.subtract(startOfMonth.day() - 1, "day");
  };

  const getWeekDays = () => {
    const firstMonday = getFirstMonday(selectedDate);
    const startOfWeek = firstMonday.add(currentWeek * 7, "day");
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, "day"));
    }
    return days;
  };

  const days = getWeekDays();

  const filteredReservations = reservations.filter((r) =>
    dayjs(r.date).isSame(selectedDate, "month")
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choisir un mois"
          views={["month", "year"]}
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            setCurrentWeek(0); // Réinitialiser à la première semaine
          }}
        />
      </LocalizationProvider>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <Button
          variant="outlined"
          onClick={() => setCurrentWeek((prev) => Math.max(0, prev - 1))}
          disabled={currentWeek === 0}
        >
          Semaine précédente
        </Button>
        <Button
          variant="outlined"
          onClick={() => setCurrentWeek((prev) => prev + 1)}
          disabled={
            days[6].date() === selectedDate.endOf("month").date() &&
            days[6].isSame(selectedDate, "month")
          }
        >
          Semaine suivante
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{
          height: "100vh",
          width: "100vw",
          margin: 0,
        }}
      >
        <Table
          style={{
            tableLayout: "fixed",
            height: "100%",
            minWidth: `${150 + rooms.length * 120}px`,
          }}
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#EBEBEB" }}>
              <TableCell
                style={{
                  borderRight: "1px solid #ccc",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Jours
              </TableCell>
              {rooms.map((room, index) => (
                <TableCell
                  key={index}
                  style={{
                    borderRight: "1px solid #ccc",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {room}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day, index) => (
              <TableRow key={index} style={{ height: "calc(100% / 7)" }}>
                <TableCell
                  style={{
                    borderRight: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {day.format("ddd D MMM")}
                </TableCell>
                {rooms.map((room, i) => {
                  const reservation = filteredReservations.find(
                    (r) =>
                      r.room === room &&
                      dayjs(r.date).isSame(day, "day")
                  );
                  return (
                    <TableCell
                      key={i}
                      style={{
                        borderRight: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        textAlign: "center",
                      }}
                    >
                      {reservation ? reservation.info : ""}
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

export default AdminCalendrier;
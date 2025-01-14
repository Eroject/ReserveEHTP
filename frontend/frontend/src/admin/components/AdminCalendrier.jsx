import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

const AdminCalendrier = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentWeek, setCurrentWeek] = useState(0);
  const [reservations, setReservations] = useState([
    { room: "Salle 1", day: "Lun", date: "2025-01-01", info: "Réunion A" },
    { room: "Salle 2", day: "Mar", date: "2025-01-02", info: "Réunion B" },
    { room: "Salle 3", day: "Jeu", date: "2025-02-10", info: "Réunion C" },
    { room: "Salle 3", day: "Ven", date: "2025-02-11", info: "Réunion D" },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("view"); // "view" or "add"
  const [selectedCell, setSelectedCell] = useState(null);
  const [newReservationInfo, setNewReservationInfo] = useState("");

  const rooms = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5", "Salle 6", "Salle 7", "Salle 8", "Salle 9", "Salle 10", "Salle 11", "Salle 12", "Salle 13"];
  /*useEffect(() => {
    ReservationApi.all().then(({ data }) => setReservations(data));
  }, []);*/
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

  /*const filteredReservations = reservations.filter((r) =>
    dayjs(r.date).isSame(selectedDate, "month")
  );*/
  const filteredReservations = reservations;

  const handleCellClick = (day, room) => {
    const reservation = filteredReservations.find(
      (r) => r.room === room && dayjs(r.date).isSame(day, "day")
    );
    if (reservation) {
      setDialogType("view");
      setSelectedCell({ reservation });
    } else {
      setDialogType("add");
      setSelectedCell({ day, room });
    }
    setDialogOpen(true);
  };

  const handleAddReservation = () => {
    // Ajouter la nouvelle réservation à l'état
    setReservations((prevReservations) => [
      ...prevReservations,
      {
        room: selectedCell.room, // Salle sélectionnée
        date: selectedCell.day.format("YYYY-MM-DD"), // Date formatée
        info: newReservationInfo, // Informations de la réservation
      },
    ]);
  
    // Réinitialiser le champ d'informations et fermer le dialog
    setNewReservationInfo(""); // Réinitialiser le champ texte
    setDialogOpen(false); // Fermer le dialog
  };
  /*
  const handleAddReservation = async () => {
  const newReservation = {
    room: selectedCell.room,
    date: selectedCell.day.format("YYYY-MM-DD"),
    info: newReservationInfo,
  };

  try {
    // Appel à l'API pour ajouter une réservation
    const response = await ReservationApi.add(newReservation);

    if (response.status === 201 || response.status === 200) {
      // Si la réservation est réussie, mettez à jour l'état local
      setReservations((prevReservations) => [...prevReservations, newReservation]);
      setDialogOpen(false);
      setNewReservationInfo(""); // Réinitialisation du champ d'informations
    } else {
      console.error("Erreur lors de l'ajout de la réservation :", response.data);
      alert("Erreur lors de l'ajout de la réservation. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur API :", error);
    alert("Impossible d'ajouter la réservation. Vérifiez votre connexion.");
  }
};
  */ 


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choisir la date"
          views={["month", "year"]}
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            setCurrentWeek(0);
          }}
        />
      </LocalizationProvider>
      <div
  style={{
    display: "flex",
    justifyContent: "flex-start", // Aligne tous les éléments à gauche
    alignItems: "center", // Aligne les éléments verticalement au centre
    gap: "20px", // Ajoute un espace constant entre les boutons
    margin: "10px 0",
  }}
>


    
  <Button
    variant="outlined"
    onClick={() => setCurrentWeek((prev) => prev - 1)}
    /*onClick={() => setCurrentWeek((prev) => Math.max(0, prev - 1))}*/
   /* disabled={currentWeek === 0}*/
   sx={{
    color: "gray", // Couleur du texte
    borderColor: "gray", // Couleur du bord
    "&:hover": {
      borderColor: "gray", // Couleur du bord au survol
      backgroundColor: "transparent", // Pas de fond au survol
    },
  }}
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
    sx={{
      color: "gray", // Couleur du texte
      borderColor: "gray", // Couleur du bord
      "&:hover": {
        borderColor: "gray", // Couleur du bord au survol
        backgroundColor: "transparent", // Pas de fond au survol
      },
    }}
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
            <TableRow style={{ backgroundColor: "#EBEBEB", }}>
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
            onClick={() => handleCellClick(day, room)}
            style={{
              borderRight: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: reservation ? "#d3f9d8" : "transparent",
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

      {/* Dialog */}
<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogTitle>
    {dialogType === "view" ? "Détails de la Réservation" : "Ajouter une Réservation"}
  </DialogTitle>
  <DialogContent>
    {dialogType === "view" && selectedCell?.reservation ? (
      <>
        <p>Salle : {selectedCell.reservation.room}</p>
        <p>Date : {dayjs(selectedCell.reservation.date).format("ddd D MMM YYYY")}</p>
        <p>Informations : {selectedCell.reservation.info}</p>
      </>
    ) : dialogType === "add" && selectedCell?.day && selectedCell?.room ? (
      <>
        <p>Salle : {selectedCell.room}</p>
        <p>Date : {selectedCell.day.format("ddd D MMM YYYY")}</p>
        <TextField
          label="Informations"
          fullWidth
          value={newReservationInfo}
          onChange={(e) => setNewReservationInfo(e.target.value)}
        />
      </>
    ) : (
      <p>Aucune donnée disponible.</p>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDialogOpen(false)}>Fermer</Button>
    {dialogType === "add" && (
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddReservation}
        disabled={!newReservationInfo}
      >
        Ajouter
      </Button>
    )}
  </DialogActions>
</Dialog>

    </>
  );
};

export default AdminCalendrier;
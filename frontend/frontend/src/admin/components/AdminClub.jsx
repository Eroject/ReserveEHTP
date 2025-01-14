import React, { useEffect, useState } from "react";
import { Tab, Tabs, Box, Typography, Stack, Button, InputAdornment, TextField } from "@mui/material";
import SimpleTable from "../../components-commun-between-us/SimpleTable";
import SearchIcon from '@mui/icons-material/Search';
import AdminAddClub from "./AdminAddClub";

const AdminClub = () => {
  const [value, setValue] = useState(0); // gère l'état du tab sélectionné
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);  // Pour gérer l'ouverture du Dialog
  const [selectedRequest, setSelectedRequest] = useState(null);  // Pour stocker la demande sélectionnée
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false); // Pour gérer l'ouverture du Dialog pour accepter
  const [selectedAcceptRequest, setSelectedAcceptRequest] = useState(null);
  
  // Exemple de données pour les rows
  const [rows, setRows] = useState([
    { id: 1, firstname: "John", lastname: "Doe", email: "john.doe@example.com", address: "123 Main St", club: "Football", dateReservation: "2025-01-05", heureDepart: "10:00", heureFin: "12:00", description: "Match de football" },
    { id: 2, firstname: "Jane", lastname: "Doe", email: "jane.doe@example.com", address: "456 Main St", club: "Basketball", dateReservation: "2025-01-06", heureDepart: "14:00", heureFin: "16:00", description: "Match de basketball" },
    { id: 3, firstname: "Alice", lastname: "Smith", email: "alice.smith@example.com", address: "789 Elm St", club: "Tennis", dateReservation: "2025-01-07", heureDepart: "09:00", heureFin: "11:00", description: "Tournoi de tennis" },
    { id: 4, firstname: "Bob", lastname: "Brown", email: "bob.brown@example.com", address: "321 Oak St", club: "Football", dateReservation: "2025-01-08", heureDepart: "16:00", heureFin: "18:00", description: "Entraînement" },
    { id: 5, firstname: "Charlie", lastname: "Johnson", email: "charlie.johnson@example.com", address: "654 Pine St", club: "Volleyball", dateReservation: "2025-01-09", heureDepart: "12:00", heureFin: "14:00", description: "Match de volleyball" },
    { id: 6, firstname: "David", lastname: "Williams", email: "david.williams@example.com", address: "987 Maple St", club: "Basketball", dateReservation: "2025-01-10", heureDepart: "15:00", heureFin: "17:00", description: "Entraînement de basketball" },
    { id: 7, firstname: "Ella", lastname: "Taylor", email: "ella.taylor@example.com", address: "111 Birch St", club: "Football", dateReservation: "2025-01-11", heureDepart: "10:30", heureFin: "12:30", description: "Match amical" },
    { id: 8, firstname: "Frank", lastname: "White", email: "frank.white@example.com", address: "222 Cedar St", club: "Tennis", dateReservation: "2025-01-12", heureDepart: "13:00", heureFin: "15:00", description: "Cours de tennis" },
    { id: 9, firstname: "Grace", lastname: "Hall", email: "grace.hall@example.com", address: "333 Walnut St", club: "Volleyball", dateReservation: "2025-01-13", heureDepart: "14:00", heureFin: "16:00", description: "Tournoi local" },
    { id: 10, firstname: "Hank", lastname: "King", email: "hank.king@example.com", address: "444 Spruce St", club: "Football", dateReservation: "2025-01-14", heureDepart: "17:00", heureFin: "19:00", description: "Match interclubs" },
    { id: 11, firstname: "Ivy", lastname: "Green", email: "ivy.green@example.com", address: "555 Aspen St", club: "Basketball", dateReservation: "2025-01-15", heureDepart: "18:00", heureFin: "20:00", description: "Entraînement intensif" },
    { id: 12, firstname: "Jack", lastname: "Baker", email: "jack.baker@example.com", address: "666 Cherry St", club: "Tennis", dateReservation: "2025-01-16", heureDepart: "08:00", heureFin: "10:00", description: "Session de pratique" },
    { id: 13, firstname: "Kelly", lastname: "Adams", email: "kelly.adams@example.com", address: "777 Palm St", club: "Volleyball", dateReservation: "2025-01-17", heureDepart: "10:00", heureFin: "12:00", description: "Match amical" },
    { id: 14, firstname: "Leo", lastname: "Clark", email: "leo.clark@example.com", address: "888 Oak St", club: "Football", dateReservation: "2025-01-18", heureDepart: "13:00", heureFin: "15:00", description: "Tournoi régional" },
    { id: 15, firstname: "Mia", lastname: "Evans", email: "mia.evans@example.com", address: "999 Pine St", club: "Basketball", dateReservation: "2025-01-19", heureDepart: "16:00", heureFin: "18:00", description: "Tournoi local" },
    { id: 16, firstname: "Nathan", lastname: "Lewis", email: "nathan.lewis@example.com", address: "1010 Maple St", club: "Tennis", dateReservation: "2025-01-20", heureDepart: "09:00", heureFin: "11:00", description: "Session individuelle" },
    { id: 17, firstname: "Olivia", lastname: "Scott", email: "olivia.scott@example.com", address: "1111 Birch St", club: "Volleyball", dateReservation: "2025-01-21", heureDepart: "14:00", heureFin: "16:00", description: "Match interclubs" },
    { id: 18, firstname: "Paul", lastname: "Young", email: "paul.young@example.com", address: "1212 Cedar St", club: "Football", dateReservation: "2025-01-22", heureDepart: "17:00", heureFin: "19:00", description: "Match d'exhibition" },
    { id: 19, firstname: "Quinn", lastname: "Hill", email: "quinn.hill@example.com", address: "1313 Walnut St", club: "Basketball", dateReservation: "2025-01-23", heureDepart: "18:00", heureFin: "20:00", description: "Session de pratique" },
    { id: 20, firstname: "Rachel", lastname: "Lee", email: "rachel.lee@example.com", address: "1414 Spruce St", club: "Tennis", dateReservation: "2025-01-24", heureDepart: "07:00", heureFin: "09:00", description: "Entraînement avancé" },
    { id: 21, firstname: "Sam", lastname: "Wright", email: "sam.wright@example.com", address: "1515 Aspen St", club: "Volleyball", dateReservation: "2025-01-25", heureDepart: "11:00", heureFin: "13:00", description: "Tournoi d'équipe" },
    { id: 22, firstname: "Tina", lastname: "Walker", email: "tina.walker@example.com", address: "1616 Cherry St", club: "Football", dateReservation: "2025-01-26", heureDepart: "12:00", heureFin: "14:00", description: "Entraînement collectif" },
  ]);
  

  // Fonction pour gérer le changement de tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefuserClick = (row) => {
    setSelectedRequest(row); // Définir la demande sélectionnée
    setOpenDialog(true); // Ouvrir le Dialog
  };


  const handleAccepterClick = (row) => {
    setSelectedAcceptRequest(row); // Définir la demande sélectionnée pour accepter
    setOpenAcceptDialog(true); // Ouvrir le Dialog d'acceptation
  };
  
  

  const columns = [
    { id: 'firstname', label: 'Firstname' },
    { id: 'lastname', label: 'Lastname' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    {
      id: 'options',
      label: 'Options',
      render: (row) => (
        <Stack direction="column" spacing={1}>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontSize: '0.7rem',
              padding: '4px 8px',
              width: '120px', // Fixer la largeur du bouton
            }}
            onClick={() => handleAccepterClick(row)}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              fontSize: '0.7rem',
              padding: '4px 8px',
              width: '120px', // Fixer la largeur du bouton
            }}
            onClick={() => handleRefuserClick(row)}
          >
            Supprimer
          </Button>
        </Stack>
      ),
    },
  ];
  

  useEffect(() => {
    const filtered = rows.filter((row) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        row.firstname.toLowerCase().includes(lowerSearchTerm) ||
        row.lastname.toLowerCase().includes(lowerSearchTerm) ||
        row.email.toLowerCase().includes(lowerSearchTerm) ||
        row.address.toLowerCase().includes(lowerSearchTerm) 
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, rows]);
  

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          "& .MuiTab-root": {
            color: "black", // couleur par défaut du texte
            "&:hover": {
              color: "gray", // couleur du texte au survol
            },
            "&.Mui-selected": {
              color: "gray", // couleur de l'onglet sélectionné
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "gray", // couleur du trait sous l'onglet sélectionné
          },
        }}
      >
        <Tab label="Liste des clubs" />
        <Tab label="Ajouter club" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <>
            <Typography variant="h6" component="h3"> Gerer vos clubs</Typography>
            <TextField
              label="Rechercher"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <SimpleTable columns={columns} data={filteredData} />
          </>
        )}
        {value === 1 && (
          <AdminAddClub/>
        )}
      </Box>
    </Box>
  );
};

export default AdminClub;


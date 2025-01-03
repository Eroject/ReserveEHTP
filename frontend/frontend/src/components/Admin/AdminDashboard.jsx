import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SimpleTable from '../SimpleTable';
import SearchIcon from '@mui/icons-material/Search';

const rows = [
  {
    id: 1,
    club: 'IT',
    dateReservation: '19 Mai 2021, 10:20 AM',
    heureDepart: '10:20',
    heureFin: '12:00',
    description: 'Exemple',
  },
  {
    id: 2,
    club: 'Sports',
    dateReservation: '20 Mai 2021, 2:00 PM',
    heureDepart: '14:00',
    heureFin: '15:30',
    description: 'Réunion',
  },
  {
    id: 3,
    club: 'Music',
    dateReservation: '21 Mai 2021, 3:00 PM',
    heureDepart: '15:00',
    heureFin: '16:30',
    description: 'Concert',
  },
  {
    id: 4,
    club: 'Photography',
    dateReservation: '18 Juin 2021, 3:30 PM',
    heureDepart: '15:30',
    heureFin: '17:00',
    description: 'Séance photo de groupe',
  },
  {
    id: 5,
    club: 'Science',
    dateReservation: '19 Juin 2021, 10:00 AM',
    heureDepart: '10:00',
    heureFin: '11:30',
    description: 'Conférence sur l’espace',
  },
  {
    id: 6,
    club: 'Dance',
    dateReservation: '20 Juin 2021, 5:00 PM',
    heureDepart: '17:00',
    heureFin: '18:30',
    description: 'Préparation pour le spectacle annuel',
  },
  {
    id: 7,
    club: 'Chess',
    dateReservation: '21 Juin 2021, 4:00 PM',
    heureDepart: '16:00',
    heureFin: '17:30',
    description: 'Tournoi interne de jeu d’échecs',
  },
  {
    id: 8,
    club: 'Environment',
    dateReservation: '22 Juin 2021, 8:30 AM',
    heureDepart: '08:30',
    heureFin: '10:00',
    description: 'Nettoyage et plantation d’arbres',
  },
  {
    id: 9,
    club: 'Drama',
    dateReservation: '23 Juin 2021, 6:00 PM',
    heureDepart: '18:00',
    heureFin: '19:30',
    description: 'Répétition de la pièce de théâtre',
  },
  {
    id: 10,
    club: 'Gaming',
    dateReservation: '24 Juin 2021, 2:30 PM',
    heureDepart: '14:30',
    heureFin: '16:00',
    description: 'Session multijoueur',
  },
];
/*

const AdminComponent = () => <SimpleTable columns={columns} data={rows} />;

export default AdminComponent;

*/ 



const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);  // Pour gérer l'ouverture du Dialog
  const [selectedRequest, setSelectedRequest] = useState(null);  // Pour stocker la demande sélectionnée
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false); // Pour gérer l'ouverture du Dialog pour accepter
const [selectedAcceptRequest, setSelectedAcceptRequest] = useState(null); // Pour stocker la demande sélectionnée pour accepter

  const handleRefuserClick = (row) => {
    setSelectedRequest(row); // Définir la demande sélectionnée
    setOpenDialog(true); // Ouvrir le Dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Fermer le Dialog
    setSelectedRequest(null); // Réinitialiser la demande sélectionnée
  };

  const handleConfirmerRefus = () => {
    // Logique pour refuser la demande ici
    console.log('Demande refusée:', selectedRequest);
    handleCloseDialog(); // Fermer le Dialog après confirmation
  };

  const handleAccepterClick = (row) => {
    setSelectedAcceptRequest(row); // Définir la demande sélectionnée pour accepter
    setOpenAcceptDialog(true); // Ouvrir le Dialog d'acceptation
  };
  
  const handleCloseAcceptDialog = () => {
    setOpenAcceptDialog(false); // Fermer le Dialog
    setSelectedAcceptRequest(null); // Réinitialiser la demande sélectionnée
  };
  
  const handleConfirmerAcceptation = () => {
    // Logique pour accepter la demande ici
    console.log('Demande acceptée:', selectedAcceptRequest);
    handleCloseAcceptDialog(); // Fermer le Dialog après confirmation
  };
  

  const columns = [
    { id: 'club', label: 'Club' },
    { id: 'dateReservation', label: 'Date de Réservation' },
    { id: 'heureDepart', label: 'Heure de Départ' },
    { id: 'heureFin', label: 'Heure de Fin' },
    { id: 'description', label: 'Description' },
    {
      id: 'options',
      label: 'Options',
      render: (row) => (
        <>
          <Stack direction="column" spacing={1}>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ fontSize: '0.7rem', padding: '4px 8px' }}
              onClick={() => handleAccepterClick(row)}  // Ouvrir le Dialog pour accepter
            >
              Accepter
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ fontSize: '0.7rem', padding: '4px 8px' }}
              onClick={() => handleRefuserClick(row)}  // Ouvrir le Dialog pour refuser
            >
              Refuser
            </Button>
          </Stack>
        </>
      ),
    },
    {
      id: 'documents',
      label: 'Documents',
      render: (row) => (
        <Button variant="contained" color="info" size="small">
          Détails
        </Button>
      ),
    },
  ];
  







  useEffect(() => {
    const filtered = rows.filter((row) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        row.club.toLowerCase().includes(lowerSearchTerm) ||
        row.dateReservation.toLowerCase().includes(lowerSearchTerm) ||
        row.heureDepart.toLowerCase().includes(lowerSearchTerm) ||
        row.heureFin.toLowerCase().includes(lowerSearchTerm) ||
        row.description.toLowerCase().includes(lowerSearchTerm)
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, rows]);

  /*useEffect(() => {
    DemandeApi.all().then(({ data }) => setData(data.data));
  }, []);*/


  return (
    <div>
      <Grid container spacing={3} justifyContent="space-between" mb={4}>
  <Grid item xs={4}>
    <div
      className="stats-card"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        minHeight: '150px',  // Hauteur personnalisée
        display: 'flex',     // Utilisation de flexbox pour centrer le contenu
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Nombre Demandes 1  <SupervisorAccountIcon fontSize="inherit" style={{ fontSize: '40px' }} />
    </div>
  </Grid>
  <Grid item xs={4}>
    <div
      className="stats-card"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        minHeight: '150px',  // Hauteur personnalisée
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Nombre Demandes 2 <SupervisorAccountIcon fontSize="inherit" style={{ fontSize: '40px' }} />
    </div>
  </Grid>
  <Grid item xs={4}>
    <div
      className="stats-card"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        minHeight: '150px',  // Hauteur personnalisée
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Nombre Demandes 3 <SupervisorAccountIcon fontSize="inherit" style={{ fontSize: '40px' }} />

    </div>
  </Grid>
</Grid>
      {/* Champ de recherche */}
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

      {/* Tableau */}
      <SimpleTable columns={columns} data={filteredData} />
    {/* Dialog de confirmation */}
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer le refus</DialogTitle>
        <DialogContent>
          <p>Êtes-vous sûr de vouloir refuser cette demande ?</p>
          {selectedRequest && (
            <div>
              <p><strong>Club :</strong> {selectedRequest.club}</p>
              <p><strong>Description :</strong> {selectedRequest.description}</p>
              <p><strong>Date de réservation :</strong> {selectedRequest.dateReservation}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmerRefus} color="error">
            Refuser
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAcceptDialog} onClose={handleCloseAcceptDialog}>
  <DialogTitle>Confirmer l'acceptation</DialogTitle>
  <DialogContent>
    <p>Êtes-vous sûr de vouloir accepter cette demande ?</p>
    {selectedAcceptRequest && (
      <div>
        <p><strong>Club :</strong> {selectedAcceptRequest.club}</p>
        <p><strong>Description :</strong> {selectedAcceptRequest.description}</p>
        <p><strong>Date de réservation :</strong> {selectedAcceptRequest.dateReservation}</p>
      </div>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseAcceptDialog} color="primary">
      Annuler
    </Button>
    <Button onClick={handleConfirmerAcceptation} color="success">
      Accepter
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default AdminDashboard;
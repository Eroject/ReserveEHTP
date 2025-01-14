import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SearchIcon from '@mui/icons-material/Search';
import SimpleTable from '../../components-commun-between-us/SimpleTable';
import DemandeApi from '../services/ApiPython/DemandeApi';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const rows = [
  {
    id: 1,
    club: 'IT',
    date_reservation: '19 Mai 2021, 10:20 AM',
    heure_depart: '10:20',
    heure_fin: '12:00',
    description: 'Exemple',
  },
  {
    id: 2,
    club: 'Sports',
    date_reservation: '20 Mai 2021, 2:00 PM',
    heure_depart: '14:00',
    heure_fin: '15:30',
    description: 'Réunion',
  },
  {
    id: 3,
    club: 'Music',
    date_reservation: '21 Mai 2021, 3:00 PM',
    heuree_dpart: '15:00',
    heure_fin: '16:30',
    description: 'Concert',
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
/*
  const handleConfirmerRefus = () => {
    // Logique pour refuser la demande ici
    DemandeApi.refuser(selectedRequest.id)
    if (status === 200) {
      // Mettez à jour les données de l'interface utilisateur si nécessaire
      setData(data.filter(d => d.id !== selectedRequest.id));

      console.log('Demande refusée avec succès:');
    } else {
      console.error("La demande de refus a échoué");
    }
    handleCloseDialog(); // Fermer le Dialog après confirmation
  };*/
  const handleConfirmerRefus = async () => {
    try {
      // Appel à l'API pour refuser la demande
      const response = await DemandeApi.refuser(selectedRequest.id);
  
      if (response.status === 200) {
        // Mettre à jour les données de l'interface utilisateur
        setData((prevData) => prevData.filter((d) => d.id !== selectedRequest.id));
        console.log('Demande refusée avec succès:', response.data);
      } else {
        console.error('La demande de refus a échoué :', response.statusText);
      }
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors du refus de la demande :', error);
    } finally {
      // Fermer le Dialog après confirmation
      handleCloseDialog();
    }
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
    { id: 'date_reservation', label: 'Date de Réservation' },
    { id: 'heure_depart', label: 'Heure de Départ' },
    { id: 'heure_fin', label: 'Heure de Fin' },
    { id: 'description', label: 'Description' },
    { id: 'date_creation', label: 'Date de Création' },
    {
      id: 'options',
      label: 'Options',
      render: (row) => (/*
        <Stack direction="column" spacing={1}>
          <IconButton
  color="success"
  size="small"
  onClick={() => handleAccepterClick(row)}
>
  <CheckIcon  />
</IconButton>
<IconButton
  color="error"
  size="small"
  onClick={() => handleRefuserClick(row)}
>
  <CloseIcon  />
</IconButton>
        </Stack>*/
        <Stack direction="row" spacing={1} alignItems="center">
  <Tooltip title="Accepter" arrow>
    <IconButton
      color="success"
      size="medium"
      onClick={() => handleAccepterClick(row)}
    >
      <CheckIcon style={{ fontSize: '2rem' }} />
    </IconButton>
  </Tooltip>
  <Tooltip title="Refuser" arrow>
    <IconButton
      color="error"
      size="medium"
      onClick={() => handleRefuserClick(row)}
    >
      <CloseIcon style={{ fontSize: '2rem' }} />
    </IconButton>
  </Tooltip>
</Stack>

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
  
  

/*

  useEffect(() => {
    DemandeApi.getDemande().then(({ data }) => setData(data));
  }, []);
  
*/


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
  <div>hh</div>
</Dialog>
    </div>
  );
};

export default AdminDashboard;
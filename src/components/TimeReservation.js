import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Icône triangle
import { TimePicker } from '@mui/x-date-pickers/TimePicker'; // MUI TimePicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import "./../styles/TimeReservation.css";

export default function TimeReservation({ type, onSelectTime , value}) {
  const [isCardOpen, setIsCardOpen] = useState(true);
  //const [selectedTime, setSelectedTime] = useState(null);
  //const cardRef = useRef(null);
  //const timePickerRef = useRef(null); // Ajout d'un ref pour le TimePicker

  // Gérer l'ouverture et la fermeture de la carte
  // const handleClick = () => {
  //   setIsCardOpen((prev) => !prev); // Inverser l'état de la carte
  // };

  // Gérer le changement d'heure sélectionnée
  const handleTimeChange = (time) => {
    //setSelectedTime(time);
    if (onSelectTime) {
      onSelectTime(time);
    }
  };

  // Gérer le clic en dehors de la carte
  // const handleClickOutside = (event) => {
  //   //Vérifier si le clic est en dehors du cardRef ET du timePickerRef
  //   if (
  //     cardRef.current && 
  //     !cardRef.current.contains(event.target) && 
  //      timePickerRef.current && 
  //     !timePickerRef.current.contains(event.target)
  //   ) {
  //     setIsCardOpen(false); // Fermer la carte si le clic est en dehors
  //   }
    
    
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} id="timeReservation">
      {/* Bouton avec l'icône triangle */}
      {/*<Button
        
        //onClick={handleClick}
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        sx={{ width: 200, display: 'flex', justifyContent: 'space-between' }}
      >
        {type === 'start' ? 'Heure de début' : 'Heure de fin'}
        <AccessTimeIcon />
      </Button>*/}

      {/* Affichage de la carte contenant le TimePicker */}
      {/*{isCardOpen && (
        {/*<Card  sx={{ width: '300px', padding: 3, marginTop: 2 }}>*/}
          <LocalizationProvider dateAdapter={AdapterDateFns}  >
            {/* Passer le ref à TimePicker */}
            <TimePicker
             
              label={type === 'start' ? 'heure de début' : 'heure de fin'}
              value={value}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          {/* Affichage de l'heure sélectionnée 
          {selectedTime && (
            <Box sx={{ marginTop: 2 }}>
              <p>
                {type === 'start' ? 'Heure de début : ' : 'Heure de fin : '}
                {selectedTime.toLocaleTimeString()}
              </p>
            </Box>
          )}*/}
        {/*</Card>*/}
      {/*)}*/}
    </Box>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Button, Card } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';  
import "./../styles/CalendarReservation.css";

export default function CalendarReservation ({onSelectDate}) {
  const [isCardOpen, setIsCardOpen] = useState(false); // Contrôle l'affichage de la carte
  const [selectedDate, setSelectedDate] = useState(null); // État pour la date sélectionnée
  const cardRef = useRef(null);

  // Fonction pour ouvrir ou fermer la carte
  const handleClick = () => {
    setIsCardOpen(!isCardOpen); // Inverser l'état de la carte
  };

  // Fonction de gestion de la sélection de la date
  const handleDateChange = (date) => {
    setSelectedDate(date); // Mettre à jour la date sélectionnée
    setIsCardOpen(false); // Fermer la carte après la sélection
    if(onSelectDate){
      onSelectDate(date);
    }
  };

  //gestion du clic en dehors de la carte du calendrier
  const handleClickOutside = (event) => {
    //Vérifier si le clic est en dehors du cardRef ET du timePickerRef
    if (
      cardRef.current && 
      !cardRef.current.contains(event.target)  
       
    ) {
      setIsCardOpen(false); // Fermer la carte si le clic est en dehors
    }
    
    
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    
    <Box id="calendarRequestBox">
      {/* Bouton avec icône de triangle */}
      <Button onClick={handleClick} variant="outlined"  className="calendar-reservation-button">
      <span>{selectedDate ? selectedDate.toLocaleDateString('fr-FR') : "Date"}</span>
     <ExpandMore sx={{ marginLeft: '8px' }} id="icone-triangle"/>
      </Button>

      {/* Affichage de la carte contenant le calendrier */}
      {isCardOpen && (
        <Box id="calendarRequestBox2">
          <Card 
          ref={cardRef}    >
            <Calendar
           
              onChange={handleDateChange}
              value={selectedDate}
            />
          </Card>
        </Box>
      )}

    </Box>
  );
};
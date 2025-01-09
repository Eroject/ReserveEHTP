import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'; 
import "./../styles/RoomsDropDown.css";


export default function RoomsDropDown({onSelect}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('salle');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setAnchorEl(null); // Close the menu after selection
    if (onSelect) {
      onSelect(option); // Appeler la fonction passée par le parent
    }
  };

  return (
    <div id="roomsDropDown">
      <Button onClick={handleClick} >
        <span>{selectedOption}</span>
        <ExpandMore sx={{ marginLeft: '8px' }} id="icone-triangle"/>
        </Button>
      <Menu
        className='menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle de conférence')}>salle de conférences</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('Amphi 1')}>Amphi 1</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('Amphi 2')}>Amphi 2</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('Amphi 3')}>Amphi 3</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('Amphi 4')}>Amphi 4</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 1')}>salle 1</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 2')}>salle 2</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 3')}>salle 3</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 4')}>salle 4</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 5')}>salle 5</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 6')}>salle 6</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 7')}>salle 7</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 8')}>salle 8</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 9')}>salle 9</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 10')}>salle 10</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 11')}>salle 11</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 12')}>salle 12</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 13')}>salle 13</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 14')}>salle 14</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 15')}>salle 15</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 16')}>salle 16</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 17')}>salle 17</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 18')}>salle 18</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 19')}>salle 19</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 20')}>salle 20</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 21')}>salle 21</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 22')}>salle 22</MenuItem>
        <MenuItem className="menu-item" onClick={() => handleSelectOption('salle 23')}>salle 23</MenuItem>
      </Menu>
      
    </div>
  );
};



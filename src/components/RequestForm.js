import React, { useState } from "react";
import { useForm , reset} from "react-hook-form";
import RoomsDropDown from "./RoomsDropDown";
import CalendarReservation from "./CalendarReservation";
import TimeReservation from "./TimeReservation";
import "./../styles/RequestForm.css";
import { fr } from "date-fns/locale";


export default function RequestForm() {
  const [formData, setFormData] = useState({
    idClub: "1",
    salle: "",
    date:null,
    heureDebut: null,
    heureFin: null,
    evenement: "",
    description: "",
    fichier: null, // Inclut le fichier
  });

  

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Gestion de la soumission
  const onSubmit = () => {
    const formDataToSend = new FormData();

    // Ajout de tous les champs de formData dans FormData
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Vérifier les données dans la console avant l'envoi
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    // Envoi des données via fetch
    fetch("https://your-backend-api.com/endpoint", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => console.log("Succès :", data))
      .catch((err) => console.error("Erreur :", err));
    

      setFormData({
        idClub: "1",
        salle: "",
        date:null,
        heureDebut: null,
        heureFin: null,
        evenement: "",
        description: "",
        fichier: null, // Inclut le fichier
      });

    
      
    
      
  };

  // Gestion des changements de fichier
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData((prev) => ({ ...prev, fichier: selectedFile }));
  };

  // Gestion des changements pour chaque champ
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
      <div className="form-input-group">
      <div className="form-row" id="information">
      <RoomsDropDown
      value={formData.salle} 
        onSelect={(room) => handleChange("salle", room)} 
      />

      {/* Sélection de la date */}
      <CalendarReservation
      value={formData.date}
        onSelectDate={(date) => handleChange("date", date)}
      />

      {/* Sélection de l'heure */}
      <TimeReservation
      value={formData.heureDebut}
        type="start"
        onSelectTime={(time) => handleChange("heureDebut", time)}
      />
      <TimeReservation
      value={formData.heureFin}
        type="end"
        onSelectTime={(time) => handleChange("heureFin", time)}
      />
      </div>

      {/* Champ pour le titre de l'événement */}
      <div class="form-row" id="eventInput" >
        <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700" >
          Evénement
        </label>
        <input
          type="text"
          id="eventTitle"
          value={formData.evenement}
          onChange={(e) => handleChange("evenement", e.target.value)}
          placeholder="Événement"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Champ pour la description */}
      <div class="form-row" id="descriptionInput">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description de l'événement"
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        ></textarea>
      </div>

      {/* Champ pour les fichiers */}
      <div class="form-row" id="documentInput">
        <label htmlFor="document" className="block text-sm font-medium text-gray-700">
          Pièces jointes
        </label>
        <input
          type="file"
          id="document"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        />
        {/*{formData.fichier && <p className="text-sm text-gray-600">Fichier sélectionné: {formData.fichier.name}</p>}*/}
      </div>

      {/* Bouton d'envoi */}
      <div id="submitSendRequestForm">
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Soumettre
        </button>
        
      </div>
      </div>
    </form>
  );
}

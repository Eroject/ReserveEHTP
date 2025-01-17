import React, { useState } from "react";
import { useForm , reset} from "react-hook-form";
import RoomsDropDown from "./RoomsDropDown";
import CalendarReservation from "./CalendarReservation";
import TimeReservation from "./TimeReservation";
import "./../styles/RequestForm.css";
import { fr } from "date-fns/locale";
import { ToastContainer,toast } from "react-toastify";
import { FormControl } from "@mui/material";


export default function RequestForm() {
  const [formData, setFormData] = useState({
    
    // salle: "",
    // date:null,
    // heureDebut: null,
    // heureFin: null,
    // evenement: "",
    // description: "",
    // fichier: null, // Inclut le fichier

    numero_salle: "",
          mail_demandeur:"club@gmail.com",
          date_reservation:null,
          heure_depart: null,
          heure_fin: null,
          description: "",
          //evenement: "event",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Indique si le formulaire est en cours de soumission
  // Taille maximale (en octets) : ici 10 Mo
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const BASE_URL = "http://192.168.157.233:8000/api";

  

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Gestion de la soumission
  const onSubmit = async  () => {

    // if(//formData.evenement==="" ||formData.salle==="" || formData.date===null || formData.heureDebut===null || formData.heureFin===null)
    //   formData.numero_salle==="" || formData.date_reservation===null || formData.heure_depart===null || formData.heure_fin===null)
    //   {
    //   toast('Veuillez remplir tous les champs obligatoires',{position: "top-center",});
    // }

    //else if(formData.numero_salle!=="" && formData.date_reservation!==null && formData.heure_depart!==null && formData.heure_fin!==null){
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
    try{
    const response = await fetch(`${BASE_URL}/demandes/club/ `, {
      method: "POST",
      body: formDataToSend,
    });
  
      // .then((res) => res.json())
      // .then((data) => console.log("Succès :", data))
      // .catch((err) => console.error("Erreur :", err));
    
      // Affiche les détails de la réponse
    
      if (response.ok) {
        const data = await response.json();
        toast.success("Formulaire envoyé avec succès !",{position: "top-center",});
        setFormData({
          
          mail_demandeur:"club@gmail.com",
          date_reservation:null,
          heure_depart: null,
          heure_fin: null,
          description: "",
          //evenement: "",
          //fichier: null, // Inclut le fichier
        });
  
        //document.getElementById("document").value = "";
  
      } else {
        const errorData = await response.json();
        toast.error("Erreur lors de l'envoi du formulaire.",{position: "top-center",});
      }
    //}
    }catch (err) {
      console.error("Erreur réseau :", err);
      toast.error("Erreur réseau ou problème serveur.", { position: "top-center" });
    } finally {
      setIsSubmitting(false); // Désactiver le chargement
    }
  };

  // Gestion des changements de fichier
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Vérification du type de fichier
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast("Type de fichier non autorisé. Seuls PNG, JPEG et PDF sont acceptés.",{position: "top-center",});
        setFormData((prev) => ({ ...prev, fichier: null }));
        document.getElementById("document").value = "";
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast("La taille du fichier dépasse la limite de 10 Mo.",{position: "top-center",});
        setFormData((prev) => ({ ...prev, fichier: null }));
        document.getElementById("document").value = "";
      }
      else{
      setFormData((prev) => ({ ...prev, fichier: selectedFile }));
      }
    
    
  };
}

  // Gestion des changements pour chaque champ
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
      <div className="form-input-group">
      <div className="form-row" id="information">
       
      <RoomsDropDown
      value={formData.numero_salle} 
        onSelect={(room) => handleChange("numero_salle", room)} 
      />
      <div id="etoileObligation"><span>*</span></div>

      {/* Sélection de la date */}
      <CalendarReservation
      value={formData.date_reservation}
        onSelectDate={(date) => handleChange("date_reservation", date)}
      />
      <div id="etoileObligation">*</div>
      

      {/* Sélection de l'heure */}
      <TimeReservation
      value={formData.heure_depart}
        type="start"
        onSelectTime={(time) => handleChange("heure_depart", time)}
      />
      <div id="etoileObligation">*</div>
      <TimeReservation
      value={formData.heure_fin}
        type="end"
        onSelectTime={(time) => handleChange("heure_fin", time)}
      />
      <div id="etoileObligation">*</div>
      </div>

      {/* Champ pour le titre de l'événement */}
      {/*<div class="form-row" id="eventInput" >
        <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700" style={{display:"flex"}}>
          Evénement
          <div id="etoileObligation" style={{marginLeft:"1%"}}>*</div>
        </label>
        <div style={{display:"flex"}}>
        <input
          type="text"
          id="eventTitle"
          value={formData.evenement}
          onChange={(e) => handleChange("evenement", e.target.value)}
          placeholder="Événement"
    
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        />
        
        </div>
      </div>*}

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
      {/*<div class="form-row" id="documentInput">
        <label htmlFor="document" className="block text-sm font-medium text-gray-700">
          Pièces jointes
        </label>
        <input
          type="file"
          id="document"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        />
        {/*{formData.fichier && <p className="text-sm text-gray-600">Fichier sélectionné: {formData.fichier.name}</p>}*/}
      {/*</div>*/}

      {/* Bouton d'envoi */}
      <div id="submitSendRequestForm">
        
      <button
  type="submit"
  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
    isSubmitting
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
  }`}
  disabled={isSubmitting} // Désactiver pendant le traitement
>
  {isSubmitting ? (
    <>
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      Envoi...
    </>
  ) : (
    "Soumettre"
  )}
</button>

        
      </div>
      </div>
      <ToastContainer/>
    </form>
  );
}

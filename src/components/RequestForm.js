import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RoomsDropDown from "./RoomsDropDown";
import CalendarReservation from "./CalendarReservation";
import TimeReservation from "./TimeReservation";
import "./../styles/RequestForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestForm() {
  const [formData, setFormData] = useState({
    numero_salle: "",
    mail_demandeur: "club@gmail.com",
    date_reservation: null,
    heure_depart: null,
    heure_fin: null,
    description: "",
    evenement: "",
    fichier: null, // Stocke les données encodées en base64
    fichier_metadata: null, // Stocke le nom et le type du fichier
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const BASE_URL = "http://192.168.157.233:8000/api";

  const { handleSubmit } = useForm();

  const validateForm = () => {
    const { numero_salle, date_reservation, heure_depart, heure_fin, evenement } = formData;
    if (!numero_salle || !date_reservation || !heure_depart || !heure_fin || !evenement) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error(
          "Type de fichier non autorisé. Seuls PNG, JPEG et PDF sont acceptés.",
          { position: "top-center" }
        );
        setFormData((prev) => ({ ...prev, fichier: null, fichier_metadata: null }));
        document.getElementById("document").value = "";
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error(`La taille du fichier dépasse la limite de ${MAX_FILE_SIZE} Mo.`, {
          position: "top-center",
        });
        setFormData((prev) => ({ ...prev, fichier: null, fichier_metadata: null }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          fichier: reader.result.split(",")[1], // Enregistrer uniquement les données base64
          fichier_metadata: {
            name: selectedFile.name,
            type: selectedFile.type,
          },
        }));
      };
      reader.readAsDataURL(selectedFile); // Convertir le fichier en base64
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "fichier" && value) {
        formDataToSend.append(
          key,
          JSON.stringify({
            base64: value,
            filename: formData.fichier_metadata.name,
            type: formData.fichier_metadata.type,
          })
        );
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      setIsSubmitting(true);
      const response = await fetch(`${BASE_URL}/demandes/club/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Formulaire envoyé avec succès !", {
          position: "top-center",
        });
        setFormData({
          numero_salle: "",
          mail_demandeur: "club@gmail.com",
          date_reservation: null,
          heure_depart: null,
          heure_fin: null,
          description: "",
          evenement: "",
          fichier: null,
          fichier_metadata: null,
        });
        document.getElementById("document").value = "";
      } else {
        const errorData = await response.json();
        console.error("Erreur : ", errorData);
        toast.error("Erreur lors de l'envoi du formulaire.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      toast.error("Erreur! Réssayer, formulaire non soumis", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-input-group">
        <div className="form-row" id="information">
          <div  style={{display:"block"}} id="bloc">
          <div>Salle <span id="etoileObligation1">*</span></div>
          
          <RoomsDropDown
            value={formData.numero_salle}
            onSelect={(room) => handleChange("numero_salle", room)}
          />
          
          </div>
          <div  style={{display:"block", marginTop:"2%"}} id="bloc">
          <div style={{marginLeft:"9%"}}>Date <span id="etoileObligation1">*</span></div>
          <CalendarReservation
            value={formData.date_reservation}
            onSelectDate={(date) => handleChange("date_reservation", date)}
          />
</div>

<div  style={{display:"block"}} id="bloc">
          <div>Heure début <span id="etoileObligation1">*</span></div>
          <TimeReservation
            value={formData.heure_depart}
            type="start"
            onSelectTime={(time) => handleChange("heure_depart", time)}
          />
          </div>
          <div  style={{display:"block"}} id="bloc">
          <div>Heure fin <span id="etoileObligation1">*</span></div>
          <TimeReservation
            value={formData.heure_fin}
            type="end"
            onSelectTime={(time) => handleChange("heure_fin", time)}
          />
          </div>
        </div>

        <div className="form-row" id="eventInput">
          <label htmlFor="eventTitle">
            Evénement <span id="etoileObligation">*</span>
          </label>
          <input
            type="text"
            id="eventTitle"
            value={formData.evenement}
            onChange={(e) => handleChange("evenement", e.target.value)}
            placeholder="Événement"
          />
        </div>

        <div className="form-row" id="descriptionInput">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description de l'événement"
          ></textarea>
        </div>

        <div className="form-row" id="documentInput">
          <label htmlFor="document">Pièces jointes</label>
          <input
            type="file"
            id="document"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-submit ${isSubmitting ? "loading" : "bg-purple-600"}`
          
        }
        id="submitSendRequestForm"
        >
          {isSubmitting ? "Envoi..." : "Soumettre"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
}

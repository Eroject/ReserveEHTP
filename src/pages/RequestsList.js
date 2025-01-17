import React, { useState, useEffect } from "react";
import "./../styles/RequestsList.css";

export default function RequestsList(){
  // État pour stocker les données
  const [listeDemandes, setlisteDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(5); // Nombre d'éléments par page
  const [totalPages, setTotalPages] = useState(8); // Nombre total de pages

  
  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  // Appel API dans useEffect
  useEffect(() => {
    // Définir une fonction pour l'appel API
    const fetchData = async () => {
        try {
          const response = await fetch("https://api.example.com/endpoint");
          const result = await response.json();
          setlisteDemandes(result); // Mettre à jour les données
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

    fetchData(); // Appeler la fonction
  }, []); // Le tableau vide signifie que l'effet ne sera exécuté qu'une fois

  // Affichage conditionnel
  {/*if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;*/}

  return (
    <div id="requestsList">
      <div>
      <h2>Historique des demandes</h2>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Evénement</th>
          <th>Salle</th>
          <th>Date</th>
          <th>Heure Début</th>
          <th>Heure Fin</th>
          <th>Etat</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* Parcourir les données pour les afficher */}
        {listeDemandes.map((item) => (
  <tr key={item.id}>  {/* It's a good idea to add a unique key for each row */}
    <td>{item.evenement}</td>
    <td>{item.salle}</td>
    <td>{item.date}</td>
    <td>{item.heureDebut}</td>
    <td>{item.heureFin}</td>
    <td>{item.etat}</td>
    <td>icone de suppression</td>
  </tr>
))}

        </tbody>
      </table>
    </div>

     {/* Pagination */}
     <div style={{ marginTop: "10px" }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  margin: "0 5px",
                  backgroundColor: currentPage === index + 1 ? "#007bff" : "#fff",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                  border: "1px solid #ccc",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
         </div>
  );
};


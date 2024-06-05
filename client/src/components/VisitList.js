import React, { useEffect, useState } from "react";
import VisitCard from "./VisitCard";
import PetVisitCard from "./PetVisitCard";

function VisitList({ ownerId, petId, context }) {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    let url = "";
    if (ownerId) {
      url = `/api/owners/${ownerId}`;
    } else if (petId) {
      url = `/api/pets/${petId}`;
    }

    if (url) {
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          if (data.visits) {
            setVisits(data.visits);
          }
        });
    }
  }, [ownerId, petId]);

  console.log(visits);

  const visitCards = visits.map((visit) =>
    context === "owner" ? (
      <VisitCard
        key={visit.id}
        date={visit.date}
        pet={visit.pet.name}
        sitter={visit.sitter.name}
        id={visit.id}
      />
    ) : (
      <PetVisitCard
        key={visit.id}
        date={visit.date}
        sitter={visit.sitter.name}
        time={visit.check_in_time}
        visit_notes={visit.visit_notes}
      />
    )
  );

  return <div className="visits-container">{visitCards}</div>;
}

export default VisitList;

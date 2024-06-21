import React, { useState, useEffect } from "react";

function NewRoutineForm({ routines, userId, setRoutines, setAddRoutine, setSuccess }) {
  const [routineName, setRoutineName] = useState("");

  const handleAddRoutine = (newRoutine) => {
    setRoutines([...routines, newRoutine]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newRoutine = {
      routine_name: routineName,
      user_id: userId,
    };

    fetch(`/api/routinetemplates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoutine),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to add routine");
      })
      .then((newRoutine) => {
        handleAddRoutine(newRoutine);
        setRoutineName("");
        setSuccess("Routine Created Successfully!");
        setAddRoutine(null);
      })
      .catch((error) => {
        console.error("Error adding routine:", error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Routine Name"
        />
        <button type="submit">Create Routine</button>
        <button onClick={() => setAddRoutine(null)}>Cancel</button>{" "}
      </form>
    </div>
  );
}

export default NewRoutineForm;

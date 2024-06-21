import React, { useState, useEffect } from "react";

function EditRoutineForm({
  routine,
  userId,
  setEditSuccess,
  routines,
  setEditRoutine,
  setRoutines,
}) {
  const [routineName, setRoutineName] = useState("");

  useEffect(() => {
    if (routine) {
      setRoutineName(routine.routine_name);
    }
  }, [routine]);

  const handleEditRoutine = (updatedRoutine) => {
    setRoutines(
      routines.map((routine) => (routine.id === updatedRoutine.id ? updatedRoutine : routine))
    );
    setEditRoutine(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const updatedRoutine = {
      routine_name: routineName,
      user_id: userId,
    };

    fetch(`/api/routinetemplates/${routine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRoutine),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to update routine");
      })
      .then((updatedRoutine) => {
        handleEditRoutine(updatedRoutine);
        setEditSuccess("Routine Updated!");
      })
      .catch((error) => {
        console.error("Error updating routine:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        placeholder="Routine Name"
      />
      <button type="submit">Update Routine</button>
      <button onClick={() => setEditRoutine(null)}>Cancel</button>
    </form>
  );
}

export default EditRoutineForm;

import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useState([]);

  // Add Schedule
const addSchedule = (schedule) => {
  const newSchedule = {
    id: Date.now(),
    status: "Pending",
    ...schedule,
  };

  console.log("Adding Schedule:", newSchedule);

  setSchedules((prev) => {
    const updated = [...prev, newSchedule];
    console.log("Updated Schedules:", updated);
    return updated;
  });
};

  // Delete Schedule
  const deleteSchedule = (id) => {
    setSchedules((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Complete Schedule
  const completeSchedule = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Completed" }
          : item
      )
    );
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
        deleteSchedule,
        completeSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  return useContext(ScheduleContext);
}
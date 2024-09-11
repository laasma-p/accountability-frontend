import { useState } from "react";

// Array of day names starting from Monday
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  // State to hold the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Getting the first day of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Getting the day of the week of the first day of the month
  // Adjusting to start the week on Monday (0 = Sunday, 1 = Monday and so on and so forth)
  const startDay = (startOfMonth.getDay() + 6) % 7;

  // Get the last day of the current month
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Total number of days in the current month
  const totalDays = endOfMonth.getDate();

  // Array to hold all the days to be displayed in the calendar
  const daysArray = [];

  // Fill in the days of the previous month, ensuring the calendar starts on the correct weekday
  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push("");
  }

  // Fill in the days of the current month
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  const totalCells = 42;

  // Add days from the next month to the calendar to fill the grid
  while (daysArray.length < totalCells) {
    daysArray.push("");
  }

  return (
    <div>
      <header>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
        >
          Prev
        </button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
        >
          Next
        </button>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
        }}
      >
        {days.map((day) => {
          return (
            <div key={day} style={{ textAlign: "center", fontWeight: "bold" }}>
              {day}
            </div>
          );
        })}
        {daysArray.map((day, index) => {
          return (
            <div key={index} style={{ textAlign: "center" }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

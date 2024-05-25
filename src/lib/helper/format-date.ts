import { useState, useEffect } from "react";

function formatDate(date: string) {
  // Define arrays for month names and corresponding abbreviations
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, and year from the Date object
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = monthNames[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  // Concatenate the components into the desired format
  return `${day} ${month} ${year}`;
}

export { formatDate };

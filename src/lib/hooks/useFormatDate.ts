import { useState, useEffect } from "react";

function formatDate(date: Date) {
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
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Concatenate the components into the desired format
  return `${day} ${month} ${year}`;
}

export { formatDate };

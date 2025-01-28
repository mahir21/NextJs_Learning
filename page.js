"use client"; // Enables client-side rendering
import { useState, useEffect } from "react";

export default function CSRPage() {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data on the client
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Replace with a valid URL
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      } finally {
        setLoading(false); // Ensure loading is false regardless of success or failure
      }
    }

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to run once

  // Show a loading message while fetching data
  if (loading) return <p>Loading...</p>;

  // Render the data once it's fetched
  return (
    <div>
      <h1>Client-Side Rendering</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

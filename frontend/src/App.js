import React, { useEffect, useState } from "react";
import MyTable from "./components/MyTable";

function App() {
  const [data, setData] = useState({});

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
        <h1>{data.message}</h1>
        <MyTable />
        <button type="button" className="btn btn-primary" onClick={fetchData}>
          Prueba
        </button>
    </div>
  );
}

export default App;

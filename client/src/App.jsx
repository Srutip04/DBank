// import { EthProvider } from "./contexts/EthContext";
import React, { useState } from "react";
import NavBar from "./components/navbar";
import "./App.css";


function App() {
  const [account,setAccount] = useState("0x0");
  return (
    <div id="App">
      <NavBar account={account} />
     
    </div>
  );
}

export default App;

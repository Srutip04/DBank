// import { EthProvider } from "./contexts/EthContext";
import React, { useState,useEffect } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Web3 from 'web3';


function App() {
  const [account,setAccount] = useState("0x0");

  const loadWeb3 = async () =>{
     if(window.ethereuem){
      window.web3 = new Web3(window.ethereuem);
      await window.ethereuem.enable();
     }else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
     }else{
      window.alert('No ethereum browser detected! check out metamask');
     }
  }

  const loadBlockchainData = async()=>{
    const web3 = window.web3;
    const account = await web3.eth.getAccounts()
    console.log(account);
  }

  useEffect(() => {  
    loadWeb3();
    loadBlockchainData()
  }, [])
  
  return (
    <div id="App">
      <NavBar account={account} />
     
    </div>
  );
}

export default App;

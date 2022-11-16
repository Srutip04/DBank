// import { EthProvider } from "./contexts/EthContext";
import React, {useState,useEffect } from "react";
// import useSafeState from "react-use-safe-state";
import NavBar from "./components/navbar";
import Main from "./components/main";
import "./App.css";
import Web3 from 'web3';
import Tether from "./contracts/Tether.json";
import RWD from "./contracts/RWD.json";
import DecentralBank from "./contracts/DecentralBank.json";
import Container from "react-bootstrap/Container";


function App() {
  const [account,setAccount] = useState("0x0");
  const [tether,setTether] = useState({});
  const [rwd,setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBal,setTetherBal] = useState('0');
  const [rwdBal, setRwdBal] = useState("0");
  const [stakingBal, setStakingBal] = useState("0");
  const [loading,setLoading] = useState(true);
  
  //load web3
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
  
  //load blockchain data
  const loadBlockchainData = async()=>{
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log(accounts[0],"Account Number");
    const networkId = await web3.eth.net.getId();
    console.log(networkId, "Network ID");

    //Load Tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether({ tether });
      let tetherBalance = await tether.methods.balanceOf(account).call();
      setTetherBal({ tetherBalance: tetherBalance.toString() });
      console.log(tetherBal);
    } else {
      window.alert("tether contract not deployed to detect network");
    }

    //Load RWD contract
    const rwdTokenData = RWD.networks[networkId];
    if (rwdTokenData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdTokenData.address);
      setRwd({ rwd });
      let rwdTokenBalance = await rwd.methods.balanceOf(account).call();
      setRwdBal({ rwdTokenBalance: rwdTokenBalance.toString() });
      console.log(rwdBal);
    } else {
      window.alert("Reward Token contract not deployed to detect network");
    }

  

    //Load DecentralBank
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      setDecentralBank({ decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(account)
        .call();
      setStakingBal({ stakingBalance: stakingBalance.toString() });
      console.log(stakingBal,"Staking Balance");
    } else {
      window.alert("TokenForm contract not deployed to detect network");
    }

    setLoading(false);
    console.log(loading);
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    
  }, []);
  // let content;
  // {loading ? content = <p id="loader" className="text-center" style={{margin: "30px"}}>Loading Please....</p> : content = <Main/>}
  
  return (
    <div id="App">
      <NavBar account={account} />
      <Container className="m-5 ">
        {" "}
        <Main
          tetherBalance={tetherBal}
          rwdBalance={rwdBal}
          stakingBalance={stakingBal}
        />
        {/* {content} */}
      </Container>
    </div>
  );
}

export default App;

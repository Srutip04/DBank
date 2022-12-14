// import { EthProvider } from "./contexts/EthContext";
import React, { Component } from "react";
// import useSafeState from "react-use-safe-state";
import NavBar from "./components/navbar";
import Main from "./components/main";
import "./App.css";
import Web3 from "web3";
import Tether from "./contracts/Tether.json";
import RWD from "./contracts/RWD.json";
import DecentralBank from "./contracts/DecentralBank.json";
import Container from "react-bootstrap/Container";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //load blockchain data
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    console.log(networkId, "Network ID");

    //Load Tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
      console.log(tetherBalance);
    } else {
      window.alert("tether contract not deployed to detect network");
    }

    //Load RWD contract
    const rwdTokenData = RWD.networks[networkId];
    if (rwdTokenData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdTokenData.address);
      this.setState({ RWD });
      let rwdTokenBalance = await rwd.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ rwdTokenBalance: rwdTokenBalance.toString() });
      console.log(rwdTokenBalance);
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
      this.setState({ decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
      console.log(stakingBalance, "Staking Balance");
    } else {
      window.alert("TokenForm contract not deployed to detect network");
    }

    this.setState({ loading: false });
  }
  //load web3
  async loadWeb3() {
    if (window.ethereuem) {
      window.web3 = new Web3(window.ethereuem);
      await window.ethereuem.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! check out metamask");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;

    {
      this.state.loading
        ? (content = (
            <p
              id="loader"
              className="text-center"
              style={{ color: "white", margin: "30px" }}
            >
              LOADING PLEASE...
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdTokenBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
              decentralBankContract={this.decentralBank}
            />
          ));
    }
    return (
      <div id="App" style={{ position: "relative" }}>
        <NavBar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
  // let content;
  // {loading ? content = <p id="loader" className="text-center" style={{margin: "30px"}}>Loading Please....</p> : content = <Main/>}
}

export default App;

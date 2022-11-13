import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const NavBar = (props) =>{
    return (
      <Navbar bg="dark " variant="dark" style={{ height: "50px" }}>
        <Container>
          <Navbar.Brand style={{ fontSize: "25px" }}>
            <AccountBalanceIcon fontSize="large" /> Decentralized Banking
          </Navbar.Brand>
          <Nav className="px-3  d-sm-block">
            <Nav.Link style={{ fontSize: "18px" }}>
              {" "}
              <AccountBalanceWalletIcon fontSize="large" />
              <span>Account Number:</span> {props.account}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar;
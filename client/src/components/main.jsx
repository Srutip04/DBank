import React from "react";
import Container from 'react-bootstrap/Container';
import Table from "react-bootstrap/Table";


const Main = () =>{
    return (
      <Container className="m-5 text-center" style={{ fontSize: "18px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ fontSize: "18px" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> USDT</td>
              <td>RWD</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
}

export default Main;
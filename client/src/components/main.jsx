import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { SiEthereum } from "react-icons/si";
import Stack from "react-bootstrap/Stack";

class Main extends Component {
  // console.log(props.tetherBalance)
  render(){
    return (
      <Container className="m-5" style={{ fontSize: "18px" }}>
        <Table className="text-center" striped bordered hover variant="dark">
          <thead>
            <tr style={{ fontSize: "18px" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                USDT
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD
              </td>
            </tr>
          </tbody>
        </Table>
        <Card className="mb-2" border="dark">
          <Form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
          >
            <Container style={{ borderSpacing: "0 1em" }}>
              <Row xs={1} md={2}>
                <Col>
                  <Form.Label
                    className="float-left"
                    style={{ marginLeft: "15px" }}
                  >
                    <b>Stake Tokens</b>
                  </Form.Label>
                </Col>
                <Col>
                  <span className="float-right" style={{ marginRight: "22px" }}>
                    <b>
                      Balance:{" "}
                      {window.web3.utils.fromWei(
                        this.props.tetherBalance,
                        "Ether"
                      )}{" "}
                    </b>
                  </span>
                </Col>
              </Row>

              <InputGroup className="mb-4" size="lg" style={{ width: "250px" }}>
                <Form.Control
                  ref={(input) => {
                    this.input = input;
                  }}
                  placeholder="0"
                  type="text"
                  aria-label="stake token"
                  aria-describedby="basic-addon1"
                />

                <InputGroup.Text>
                  <SiEthereum />
                </InputGroup.Text>
                <InputGroup.Text>USDT</InputGroup.Text>
              </InputGroup>
              <Stack gap={2} className="col-md-5 mx-auto">
                <Button
                  variant="primary"
                  size="lg"
                  value="Submit"
                  type="submit"
                >
                  <b>DEPOSIT</b>
                </Button>
              </Stack>
            </Container>
          </Form>
          <Stack gap={2} className="col-md-5 mb-5 mx-auto">
            <Button
              variant="primary"
              size="lg"
              value="Submit"
              type="submit"
              onClick={(event) => {
                event.preventDefault(this.props.unstakeTokens());
              }}
            >
              <b>WITHDRAW</b>
            </Button>
          </Stack>
          <Card className="text-center" style={{ color: "blue" }}></Card>
        </Card>
      </Container>
    );
  }
 
};

export default Main;

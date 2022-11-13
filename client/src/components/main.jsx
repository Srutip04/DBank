import React from "react";

const Main = () =>{
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black" }}>
              <td> USDT</td>
              <td>RWD</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default Main;
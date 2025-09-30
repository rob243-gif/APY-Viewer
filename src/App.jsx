import React from "react";
import APYTable from "./components/APYTable";

export default function App() {
  return (
    <div className="container">
      <h1>APY Dashboard</h1>
      <p>
        Live lend & borrow APYs for USDT/USDC from <b>Aave (Ethereum/Core & Avalanche)</b> and <b>Benqi (Avalanche)</b>
      </p>
      <APYTable />
      <footer>
        <small>
          Data via The Graph subgraphs. Last updated: {new Date().toLocaleString()}
        </small>
      </footer>
    </div>
  );
}
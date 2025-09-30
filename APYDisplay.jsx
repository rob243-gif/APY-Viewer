import React, { useEffect, useState } from "react";
import { fetchAaveAPY, fetchBenqiAPY } from "./fetchAPY";

export default function APYDisplay() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function load() {
      const symbols = ["USDT", "USDC"];
      const results = {};
      for (let symbol of symbols) {
        results[`aave_eth_${symbol}`] = await fetchAaveAPY("ethereum", symbol);
        results[`aave_avax_${symbol}`] = await fetchAaveAPY("avalanche", symbol);
        results[`benqi_${symbol}`] = await fetchBenqiAPY(symbol);
      }
      setData(results);
    }
    load();
  }, []);

  return (
    <div>
      <h1>APY Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Chain</th>
            <th>Asset</th>
            <th>Lend APY</th>
            <th>Borrow APY</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows from data */}
          {Object.entries(data).map(([key, d]) =>
            d ? (
              <tr key={key}>
                <td>{key.split("_")[0]}</td>
                <td>{key.includes("eth") ? "Ethereum" : "Avalanche"}</td>
                <td>{d.symbol || d.underlyingSymbol}</td>
                <td>{(d.liquidityRate || d.supplyRate) / 1e27 * 100 || "--"}%</td>
                <td>{(d.variableBorrowRate || d.borrowRate) / 1e27 * 100 || "--"}%</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}
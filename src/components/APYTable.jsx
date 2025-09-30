import React, { useEffect, useState } from "react";
import { fetchAaveAPY, fetchBenqiAPY } from "../utils/fetchAPY";

const protocols = [
  {
    name: "Aave",
    chain: "Ethereum",
    fetch: (symbol) => fetchAaveAPY("ethereum", symbol),
  },
  {
    name: "Aave",
    chain: "Avalanche",
    fetch: (symbol) => fetchAaveAPY("avalanche", symbol),
  },
  {
    name: "Benqi",
    chain: "Avalanche",
    fetch: (symbol) => fetchBenqiAPY(symbol),
  },
];

const assets = ["USDT", "USDC"];

export default function APYTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const allRows = [];
      for (const protocol of protocols) {
        for (const asset of assets) {
          try {
            const data = await protocol.fetch(asset);
            allRows.push({
              protocol: protocol.name,
              chain: protocol.chain,
              asset: asset,
              lend: getLendAPY(data),
              borrow: getBorrowAPY(data),
            });
          } catch (err) {
            allRows.push({
              protocol: protocol.name,
              chain: protocol.chain,
              asset: asset,
              lend: "Error",
              borrow: "Error",
            });
          }
        }
      }
      setRows(allRows);
      setLoading(false);
    }
    load();
  }, []);

  function getLendAPY(d) {
    // Aave: liquidityRate is Ray (1e27); Benqi: supplyRate is 1e18
    if (!d) return "--";
    if (d.liquidityRate) return ((d.liquidityRate / 1e27) * 100).toFixed(2) + "%";
    if (d.supplyRate) return ((d.supplyRate / 1e18) * 100).toFixed(2) + "%";
    return "--";
  }
  function getBorrowAPY(d) {
    if (!d) return "--";
    // Aave: variableBorrowRate; Benqi: borrowRate
    if (d.variableBorrowRate) return ((d.variableBorrowRate / 1e27) * 100).toFixed(2) + "%";
    if (d.borrowRate) return ((d.borrowRate / 1e18) * 100).toFixed(2) + "%";
    return "--";
  }

  return (
    <div className="table-container">
      {loading ? (
        <div>Loading APYs...</div>
      ) : (
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
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.protocol}</td>
                <td>{row.chain}</td>
                <td>{row.asset}</td>
                <td>{row.lend}</td>
                <td>{row.borrow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
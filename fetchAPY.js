// Example: Fetch Aave APYs (Ethereum)
const AAVE_ETHEREUM_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";
const AAVE_AVALANCHE_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/aave/protocol-v2-avalanche";
const BENQI_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/benqi-finance/benqi";

async function fetchAaveAPY(chain, symbol) {
  const url = chain === "ethereum" ? AAVE_ETHEREUM_SUBGRAPH : AAVE_AVALANCHE_SUBGRAPH;
  const query = `
    {
      reserves(where: { symbol: "${symbol}" }) {
        symbol
        liquidityRate
        variableBorrowRate
        stableBorrowRate
      }
    }
  `;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data } = await res.json();
  return data.reserves[0];
}

async function fetchBenqiAPY(symbol) {
  const query = `
    {
      markets(where: { underlyingSymbol: "${symbol}" }) {
        underlyingSymbol
        supplyRate
        borrowRate
      }
    }
  `;
  const res = await fetch(BENQI_SUBGRAPH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data } = await res.json();
  return data.markets[0];
}
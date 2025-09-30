# APY Dashboard

Displays live lend & borrow APYs for USDT and USDC from:

- **Aave (Core/Ethereum)**
- **Aave (Avalanche)**
- **Benqi (Avalanche)**

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the app**
   ```bash
   npm start
   ```
3. **Build for production**
   ```bash
   npm run build
   ```

## How It Works

- Fetches APY data from public subgraphs (The Graph) for Aave and Benqi.
- Displays APYs for USDT and USDC on respective protocols/chains.

## Customize

- Add more protocols, assets, or chains by editing `src/components/APYTable.jsx` and `src/utils/fetchAPY.js`.

## License

MIT
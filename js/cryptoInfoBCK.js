const cryptoInfo = {
  BTC: { nome: "Bitcoin", simbolo: "BTC", imagem: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
  ETH: { nome: "Ethereum", simbolo: "ETH", imagem: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
  USDT: { nome: "Tether", simbolo: "USDT", imagem: "https://assets.coingecko.com/coins/images/325/large/Tether.png" },
  BNB: { nome: "BNB", simbolo: "BNB", imagem: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
  SOL: { nome: "Solana", simbolo: "SOL", imagem: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },
  XRP: { nome: "XRP", simbolo: "XRP", imagem: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" },
  USDC: { nome: "USD Coin", simbolo: "USDC", imagem: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png" },
  DOGE: { nome: "Dogecoin", simbolo: "DOGE", imagem: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png" },
  TON: { nome: "Toncoin", simbolo: "TON", imagem: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png" },
  ADA: { nome: "Cardano", simbolo: "ADA", imagem: "https://assets.coingecko.com/coins/images/975/large/cardano.png" },
  SHIB: { nome: "Shiba Inu", simbolo: "SHIB", imagem: "https://assets.coingecko.com/coins/images/11939/large/shiba.png" },
  WBTC: { nome: "Wrapped Bitcoin", simbolo: "WBTC", imagem: "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png" },
  TRX: { nome: "TRON", simbolo: "TRX", imagem: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png" },
  LINK: { nome: "Chainlink", simbolo: "LINK", imagem: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png" },
  LTC: { nome: "Litecoin", simbolo: "LTC", imagem: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
  DOT: { nome: "Polkadot", simbolo: "DOT", imagem: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png" },
  BCH: { nome: "Bitcoin Cash", simbolo: "BCH", imagem: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png" },
  MATIC: { nome: "Polygon", simbolo: "MATIC", imagem: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png" },
  NEAR: { nome: "NEAR Protocol", simbolo: "NEAR", imagem: "https://assets.coingecko.com/coins/images/10365/large/near.jpg" },
  UNI: { nome: "Uniswap", simbolo: "UNI", imagem: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png" },
  ICP: { nome: "Internet Computer", simbolo: "ICP", imagem: "https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png" },
  DAI: { nome: "Dai", simbolo: "DAI", imagem: "https://assets.coingecko.com/coins/images/9956/large/4943.png" },
  STETH: { nome: "Lido Staked Ether", simbolo: "STETH", imagem: "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png" },
  RNDR: { nome: "Render", simbolo: "RNDR", imagem: "https://assets.coingecko.com/coins/images/11636/large/rndr.png" },
  LEO: { nome: "LEO Token", simbolo: "LEO", imagem: "https://assets.coingecko.com/coins/images/8418/large/leo-token.png" },
  XMR: { nome: "Monero", simbolo: "XMR", imagem: "https://assets.coingecko.com/coins/images/69/large/monero_logo.png" },
  ETC: { nome: "Ethereum Classic", simbolo: "ETC", imagem: "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png" },
  OKB: { nome: "OKB", simbolo: "OKB", imagem: "https://assets.coingecko.com/coins/images/4463/large/okb_token.png" },
  FIL: { nome: "Filecoin", simbolo: "FIL", imagem: "https://assets.coingecko.com/coins/images/12817/large/filecoin.png" },
  MKR: { nome: "Maker", simbolo: "MKR", imagem: "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png" },
  INJ: { nome: "Injective", simbolo: "INJ", imagem: "https://assets.coingecko.com/coins/images/12882/large/Secondary_Symbol.png" },
  APT: { nome: "Aptos", simbolo: "APT", imagem: "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png" },
  PEPE: { nome: "Pepe", simbolo: "PEPE", imagem: "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg" },
  CRO: { nome: "Cronos", simbolo: "CRO", imagem: "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png" },
  AAVE: { nome: "Aave", simbolo: "AAVE", imagem: "https://assets.coingecko.com/coins/images/12645/large/AAVE.png" },
  LDO: { nome: "Lido DAO", simbolo: "LDO", imagem: "https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png" },
  ATOM: { nome: "Cosmos Hub", simbolo: "ATOM", imagem: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png" },
  RUNE: { nome: "THORChain", simbolo: "RUNE", imagem: "https://assets.coingecko.com/coins/images/6595/large/RUNE.png" },
  GRT: { nome: "The Graph", simbolo: "GRT", imagem: "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png" },
  FET: { nome: "Fetch.ai", simbolo: "FET", imagem: "https://assets.coingecko.com/coins/images/5681/large/Fetch.jpg" },
  ALGO: { nome: "Algorand", simbolo: "ALGO", imagem: "https://assets.coingecko.com/coins/images/4380/large/download.png" }
};

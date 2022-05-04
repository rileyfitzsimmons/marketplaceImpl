import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(
    '[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "itemId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "nftContract", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "string", "name": "category", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "isSold", "type": "bool" } ], "name": "MarketItemCreated", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "string", "name": "category", "type": "string" } ], "name": "createMarketItem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "itemId", "type": "uint256" } ], "name": "createMarketSale", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "fetchCreateNFTs", "outputs": [ { "components": [ { "internalType": "uint256", "name": "itemId", "type": "uint256" }, { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address payable", "name": "seller", "type": "address" }, { "internalType": "address payable", "name": "owner", "type": "address" }, { "internalType": "string", "name": "category", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "bool", "name": "isSold", "type": "bool" } ], "internalType": "struct NFTMarket.MarketItem[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fetchPurchasedNFTs", "outputs": [ { "components": [ { "internalType": "uint256", "name": "itemId", "type": "uint256" }, { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address payable", "name": "seller", "type": "address" }, { "internalType": "address payable", "name": "owner", "type": "address" }, { "internalType": "string", "name": "category", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "bool", "name": "isSold", "type": "bool" } ], "internalType": "struct NFTMarket.MarketItem[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "category", "type": "string" } ], "name": "getItemsByCategory", "outputs": [ { "components": [ { "internalType": "uint256", "name": "itemId", "type": "uint256" }, { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address payable", "name": "seller", "type": "address" }, { "internalType": "address payable", "name": "owner", "type": "address" }, { "internalType": "string", "name": "category", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "bool", "name": "isSold", "type": "bool" } ], "internalType": "struct NFTMarket.MarketItem[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMarketItems", "outputs": [ { "components": [ { "internalType": "uint256", "name": "itemId", "type": "uint256" }, { "internalType": "address", "name": "nftContract", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address payable", "name": "seller", "type": "address" }, { "internalType": "address payable", "name": "owner", "type": "address" }, { "internalType": "string", "name": "category", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "bool", "name": "isSold", "type": "bool" } ], "internalType": "struct NFTMarket.MarketItem[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" } ]'
  );
  const [marketAddress, setMarketAddress] = useState(
    "0xb244b7c3385775ba98d2dbfb6c5ae53cb11b15b5"
  );
  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        contractABI,
        setContractABI,
        marketAddress,
        setMarketAddress,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };

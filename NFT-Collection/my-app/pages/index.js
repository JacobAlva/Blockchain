import {Contract, providers, utils} from "ethers";
import Head from "next/head";
import Reach, {useEffect, useRef, useState} from "react";
import Web3Modal from "web3modal"; // allows the user to connect their wallet
import {abi, NFT_CONTRACT_ADDRESS} from "../constants";

export default function Home() {
  const [walletConencted, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    //We need to gain acccess to the provider/sogner from Metamast

    //Update 'walletConnected' to be true
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, 
  []);
}
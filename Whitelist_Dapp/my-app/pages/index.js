import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import styles from '../styles/Home.module.css';
//import Web3Modal, { providers } from "web3modal";
import Web3Modal from "web3modal";
import {Contract, providers} from "ethers";
//import ConnectToCoinbaseWalletSdk from 'web3modal/dist/providers/connectors/coinbasewallet';
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [numofWhitelisted, setNumofWhitelisted] = useState(0);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const {chainId} = await web3Provider.getNetwork();
      
      if (chainId !== 4) {
        window.alert("Change the network to RInkeby");
        throw new Error ("Change the network to Rinkeby")
      }  

      if(needSigner)    {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (err) {
      console.error(err)
    }
  }

  const addAddressToWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract (
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getNumberofWhitelisted();
      setJoinedWhitelist(true);
    }
    catch (err) {
      console.error(err);
    }
  };

  const checkIfAddressIsWhitelisted = async () => {
    try {
      const signer = getProviderOrSigner(true)
      const whitelistContract = new Contract (
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const address = await signer.getAddress();
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    }
    catch(err) {
      console.error(err);
    }
  }

  const getNumberofWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numOfWhitelisted = await whitelistContract.numAddressesWhitelisted();
      setNumofWhitelisted(_numOfWhitelisted);
    } catch(err) {
      console.error(err)
    }
  }
  
  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the WHitelist!
          </div>
        );
      }
      else if (loading) {
        return <button className={styles.button}>
          Loading...
        </button>
      }
      else {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist.
          </button>
        );
      }      
    }
    else {
      <button onClick={connectWallet} className={styles.button}>
        Connect your Wallet
      </button>;
    }
  };

  const connectWallet = async() => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressIsWhitelisted();
      getNumberofWhitelisted();
    } catch(err) {
      console.error(err)
    }
  }

  useEffect (() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {}, 
        disabledInjectedProvider: false,
      });
      connectWallet();
    }
  },  [walletConnected]  ); 
  
  return (
    <div>
      <Head>
        <title>Whitelist dApp</title>
        <meta name="description" content="Whitelist-Dapp: For Legacy Members"/>
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Legacy Devs!
        </h1>
        <div className={styles.description}>
          {numofWhitelisted} members have joined the Whitelist.
        </div>
        {renderButton()}
      </div>
      <div>
        <img className={styles.image} src="./crypto-devs.svg" />
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Legacy Devs
      </footer>
    </div>    
  );
}

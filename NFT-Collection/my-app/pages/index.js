import {Contract, providers, utils,} from "ethers";
import Head from "next/head";
import Reach, {useEffect, useRef, useState} from "react";
import Web3Modal from "web3modal"; // allows the user to connect their wallet
//import {abi, NFT_CONTRACT_ADDRESS} from "../constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const startPresale = async() =>  {

  };

  const checkIfPresaleStarted = async () => {
    try{

    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => { 
    //We need to gain acccess to the provider/signer from Metamask
    const provider = await web3ModalRef.current.connect(); //opens metamask and request the user to connect
    const web3Provider = new providers.Web3Provider(provider); //wraps web3Provider around ethers provider. This allows us to use some cool functions from the ethers provider

    //if user is not connected to Rinkeby, tell them to switch to Rinkeby
    const {chainId} = await web3Provider.getNetwork();
    if (chainId !== 4) { //Every network has its unique chainId. Rinkeby's chainId is 4
      window.alert("Please switch to the Rinkeby network");
      throw new Error ("Incorrect network"); //discontinues the code until user switches to Rinkeby
    }    
    if (needSigner) { //checks if needsigner is true and returns the value
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  // initialized the reference to a web3modal instance when the page loads
  useEffect(() => {
    if (!walletConnected) { //checks if wallet is connected
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet(); //connects wallet once web3modal is instatiated
    }
  }, 
  []);

  return (
    <div>
      <Head>
        <title>Legacy Devs NFT</title>
      </Head>

      <div className={styles.main}>        
        
        {walletConnected ? ( 
          null //returns null if wallet is connected
          ) : //we only want this button to appear if the user hasn't connected their wallet
          <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
          </button>
        }        
      </div>
    </div>
  );
}
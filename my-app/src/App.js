import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {useRef,useState,useEffect} from "react"
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";


function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address,setAddress]  = useState("")
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      const signer = await getProviderOrSigner(true);
      setWalletConnected(true);
      const add = await signer.getAddress()
      setAddress(add);
      console.log(add)


    } catch (err) {
      console.error(err);
    }
  };
 const disconnect = async () =>{
  await web3ModalRef.current.clearCachedProvider();
  setWalletConnected(false)
  setAddress("")
  console.log("disconnesct clicked")

 }
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions: {
          // walletconnect: {
          //   package: require('@walletconnect/web3-provider'),
          //   options: {
          //     infuraId: '070c84d742ea49468438d43ca28f82f2'
          //   }
          // }
        },
        disableInjectedProvider: false,
      });
      // connectWallet();
    }
  },[walletConnected]);


  return (
    <div className="App">
      <Navbar connectWallet = {connectWallet} address = {address} walletConnected ={walletConnected} disconnect = {disconnect}/>
    </div>
  );
}

export default App;

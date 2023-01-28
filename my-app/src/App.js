import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {useRef,useState,useEffect} from "react"
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { getHuddleClient, HuddleClientProvider } from '@huddle01/huddle01-client';
import MeVideoElem from './components/MeVideoElem';
import PeerVideoAudioElem from './components/PeerVideoAudioElem';
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { create } from 'ipfs-http-client'



function App(){
  const projectId = "2KwaoOl1zY6POCINIGnPji27rdB";
  const projectSecret = "783ec42e795c6f8b6dccdacc00a5b0bb";
  const authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');
  

  
  const client = create({url:'https://ipfs.infura.io:5001/api/v0',
  headers:{authorization},
})
  const huddleClient = getHuddleClient('702b03a76c58010686023dac1caeb63696b04b1c069ef14405b4ede34ed1586b');
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address,setAddress]  = useState("")
  const [fileUrl, setFileUrl] = useState(``)

  
  const web3ModalRef = useRef();
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const isJoined = useHuddleStore((state) => state.roomState.joined);

  
  
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the mumbai network, let them know and throw an error
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

 async function onChange(e) {
  const file = e.target.files[0]
  try {
    const added = await client.add(file)
    console.log(added)
    console.log(added.path)
    const url = `https://ipfs.io/ipfs/${added.path}`
    setFileUrl(url)
  } catch (error) {
    console.log('Error uploading file: ', error)
  }  
}

  useEffect(() => {

    if (!walletConnected) {

      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: require('@walletconnect/web3-provider'),
            options: {
              infuraId: '070c84d742ea49468438d43ca28f82f2'
            }
          }
        },
        disableInjectedProvider: false,
      });

    }
  },[walletConnected]);


  return (
    <HuddleClientProvider client = {huddleClient}>
    <div className="App">
      <Navbar connectWallet = {connectWallet} address = {address} walletConnected ={walletConnected} disconnect = {disconnect}/>
      <div className="input-file">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
    </div>
    </div>
    </HuddleClientProvider>
  );
}

export default App;

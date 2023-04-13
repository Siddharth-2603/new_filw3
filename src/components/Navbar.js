import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

  const [isMetamaskInstalled, setisMetamaskInstalled] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState(null);
  const [status, setStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [uri, setUri] = useState("");
  const [tokens, setTokens] = useState([]);

  const contractAddress = "0xc704415859df6f4711A6deCB04B999cad2702179";

  const { ethereum } = window;
  
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setisMetamaskInstalled(false);
      }
      setisMetamaskInstalled(true);
    };
    checkMetamaskAvailability();
  }, []);
  
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setisMetamaskInstalled(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      let network = await provider.getNetwork();
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
      setNetwork(network);
    }
    catch (error) {
      setIsConnected(false);
    }
  }


    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2"/>
            <div className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/"> Marketplace </Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWallet}>{isConnected? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {isConnected ? "Connected to":"Not Connected. Please login to view NFTs"} {isConnected ? (accountAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;

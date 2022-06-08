import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import { contractAddress } from "./config";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const contractABI = abi.abi;
  const { ethereum } = window;
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionsContract;
  };
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        await getAllWaves();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {}
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      await getAllWaves();
      await getTotalWaves();
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async (e) => {
    e.preventDefault();
    try {
      if (ethereum) {
        const wavePortalContract = createEthereumContract();

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        const waveTxn = await wavePortalContract.wave(message);
        setIsWaving(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        setIsWaving(false);
        await getAllWaves();
        await getTotalWaves();
        count = await wavePortalContract.getTotalWaves();

        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalWaves = async () => {
    const wavePortalContract = createEthereumContract();
    try {
      if (ethereum) {
        const count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
      }
    } catch (error) {}
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const wavePortalContract = createEthereumContract();

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async () => {

  // }
  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getTotalWaves();
  }, []);

  return (
    <div className="App">
      <div className="mainContainer gradient-bg-welcome h-screen">
        <div className="dataContainer">
          <div className="text-white">👋 Hey there!</div>

          <div className="text-white">I am Precious</div>

          <p className="text-lime-500">Total waves:{totalWaves}</p>
          {/*
           * If there is no currentAccount render this button
           */}
          {!currentAccount && (
            <button
              className="waveButton bg-primary text-white p-1 rounded-md"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
          <div className="grid grid-cols-3 gap-7">
            {allWaves.map((wave, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "OldLace",
                  padding: "8px",
                }}
              >
                <div>Address: {wave.address}</div>
                <div>Time: {wave.timestamp.toString()}</div>
                <div>Message: {wave.message}</div>
              </div>
            ))}
          </div>
          <div>
            <h1>{message}</h1>
            <form onSubmit={wave} className="mt-5">
              {!isWaving && (
                <input
                  className="rounded-md border border-prim"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              )}
              <div className="mt-4">
                <button
                  disabled={isWaving}
                  type="submit"
                  className="waveButton bg-primary text-white p-1 rounded-md"
                >
                  {isWaving ? "Loading...." : "Wave at Me"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

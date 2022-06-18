import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/waveportal.json";
import { contractAddress } from "./config";
import { motion } from "framer-motion";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const contractABI = abi.abi;
  const { ethereum } = window;
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

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
    setMessage("");
    setStatus("");
    try {
      if (ethereum) {
        const wavePortalContract = createEthereumContract();

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        setIsWaving(true);
        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });

        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        setIsWaving(false);
        setStatus("success");

        await getAllWaves();
        await getTotalWaves();
        count = await wavePortalContract.getTotalWaves();

        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      // throw(error);
      setStatus("error");
      console.log(error.message);
      console.log(typeof error.message);
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
    getTotalWaves();
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  return (
    <div className="App gradient-bg-welcome">
      <div className="">
        <div className="text-white text-[2em] font-luckiest">👋 Hey there!</div>

        <h2 className="text-white font-elite text-[5em] m-0">I am Precious</h2>
        <h2 className="text-[3em] font-badscript text-superadmin">Give me a wave</h2>
        {/* <p className="text-lime-500">Total waves:{totalWaves}</p> */}

        {status && (
          <motion.p
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className={`${
              status === "success" ? "text-lime-500" : "text-red-500"
            } text-[3em] font-elite`}
          >
            {status === "success"
              ? "Awesome, what a Wave!"
              : "An error occurred, try again later"}
          </motion.p>
        )}
        {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            {/* <AiFillPlayCircle className="text-white mr-2" /> */}
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>
        )}
        <div className="mb-4 flex justify-center">
          <form onSubmit={wave} className="mt-5 w-eleventh">
            {!isWaving && (
              <input
                className="px-3 rounded-md border w-full border-prim py-1"
                type="text"
                placeholder="Enter your message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
            <div className="mt-2">
              <button
                disabled={isWaving}
                type="submit"
                className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer w-44"
              >
                {isWaving ? "Loading...." : "Wave at Me"}
              </button>
            </div>
          </form>
        </div>

        <h1 className="font-alfa text-lg text-white tracking-wide mb-2 mt-12">
          All Waves
        </h1>
        <div className="grid grid-cols-3 gap-7 pb-4">
          {allWaves.map((wave, index) => (
            <div
              className="bg-black rounded-md text-white"
              key={index}
              style={{
                padding: "8px",
              }}
            >
              <div className="mb-3">
                <h2 className="break-words">Address: {wave.address}</h2>
              </div>
              <div className="mb-3">Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

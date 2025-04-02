import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MHDTOKENABI from './MHDTOKENABI.json'; // Place your ABI JSON here

const TOKEN_ADDRESS = "0xYourTokenAddress"; // Replace with your deployed contract address

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  // Connect to MetaMask on component mount
  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(providerInstance);
      providerInstance.send("eth_requestAccounts", []).then(accounts => {
        setAccount(accounts[0]);
        const signerInstance = providerInstance.getSigner();
        setSigner(signerInstance);
        const token = new ethers.Contract(TOKEN_ADDRESS, MHDTOKENABI, signerInstance);
        setTokenContract(token);
      });
    } else {
      console.error("MetaMask not found");
    }
  }, []);

  // Fetch balance
  const getBalance = async () => {
    if (tokenContract && account) {
      const bal = await tokenContract.balanceOf(account);
      setBalance(ethers.utils.formatEther(bal));
    }
  };

  // Transfer tokens
  const transferTokens = async () => {
    if (tokenContract) {
      const tx = await tokenContract.transfer(transferTo, ethers.utils.parseEther(transferAmount));
      await tx.wait();
      getBalance();
    }
  };

  // Update balance when contract or account changes
  useEffect(() => {
    getBalance();
  }, [tokenContract, account]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MHDTOKEN Dashboard</h1>
      <p><strong>Connected Account:</strong> {account}</p>
      <p><strong>Your Balance:</strong> {balance} MHD</p>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Recipient Address"
          value={transferTo}
          onChange={e => setTransferTo(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Amount (MHD)"
          value={transferAmount}
          onChange={e => setTransferAmount(e.target.value)}
          style={{ width: '150px', marginRight: '10px' }}
        />
        <button onClick={transferTokens}>Transfer Tokens</button>
      </div>
    </div>
  );
}

export default App;
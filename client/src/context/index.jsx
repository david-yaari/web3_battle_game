import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  useAddress,
  useContract,
  metamaskWallet,
  useContractWrite,
} from '@thirdweb-dev/react';
import { createEventListeners } from './createEventListners';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: 'info',
    message: '',
  });
  const [battleName, setBattleName] = useState('');
  const [gameData, setGameData] = useState({
    players: [],
    pendingBattles: [],
    activeBattle: null,
  });
  const [updateGameData, setUpdateGameData] = useState(0);
  const [battleGround, setBattleGround] = useState('bg-astral');

  const navigate = useNavigate();

  const { contract } = useContract(
    '0x5481da820c581aCEB28201ffCCB3E2d678372321'
  );
  //console.log('Contract: ', contract);

  const { mutateAsync: createBattle, isLoading } = useContractWrite(
    contract,
    'createBattle'
  );
  const connect = metamaskWallet();
  const walletAddress = useAddress();
  //const connect = useMetamask();

  //console.log('Connect to Wallet', connect);

  //* Activate event listeners for the smart contract
  useEffect(() => {
    if (contract) {
      createEventListeners({
        navigate,
        contract,
        walletAddress,
        setShowAlert,
        setUpdateGameData,
      });
    }
  }, [contract]);

  //* Set the game data to the state
  useEffect(() => {
    const fetchGameData = async () => {
      const connect = metamaskWallet();
      if (contract) {
        const fetchedBattles = await contract.call('getAllBattles');
        //console.log(fetchedBattles);
        const pendingBattles = fetchedBattles.filter(
          (battle) => battle.battleStatus === 0
        );
        let activeBattle = null;

        fetchedBattles.forEach((battle) => {
          //console.log(battle);
          if (
            battle.players.find(
              (player) => player.toLowerCase() === walletAddress.toLowerCase()
            )
          ) {
            if (battle.winner.startsWith('0x00')) {
              activeBattle = battle;
            }
          }
        });

        setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
      }
    };

    fetchGameData();
  }, [contract, updateGameData]);

  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        contract,
        connect,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
        battleGround,
        setBattleGround,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

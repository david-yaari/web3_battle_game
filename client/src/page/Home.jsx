import React, { useState, useEffect } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components';

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      //const playeExists = await contract.isPlayer(walletAddress);
      const playerExists = await contract.call('isPlayer', [walletAddress]);

      if (!playerExists) {
        const data = await contract.call('registerPlayer', [
          playerName,
          playerName,
        ]);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is beign summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: 'info',
        message: 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.call('isPlayer', [walletAddress]);
      const playerTokenExists = await contract.call('isPlayerToken', [
        walletAddress,
      ]);
    };

    if (contract) {
      checkForPlayerToken();
    }
  }, [contract]);

  return (
    <div>
      <div className='flex flex-col'>
        <CustomInput
          label='Name'
          placeholder='Enter your player name'
          value={playerName}
          handleValueChange={setPlayerName}
        />
      </div>

      <CustomButton
        title='Register'
        handleClick={handleClick}
        restStyle='mt-6'
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);

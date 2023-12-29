import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { useGlobalContext } from '../context';

import { CustomButton, PageHOC } from '../components';
const JoinBattle = () => {
  const { contract, gameData, setShowAlert, setBattleName, walletAddress } =
    useGlobalContext();

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      const data = await contract.call('joinBattle', [battleName]);

      setShowAlert({
        status: true,
        type: 'success',
        message: `Joining ${battleName}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles:</h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            .filter(
              (battle) =>
                !battle.players.includes(walletAddress) &&
                battle.battleStatus !== 1
            )
            .map((battle, index) => (
              <div
                key={battle.name + index}
                className={styles.flexBetween}
              >
                <p className={styles.joinBattleTitle}>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title='Join'
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Reload the page to see new battles
          </p>
        )}
      </div>

      <p
        className={styles.infoText}
        onClick={() => navigate('/create-battle')}
      >
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>
);

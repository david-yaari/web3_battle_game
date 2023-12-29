import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton } from '../components';
import { player01, player02 } from '../assets';
import styles from '../styles';

const GameLoad = () => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();
  //console.log(walletAddress);

  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={`${styles.gameLoadBtnBox}`}>
        <CustomButton
          title='Choose Battleground'
          handleClick={() => navigate('/battleground')}
          restStyle='mt-6'
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Waiting for a <br /> worthy opponent...
        </h1>
        <p className={styles.gameLoadText}>
          Protip: while you're waiting, choose your preferred battleground
        </p>

        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player01}
              tag=''
              className={styles.gameLoadPlayerImg}
            />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress?.slice(0, 30)}
            </p>
          </div>

          <h2 className={styles.gameLoadVS}>Vs</h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player02}
              tag=''
              className={styles.gameLoadPlayerImg}
            />
            <p className={styles.gameLoadPlayerText}>????????????????????</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoad;

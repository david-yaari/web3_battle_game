import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { alertIcon, gameRules } from '../assets';
import styles from '../styles';

const GameInfo = () => {
  const { contract, gameData, showAlert, setShowAlert } = useGlobalContext();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const navigate = useNavigate();

  const handleBattleExit = async () => {};

  return (
    <>
      <div className={styles.gameInfoIconBox}>
        <div
          className={`${styles.gameInfoIcon} ${styles.flexCenter}`}
          onClick={() => setToggleSideBar(true)}
        >
          <img
            src={alertIcon}
            alt='info'
            className={styles.gameInfoIconImg}
          />
        </div>
      </div>

      <div></div>
    </>
  );
};

export default GameInfo;

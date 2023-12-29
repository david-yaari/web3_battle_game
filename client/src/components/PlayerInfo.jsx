import React from 'react';
import { Tooltip } from 'react-tooltip';

import styles from '../styles';

const healthPoints = 25;

const healthLevel = (points) =>
  points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500';

const marginIndexing = (index) =>
  index !== healthPoints - 1 ? 'mr-1' : 'mr-0';

const PlayerInfo = ({ player, playerIcon, mt }) => (
  <div className={`${styles.flexCenter} ${mt ? 'mt-4' : 'mb-4'}`}>
    <img
      data-tooltip-id={`Player-${mt ? '1' : '2'}`}
      src={playerIcon}
      alt='player02'
      className='w-14 h-14 object-contain rounded-full'
    />

    <div
      data-tooltip-id={`Health-${mt ? '1' : '2'}`}
      data-tooltip-content={`Health: ${player.health}`}
      className={styles.playerHealth}
    >
      {[...Array(player.health).keys()].map((item, index) => (
        <div
          key={`player-item-${item}`}
          className={`${styles.playerHealthBar} ${healthLevel(
            player.health
          )} ${marginIndexing(index)}`}
        />
      ))}
    </div>

    <div
      data-tooltip-id={`Mana-${mt ? '1' : '2'}`}
      data-tooltip-content='Mana'
      className={`${styles.flexCenter} ${styles.glassEffect} ${styles.playerMana}`}
    >
      {player.mana || 0}
    </div>

    <Tooltip
      id={`Player-${mt ? '1' : '2'}`}
      style={{ backgroundColor: '#7f46f0' }}
    >
      <p className={styles.playerInfo}>
        <span className={styles.playerInfoSpan}>Name:</span>{' '}
        {player?.playerName}
      </p>
      <p className={styles.playerInfo}>
        <span className={styles.playerInfoSpan}>Address:</span>{' '}
        {player?.playerAddress?.slice(0, 10)}
      </p>
    </Tooltip>
    <Tooltip
      id={`Health-${mt ? '1' : '2'}`}
      style={{ backgroundColor: '#7f46f0' }}
    />
    <Tooltip
      id={`Mana-${mt ? '1' : '2'}`}
      style={{ backgroundColor: '#7f46f0' }}
    />
  </div>
);

export default PlayerInfo;

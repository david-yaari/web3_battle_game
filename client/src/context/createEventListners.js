export const createEventListeners = ({
  navigate,
  contract,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
}) => {
  const NewPlayerEventFilter = contract.events.addEventListener(
    'NewPlayer',
    (event) => {
      console.log('New player created!', event);

      if (walletAddress === event.owner) {
        setShowAlert({
          status: true,
          type: 'success',
          message: 'Player has been successfully registered',
        });
      }
    }
  );

  const NewBattleEventFilter = contract.events.addEventListener(
    'NewBattle',
    (event) => {
      console.log('New battle created!', event, walletAddress);

      if (
        walletAddress.toLowerCase() === event.data.player1.toLowerCase() ||
        walletAddress.toLowerCase() === event.data.player2.toLowerCase()
      ) {
        navigate(`/battle/${event.data.battleName}`);

        setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
      }
    }
  );
};

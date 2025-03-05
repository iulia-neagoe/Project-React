import { useState } from 'react';
import { BoardComponent } from '../Board/Board';
import styles from './Game.module.css';
import { Game, Value } from '@project/models';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
export function GameComponent() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [game, setGame] = useState<Game>({
    id: uuidv4(),
    date: new Date(),
    player1: { name: '' },
    player2: { name: '' },
    board: { values: [] },
    winner: undefined,
  });
  function startGame() {
    if (game.player1.name && game.player2.name) setIsGameStarted(true);
  }
  return (
    <>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Player 1"
          disabled={isGameStarted}
          onChange={(e) => {
            const gamecopy = { ...game };
            gamecopy.player1.name = e.target.value;
            setGame(gamecopy);
          }}
        ></input>
        <input
          type="text"
          placeholder="Player 2"
          disabled={isGameStarted}
          onChange={(e) => {
            const gamecopy = { ...game };
            gamecopy.player2.name = e.target.value;
            setGame(gamecopy);
          }}
        ></input>
      </div>
      <button onClick={startGame}> Start game:</button>

      {isGameStarted && (
        <>
          <BoardComponent
            onGameFinish={(value: Value) => {
              // varianta 1
              // if (value === Value.X) {
              //   console.log(game.player1.name);
              //   const gamecopy = { ...game };
              //   gamecopy.winner = gamecopy.player1;
              //   setGame(gamecopy);
              // } else {
              //   console.log(game.player2.name);
              //   const gamecopy = { ...game };
              //   gamecopy.winner = gamecopy.player2;
              //   setGame(gamecopy);
              // }

              // varianta 2
              // const gamecopy = { ...game };
              // if(value ===Value.X){
              //   gamecopy.winner = gamecopy.player1;}
              //   else{
              //     gamecopy.winner = gamecopy.player2;
              //   }
              //   setGame(gamecopy);

              //varianta 3
              // const gamecopy = { ...game };
              // gamecopy.winner =
              //   value === Value.X ? gamecopy.player1 : gamecopy.player2;
              // setGame(gamecopy);

              //varianta4
              // const gamecopy={...game,winner: value === Value.X ? game.player1 : game.player2}
              // setGame(gamecopy)

              // varianta 5
              setGame({
                ...game,
                winner: value === Value.X ? game.player1 : game.player2,
              });
            }}
          ></BoardComponent>
          {game.winner && <div>Winner: {game.winner.name}</div>}
        </>
      )}
    </>
  );
}

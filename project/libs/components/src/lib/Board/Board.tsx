import { useEffect, useState } from 'react';
import styles from './Board.module.css';
import { ISquareProps, Square } from '../Square/Square';
const boardSize = 3;
export function Board() {
  const [squares, setSquares] = useState<ISquareProps[]>([]);
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  useEffect(() => {
    generateSquares();
  }, []);
  function squareClick(index: number) {
    const squarescopy = [...squares];
    const squareitem = squarescopy[index];
    squareitem.value = turn;
    setSquares(squarescopy);
    //turn === 'X' ? setTurn('O') : setTurn('X');
    setTurn(turn === 'X' ? 'O' : 'X');
  }
  function generateSquares() {
    const generatedSquares: ISquareProps[] = [];
    for (let i = 0; i < 9; i++) {
      const square: ISquareProps = {
        value: '',
        onSquareClick: () => {
          squareClick(i);
        },
      };
      generatedSquares.push(square);
      //setSquares([...squares, square]);
    }
    setSquares(generatedSquares);
  }
  // function calculateWinner(squares:ISquareProps){
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  // for ( let i= 0; i< lines.length; i++){
  //   const [a,b,c]= lines[i];
  //   if(squares[a] == squares[b]==squares[c]){
  //     return squares[a]
  //   }
  // }
  // return null;
  // }

  return (
    <div className={styles.board}>
      {squares.map((s: ISquareProps, index) => {
        // if (index % boardSize == 2) {
        //   return (
        //     <>
        //       <Square
        //         value={s.value}
        //         onSquareClick={() => squareClick(index)}
        //       ></Square>
        //       <div></div>
        //     </>
        //   );
        // }
        return (
          <Square
            value={s.value}
            onSquareClick={() => squareClick(index)}
          ></Square>
        );
      })}
    </div>
  );
}
export default Board;

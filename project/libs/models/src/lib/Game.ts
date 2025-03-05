import { Board } from './Board';
import { Player } from './Player';

export interface Game {
  id: string;
  date: Date;
  player1: Player;
  player2: Player;
  board: Board;
  winner?: Player;
}

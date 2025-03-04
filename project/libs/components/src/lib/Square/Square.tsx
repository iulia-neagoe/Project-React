import styles from './Square.module.css';
export interface ISquareProps {
  value: string;
  onSquareClick: () => void;
}
export function Square(props: ISquareProps) {
  return (
    <button className={styles.square} onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

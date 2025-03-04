// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { useEffect, useState } from 'react';
interface Student {
  name: string;
  grade: number;
}
export function App() {
  const [counter, setCounter] = useState(0);
  const [food, setFood] = useState(['apple', 'banana', 'pizza']);
  let counter2 = 0;
  const [student, setStudent] = useState<Student>({
    name: 'Maria',
    grade: 9,
  });
  useEffect(() => {
    if (!student) {
      return;
    }
    student.name = food[1];
  }, [counter]);
  function add() {
    setCounter(counter + 1);
    counter2 = counter2 + 1;
  }

  return (
    <>
      <div>{counter}</div>
      <button onClick={add}>add</button>
      <div>{counter2}</div>
      <div>{food}</div>
      {food.map((x) => (
        <div>{x}</div>
      ))}
      <button
        onClick={() => {
          // food.push('sushi');
          setFood([...food, 'sushi']);
        }}
      >
        Add to list
      </button>
      <div>{student ? student.name : 'No name'}</div>
      <div>{student ? student.grade : 'No grade'}</div>
    </>
  );
}

export default App;

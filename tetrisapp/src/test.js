import { useState, useEffect } from "react";

export default function App() {
  const initalState = 0;
  const [count, setCount] = useState(initalState);

  useEffect(() => {
  let intervalId=  setInterval(() => {
      setCount(old => old + 1);
    }, 1000);
    console.log('callback running')
    return(()=>{
        console.log(`returned for ${intervalId}`)
        clearInterval(intervalId);
    })
  }, []);

  return (
    <div className="App">
      <h1>The current count is:</h1>
      <h2>{count}</h2>
    </div>
  );
}
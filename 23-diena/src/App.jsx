import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>Far away</h1>
      </header>

      <main>
        <div className="add-form ">
          <h2>What do you need for your trip</h2>
          <form action="">
            {/* Use 7-diena examples with lists and pray it works */}
            <input type="number" id="number" value={1} />
            <input type="text" id="item" value={"Item..."} />
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="list"></div>
      </main>
      <footer className="stats">
        {/* '6' is supposed to update real time based on li's
          packed should update based on checkmarks, % 
        */}
        <h2>You have 6 items on your list, and you already packed 0 (0%)</h2>
      </footer>
    </div>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ShoppingCart from "./component/ShoppingCart";

function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <ShoppingCart />
    </div>
  );
}

export default App;
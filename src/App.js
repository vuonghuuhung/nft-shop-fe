/* src/App.js */
import './App.css'
import { useState } from "react";
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import axios from 'axios';

const storage = new Web3Storage({token: ""});

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0)

  const onSell = async function() {
    
  }

  return (
    <div>
      <input
        type='text'
        placeholder="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-black block w-full py-2 px-4"
      />
      <input
        type='number'
        placeholder="price"
        name="description"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-black block w-full py-2 px-4 mt-4"
      />
      <button
        type="submit"
        onClick={onSell}
        className="border border-red-600 w-[100px] h-[40px] flex items-center justify-center mt-8"
      >
        Đăng bán
      </button>
    </div>
  )
}

export default App

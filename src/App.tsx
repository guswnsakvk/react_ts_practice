import React from 'react';
import './App.css';
import { useSelector } from "react-redux"
import { RootState } from './store';

const App:React.FC = () => {
  let data = useSelector((state:RootState) => {return state.ResturantData})
  console.log(data)
  return (
    <div className="App">
      
    </div>
  );
}

export default App;

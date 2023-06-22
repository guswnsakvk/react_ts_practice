import React, {useState} from 'react';
import './index.css'
import { useSelector } from "react-redux"
import { RootState } from './store';
import ShowMenu from './page/ShowMenu';

const App:React.FC = () => {
  let data = useSelector((state:RootState) => {return state.ResturantData})
  console.log(data)

  const [myResturant, setMyResturant] = useState(data)
  return (
    <div className="App">
      <ShowMenu menus={myResturant.menu}></ShowMenu>
    </div>
  );
}

export default App;

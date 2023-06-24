import React, {useState} from 'react';
import './index.css'
import { useSelector } from "react-redux"
import { RootState } from './store';
import ShowMenu from './page/ShowMenu';

const App:React.FC = () => {
  let data = useSelector((state:RootState) => {return state.ResturantData})
  const plusLike = (id:number) => {
    const updateMenu = myResturant.menu.map((item) => {
      if (item.id === id){
        return {...item, like : item.like + 1}
      }
      return item
    })

    setMyResturant({...myResturant, menu: updateMenu})
  }
  console.log(data)

  const [myResturant, setMyResturant] = useState(data)
  return (
    <div className="App">
      <ShowMenu menus={myResturant.menu} plusLike={plusLike}></ShowMenu>
    </div>
  );
}

export default App;

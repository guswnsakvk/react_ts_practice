import React from 'react'
import '../index.css'
import { Menu } from '../model/resturant'

interface OwnPros{
  menus : Menu[]
}

const ShowMenu:React.FC<OwnPros> = ({menus}) => {
  console.log(menus)

  return (
    <>
      {
        menus.map((menu) => {
          return(
            <div className='container' key={menu.id}>
              <img className='food-img' src={`/assets/${menu.id}.jpg`} alt='#'></img>
              <div>{menu.name} {menu.price} {menu.category}</div>
            </div>
          )
        })
      }
    </>
  )
}

export default ShowMenu
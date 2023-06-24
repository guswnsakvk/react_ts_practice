import React from 'react'
import '../index.css'
import { Menu } from '../model/resturant'
import { useDispatch } from 'react-redux'
import { addLike } from '../store'

interface OwnPros{
  menus : Menu[],
  plusLike(id:number):void
}

const ShowMenu:React.FC<OwnPros> = ({menus, plusLike}) => {
  console.log(menus)
  const dispatch = useDispatch()

  return (
    <>
      {
        menus.map((menu) => {
          return(
            <div className='container' key={menu.id}>
              <img className='food-img' src={`/assets/${menu.id}.jpg`} alt='#'></img>
              <div>{menu.name} {menu.price} {menu.category} {menu.like}</div>
              <button onClick={() => {
                plusLike(menu.id)
                dispatch(addLike(menu.id))
              }}>좋아요 ♥</button>
            </div>
          )
        })
      }
    </>
  )
}

export default ShowMenu
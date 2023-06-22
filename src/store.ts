import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Resturant } from './model/resturant'

let data:Resturant = {
  name:'맛있는 식당',
  category:'e',
  address:{
    city:'busan',
    detail:'somewhere',
    zipCode:2345
  },
  menu:[
    {
      name:'rose pasta',
      price:2000,
      category:'pasta',
      id:1
    },
    {
      name:'garlic steak',
      price:3000,
      category:'steak',
      id:2
    }
  ]
}

let ResturantData = createSlice({
  name: 'ResturantData',
  initialState: data,
  reducers: {

  }
})

let test = createSlice({
  name : 'test',
  initialState : [1,2,3],
  reducers : {

  }
})

export const store = configureStore({
  reducer: {
    ResturantData : ResturantData.reducer,
    test : test.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

//export default configureStore({
//  reducer: { 
//    ResturantData : ResturantData.reducer,
//    //test : test.reducer
//  }
//})
# React + TS + ReduxToolkit

## `프로젝트 만들 때 React에서 TS 같이 설치`
```
$npx create-react-app "이름" —template typescript
```

### `Resturant type 어떻게 설계했고 3덩어리로 나눈 이유`
초기 Resturant type

```javascript
export type Resturant = {
  name:string;
  category:string
  address:{
    city:string;
    detail:string;
    zipCode:number;
  };
  menu:{
    name:string;
    price:number;
    category:string;
    id:number;
    like:number
  }[];
}
```
원래 Resturant type은 위와 같은 모습이였습니다. 

곰곰히 생각해보니 나중에 내가 Resurant에 있는 모든 값을 사용하는 것이 아니라 address만 사용한다거나, menu만 사용하는 경우를 생각해서 Address Type과 Menu Type을 만들기로 결정했습니다.

Address Type, Menu Type 추가된 Resturant Type

```javascript
export type Resturant = {
  name:string;
  category:string
  address:Address;
  menu:Menu[];
}

export type Address = {
  city:string;
  detail:string;
  zipCode:number;
}

export type Menu = {
  name:string;
  price:number;
  category:string;
  id:number;
  like:number
}
```

### `React에서 Type 주는 방법`
TS를 사용하고 있으니 우리는 변수, 함수, 컴포넌트에 Type을 줘야합니다.

#### 1. 컴포넌트에 Type 주는 방법
```javascript
const App:React.FC = () => {
  return(

  )
}
```
컴포넌트 이름 옆에 **:React.FC**를 추가한다

#### 2. 변수에 Type 주는 방법
```javascript
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
      id:1,
      like:100
    },
    {
      name:'garlic steak',
      price:3000,
      category:'steak',
      id:2,
      like:200
    }
  ]
}
```
Type에 맞는 변수를 만들고 변수 옆에다가 **:Type 이름**을 추가한다.

#### 3. 함수에 Type 주는 방법
```javascript
// 파라미터가 없고 return 값이 없는 경우
const plusLike() => {
  num += 1
}

// 파라미터가 있고 return 값이 없는 경우
const plusLike(n:number) => {
  num += n
}

// 파라미터가 없고 return 값이 있는 경우
const plusLike():number => {
  return num + 1
}

// 파라미터가 있고 return 값이 있는 경우
const plusLike(n:number):number => {
  return num + n
}
```
파라미터와 return 값의 Type에 맞는 걸 **:Type**으로 적어주면 된다.

### `React 컴포넌트에서 store에 있는 변수 가져오는 법`
React 컴포넌트에서 store에 있는 변수를 사용하기 위해서는 **useSelector**를 사용해서 값을 가져와야한다.

가져오는 변수의 타입도 같이 선언을 해줘야하기에 매번 값을 가져올 때 마다 Type을 지정하는 건 번거로운 일입니다. 이걸 해결하기 위해 **제네릭 문법**을 사용할 것입니다.

store에 밑에 코드를 추가합니다.
```javascript
export type RootState = ReturnType<typeof store.getState>
```
위의 코드는 우리가 useSelector로 값을 가져올 때 RootState에 store에 있는 모든 Type이 있어 자동적으로 타입을 지정해주는 아주 유용한 기능입니다.

```javascript
import { useSelector } from "react-redux"
import { RootState } from './store';

const App:React.FC = () => {
  // state에는 store에서 export한 모든 변수들이 들어있다.
  // RootState를 사용해서 변수들의 Type을 자동으로 지정한다.
  // state.ResturantData는 store에 있는 변수 중 이름이 ResturantData인 데이터를 가져온다는 뜻입니다.
  let data = useSelector((state:RootState) => {return state.ResturantData})
  return(

  )
}
```

### `React 컴포넌트에서 store에 있는 함수 가져오는 법`
#### 1. 함수 만드는 법
```javascript
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

let ResturantData = createSlice({
  name: 'ResturantData',
  initialState: data,
  reducers: {
    addLike(state, action: PayloadAction<number>){
      console.log(state.menu[action.payload-1].like)
      state.menu[action.payload-1].like += 1
    }
  }
})

export let {addLike} = ResturantData.actions
```
함수를 사용할 때 받을 파라미터의 Type을 설정을 해줘야 합니다.

Type을 설정할 때 **PayloadAction\<Type>** 을 해주면 됩니다.

Type에는 파라미터에 맞는 Type을 지정해줍니다.

#### 2. 함수 사용하기
```javascript
import { useDispatch } from 'react-redux'
import { addLike } from '../store'

<button onClick={() => {dispatch(addLike(menu.id))}}>좋아요 ♥</button>
```
import로 함수를 불러와서 **dispatch로 감싸고 사용**하면 됩니다.

### `props로 변수, 함수 보내기`
props로 받아올 때 OwnPros라는 Type을 만들어 사용한다.

#### 1. OwnPros라는 Type에 props로 받아오는 변수들의 타입을 지정해준다.
#### 2. Type을 지정해준 것을 React.FC 옆에 \<OwnPros>라고 작성한다.
#### 3. 소괄호안에 중괄호를 열고 props로 받은 변수, 함수 이름을 작성한다.

#### `변수 보내기 예시`
```javascript
// App.tsx
const [myResturant, setMyResturant] = useState(data)

<ShowMenu menus={myResturant.menu}></ShowMenu>

// ShowMenu.tsx
import { Menu } from '../model/resturant'

interface OwnPros{
  menus : Menu[],
}

const ShowMenu:React.FC<OwnPros> = ({menus}) => {
  console.log(menus)

  return(

  )
}
```

#### `함수 보내기 예시`
```javascript
// App.tsx
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

<ShowMenu plusLike={plusLike}></ShowMenu>

// ShowMenu.tsx
interface OwnPros{
  plusLike(id:number):void
}

const ShowMenu:React.FC<OwnPros> = ({plusLike}) => {
  return(
    <button onClick={() => {plusLike(menu.id)}}>좋아요 ♥</button>
  )
}

```
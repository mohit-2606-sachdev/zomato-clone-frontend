import './App.css';
import Details from './Pages/Details';
import Home from './Pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Filter from './Pages/Filter';
import { createContext, useReducer } from 'react';
import reducer from './CounterReducer'

export const CounterContext = createContext();

const initialState=0
function App() {

  const [state, dispatch] = useReducer(reducer,initialState)
  const increment =(amount)=>{
    return dispatch({
      type:'INCREMENT',
      payload: amount
    })
  }

  const decrement =(amount)=>{
    return dispatch({
      type:'DECREMENT',
      payload: amount
    })
  }

  const reset =()=>{
    return dispatch({
      type:'RESET'
    })
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/details/:rname",
      element: <Details />,
    },
    {
      path: "/filter/:rname",
      element: <Filter />,
    }
  ]);

  return (
    <CounterContext.Provider value={{state,increment,decrement,reset}}>
      <div>
        <RouterProvider router={router} />
      </div>
    </CounterContext.Provider>
  )
}

export default App;

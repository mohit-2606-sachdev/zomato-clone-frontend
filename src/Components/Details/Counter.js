import React, { useState, useEffect, useContext } from "react";
import { CounterContext } from "../../App";
import "../../Styles/Details/Counter.css";
import '../../Styles/Details/Counter.css'


function Counter({ price }) {

  // Context Api function calling
  const { increment, decrement } = useContext(CounterContext)

  // state declaration
  const [add, setadd] = useState(true);
  const [count, setcount] = useState(0);


  // Callback functions
  const countplus = async () => {
    setcount(count + 1);
    increment(price)
  };

  const change = () => {
    setadd(false)
    setcount(count + 1);
    increment(price)
  }

  const countsub = async () => {
    if (count > 0) {
      setcount(count - 1);
      decrement(price)
    }
  };

  useEffect(() => {
    if (count < 1) {
      setadd(true)
    }
  }, [count])



  return (
    <div className="">
      {add ? (
        <button className="btn btn-sm btn-danger counter" onClick={change}>
          ADD
        </button>
      ) : (
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={countplus}
            className="btn btn-sm btn-danger sub_counter"
          >
            +
          </button>
          <button type="button" className="btn btn-sm sub_counter sub_text">
            {count}
          </button>
          <button
            type="button"
            onClick={countsub}
            className="btn btn-sm btn-danger sub_counter"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
}

export default Counter;

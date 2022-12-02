import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import type { RootState } from "../../store/store";
import { useState } from "react";

export default function Counter() {
  // const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  const resetAll = () => {
    dispatch(reset());
    setIncrementAmount(0);
  };

  return (
    <section className="grid grid-cols-2 grid-rows-3 max-w-md mx-auto gap-4">
      <h2 className="text-center font-semibold text-lg mt-4 col-span-2">
        {/* Counter: {count} */}
      </h2>
      <button className="button" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button className="button" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <div className="grid place-items-center">
        <input
          className="text-black"
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
      </div>
      <button
        className="button"
        onClick={() => dispatch(incrementByAmount(incrementAmount))}
      >
        Increment by amount
      </button>
      <button className="button col-span-2" onClick={resetAll}>
        Reset
      </button>
    </section>
  );
}

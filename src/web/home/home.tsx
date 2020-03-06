import React, { FC, useState } from "react"

export const Home: FC = () => {
  const [counter, setCounter] = useState<number>(0)
  const incriment = () => {
    setCounter(prev => prev + 1)
  }
  return (
    <div>
      <div>HOME aaaa</div>
      <div className="">{counter}</div>
      <button onClick={incriment}>+</button>
    </div>
  )
}

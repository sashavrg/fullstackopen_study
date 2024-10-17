import { useState } from 'react'


const Display = ({ counter }) => <div>{counter}</div>


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  var [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
  setClicks({...clicks, left: clicks.left +1})
  setAll(allClicks.concat('L'))
  setTotal(total +1)
  }

  const handleRightClick = () => {
  setClicks({...clicks, right: clicks.right +1})
  setAll(allClicks.concat('R'))
  setTotal(total +1)
  }


  const handleresetClick = () => {
    setClicks({left: 0, right: 0})
    setTotal(0)
  }
  const handleresetAllClicks = () => setAll([])
  console.log(allClicks)


  return (
    <>
      <Display counter={clicks.left}/>
      <Display counter={clicks.right}/>
      <Button
        onClick={handleLeftClick}
        text='left'
      />
      <Button
        onClick={handleRightClick}
        text='right'
      />
      <Button
        onClick={handleresetClick}
        text='reset'
        />
      <Button onClick={handleresetAllClicks}
      text='reset list'
      />
      <History allClicks={allClicks}/>
      <p>{total}</p>
    </>
  )
}



export default App
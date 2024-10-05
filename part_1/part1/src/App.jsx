const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </>
  )
}

const Greetings = (props) => {
  return (
    <>
      <h1>Greetings, {props.animal}</h1>
    </>
  )
}

const App = () => {
  const name = 'Shoto'
  const age = 3

  return (
    <>
      <Greetings animal= 'Cats'/>
      <Hello name= {name} age= {age}/>
      <Hello name='Namira' age= {5+4}/>
      <Hello name='Spettro' age= {4}/>
    </>
  )
}

export default App
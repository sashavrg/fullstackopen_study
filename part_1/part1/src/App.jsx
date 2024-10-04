const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const Greetings = (props) => {
  return (
    <div>
      <h1>Greetings, {props.animal}</h1>
    </div>
  )
}

const App = () => {
  const name = 'Shoto'
  const age = 3

  return (
    <div>
      <Greetings animal= 'Cats'/>
      <Hello name= {name} age= {age}/>
      <Hello name='Namira' age= '9'/>
      <Hello name='Spettro' age= '4'/>
    </div>
  )
}

export default App
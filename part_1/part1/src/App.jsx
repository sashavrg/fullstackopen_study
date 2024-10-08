const Hello = (props) => {
  console.log(props)
  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>So, you were probably born in {bornYear()}</p>
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
    </>
  )
}

export default App
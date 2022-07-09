

function Header(props) {
  return (
    <h1>{props.course}</h1>
  )
}

function Part (props) {
  return (
    <p>{props.name} <span>{props.exercises}</span></p>
  )
}

function Content(props) {
  return (
    <div>
      <Part name={props.content.parts[0].name} exercises={props.content.parts[0].exercises}/>
      <Part name={props.content.parts[1].name} exercises={props.content.parts[1].exercises}/>
      <Part name={props.content.parts[2].name} exercises={props.content.parts[2].exercises}/>
    </div>
  )
}

function Total(props) {
  return (
    <h1>{props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises}</h1>
  )
}

function App() {
  const course = "Half Stack application development"

  const content = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }




  return (

    <div>
       <Header course={course}/> 
        <Content content={content}/>  {/* I sent the whole object as props*/}
        <Total sum={content.parts}/>  {/* I sent the array inside the object as props*/}
    </div>
  );
}

export default App;

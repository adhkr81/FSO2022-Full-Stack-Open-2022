
const Course = ({course, parts}) => {


    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
    )
  }
  
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Total = ({ sum }) => <p>Number of exercises {sum}</p>
  
  
  const Part = ({ part }) => {
  
    return ( 
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  
  
  const Content = ({ parts }) => {
  
    return (
      parts.map((current) => {
      return <Part key={current.name} part={current} />      
      })
    )
  }
      
  
export default Course  
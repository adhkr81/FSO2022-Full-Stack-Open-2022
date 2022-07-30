
export function Filtered({ persons, searchbar, deleteName}) {

    if (searchbar === "") {
        return persons.map((current) => {
          return (
            <div key={current.id}>
              {current.name} {current.number} <button onClick={() => deleteName(current.id)}>DELETE</button>
            </div>
          )
        })} 
  
      return( 
        persons.filter((current) => {return current.name.toLowerCase().includes(searchbar.toLowerCase())})
        .map((current) => {
          return (
            <div key={current.name}>
              {current.name} {current.number} <button onClick={() => deleteName(current.id)}>DELETE</button>
            </div>
          )
        })
      )
  }
  
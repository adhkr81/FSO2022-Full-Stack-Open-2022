
export function Filtered({ persons, searchbar }) {

    if (searchbar === "") {
        return persons.map((current) => {
          return (
            <div key={current.id}>
              {current.name} {current.number}
            </div>
          )
        })} 
  
      return( 
        persons.filter((current) => {return current.name.toLowerCase().includes(searchbar.toLowerCase())})
        .map((current) => {
          return (
            <div key={current.id}>
              {current.name} {current.number}
            </div>
          )
        })
      )
  }
  
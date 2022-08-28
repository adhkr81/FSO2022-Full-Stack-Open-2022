
export function Filtered({ persons, searchbar, deleteName}) {

    if (searchbar === "") {
        return persons.map((current) => {
          return (
            <div key={current.id} className="d-flex justify-content-between w-50 p-2">
              <div className="w-25">
                {current.name}
              </div> 
              <div>
              {current.number}
              </div> 
              
              <button className="btn btn-danger" onClick={() => deleteName(current.id)}>X</button>
            </div>
          )
        })} 
  
      return( 
        persons.filter((current) => {return current.name.toLowerCase().includes(searchbar.toLowerCase())})
        .map((current) => {
          return (
            <div key={current.name} className="d-flex justify-content-between w-50 p-2">
              <div>
                {current.name}
              </div> 
              <div>
              {current.number}
              </div> 
              
              <button className="btn btn-danger" onClick={() => deleteName(current.id)}>X</button>
            </div>
          )
        })
      )
  }
  
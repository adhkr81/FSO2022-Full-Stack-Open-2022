

export function SearchBar ({handleFilter}) {

    return (
        <form>
          <div>
              filter shown with:{""}
              <input type="text"onChange={(event) => {handleFilter(event);}}/>
          </div>
      </form>
    )
  }

export function PersonForm ({handleSubmit, handleChange}) {

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
		<div className="d-flex justify-content-between">

					<input
						className="form-control" 
						placeholder="name"
						name="name"
						onChange={(e) => {
							handleChange(e);
						}}
					/>

					<input
						className="form-control ms-2" 
						placeholder="number"
						name="number"
						onChange={(e) => {
							handleChange(e);
						}}
					/>

					<button className="btn btn-primary ms-2" type="submit">add</button>			
		</div>
	</form>
  )
}
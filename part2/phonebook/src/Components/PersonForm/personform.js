
export function PersonForm ({handleSubmit, handleChange}) {

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
				<div>
					name:{" "}
					<input
						name="name"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div>
					number:{" "}
					<input
						name="number"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
  )
}
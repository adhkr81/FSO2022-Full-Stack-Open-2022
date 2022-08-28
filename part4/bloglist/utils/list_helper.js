const dummy = (blogs) => {
   return 1
  }


const totalLikes = (obj) => {
   mapResult = obj.map((curr) => {
      return curr.likes
    })

   const result = mapResult.reduce((accum, curr) => accum + curr)

   return result
}

const favoriteBlog = (arr) => {
  findResult = Math.max(...arr.map(obj => obj.likes))

  const result = arr.filter(curr => curr.likes === findResult)

  const favorite = result.map((curr) => {
    return (
    {title: curr.title,
    author: curr.author,
    likes: curr.likes}
  )})

  return favorite[0]
}


  
module.exports = { dummy, totalLikes, favoriteBlog }
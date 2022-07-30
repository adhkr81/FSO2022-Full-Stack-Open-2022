
export function Alert ({message}) {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        font_size: 20,
        border_style: 'solid',
        border_radius: 5,
        padding: 10,
        margin_bottom: 10
      }
      
      const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        font_size: 20,
        border_style: 'solid',
        border_radius: 5,
        padding: 10,
        margin_bottom: 10
      }


    if (message === null) {
        return null
        }
  
    if (message.includes('ERROR')){
        return (
          <div style={errorStyle}>
            {message}
          </div>
        )
    } else {
        return (
          <div style={successStyle}>
            {message}
          </div>
        )
      }
}
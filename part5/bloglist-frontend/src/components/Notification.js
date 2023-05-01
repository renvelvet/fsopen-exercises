const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  } else {
    console.log('messageType', type)
  }

  return <div className={type === 'error' ? 'error' : 'info'}>{message}</div>
}

export default Notification

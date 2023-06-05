import { useNotificationState } from '../NotificationContext'

const Notification = () => {
  const notificationText = useNotificationState()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={style}>{notificationText}</div>
}

export default Notification

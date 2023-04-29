const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={messageType === 'error' ? 'error' : 'info'}>{message}</div>
  );
};

export default Notification;

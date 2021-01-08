import React from 'react'

const notificationStyle = {
  fontSize: '14px',
  color: 'red',
  paddingTop: '4px'
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
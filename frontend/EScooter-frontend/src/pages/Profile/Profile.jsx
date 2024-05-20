import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const Profile = () => {
    const {id}=useParams()
  return (
    <div>Profile - {id}</div>
  )
}

export default Profile
import React, {useEffect, useState} from 'react'
import { listUsers } from '../services/UserService'

const ListUserComponent = () => {
    
    const [user, setUser] = useState([])

    useEffect(() =>{
        listUsers().then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

  return (
    <div className='container'>
        <h2 className='text-center'>List of Users</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Username</th>
                    <th>User Password</th>
                    <th>User Role</th>
                    <th>User DoB</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>{user.dob}</td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListUserComponent
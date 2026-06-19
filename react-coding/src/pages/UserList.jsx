import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const UserList = ()=>{

    const [users, setUsers] = useState([])
    const [errMsg, setErrMsg] = useState()
    const [successMsg, setSuccessMsg] = useState()

    const api = "https://jsonplaceholder.typicode.com/users"

    useEffect(()=>{

        const getAllUsers = async()=>{

            try{
                const response =
                await axios.get(api)
                setUsers(response.data)

            }
            catch(err){
                setErrMsg("Unable to fetch users")
            }
        }

        getAllUsers()

    },[])

    const onDelete = async(id)=>{

        try{
            await axios.delete(api + "/" + id)
            let tempUsers =[...users].filter(user => user.id !== id)
            setUsers(tempUsers)
            setSuccessMsg("User Deleted Successfully")

        }
        catch(err){
            setErrMsg("Delete Failed")
        }

    }

    return(

        <div>
            <Navbar />
            <h2>User List</h2>
            {
                successMsg !== undefined ?
                <div className="alert alert-primary">{successMsg}</div>
                : ""
            }

            {
                errMsg !== undefined ?
                <div className="alert alert-danger">
                    {errMsg}
                </div>
                : ""
            }

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        users.map((user,index)=>(
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.company?.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>
                                            onDelete(user.id)
                                        }> Delete </button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )

}

export default UserList
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const AddUser = ()=>{

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [company, setCompany] = useState("")

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const navigate = useNavigate()

    const api =
    "https://jsonplaceholder.typicode.com/users"

    const addUser = async(e)=>{

        e.preventDefault()

        const body = {
            name : name,
            email : email,
            phone : phone,
            company : {
                name : company
            }

        }

        try{

            const response =
            await axios.post(api, body)

            console.log(response.data)

            setSuccessMsg(
                "User Added Successfully"
            )

            setErrMsg(undefined)

            setTimeout(()=>{

                navigate("/users")

            },1000)

        }
        catch(err){

            setErrMsg(
                "Failed To Add User"
            )

            setSuccessMsg(undefined)

        }

    }

    return(

        <div>
            <Navbar />

            <h2>Add User</h2>

            <form onSubmit={(e)=>addUser(e)}>

                {
                    successMsg !== undefined ?

                    <div className="alert alert-primary">
                        {successMsg}
                    </div>

                    : ""
                }

                {
                    errMsg !== undefined ?

                    <div className="alert alert-danger">
                        {errMsg}
                    </div>

                    : ""
                }

                <div className="mb-3">

                    <label>Name</label>

                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e)=>
                            setName(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e)=>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>Phone</label>

                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e)=>
                            setPhone(e.target.value)
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>Company Name</label>

                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e)=>
                            setCompany(e.target.value)
                        }
                    />

                </div>

                <input
                    type="submit"
                    value="Add User"
                    className="btn btn-success"
                />

            </form>

        </div>

    )

}

export default AddUser
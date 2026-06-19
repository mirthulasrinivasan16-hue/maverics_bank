import { Routes, Route, Link } from "react-router-dom"

import UserList from "./pages/UserList"
import AddUser from "./pages/AddUser"
import Home from "./pages/Home"

const App = ()=>{

    return(

            <div className="container mt-4">

                <Routes>
                    <Route path="/users"
                        element={<UserList />}/>

                    <Route path="/add-user"
                        element={<AddUser />}/>

                    <Route path="/"
                        element={<Home />} />

                </Routes>

            </div>

    )

}

export default App
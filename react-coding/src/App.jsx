import { Routes, Route, Link } from "react-router-dom"

import UserList from "./components/UserList"
import AddUser from "./components/AddUser"
import Home from "./pages/Home"
import CharacterList from "./components/CharacterList"

const App = ()=>{

    return(

            <div className="container mt-4">

                <Routes>

                  <Route path="/"
                        element={<Home />} />

                    <Route path="/users"
                        element={<UserList />}/>

                    <Route path="/add-user"
                        element={<AddUser />}/>

                    <Route path="/character"
                        element={<CharacterList />} />

                </Routes>

            </div>

    )

}

export default App
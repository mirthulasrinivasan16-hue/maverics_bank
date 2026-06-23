import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllData } from "../store/action/characterAction"

const CharacterList = () => {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const { characters, totalPages } = useSelector(state => state.characters)
    useEffect(() => {

        dispatch(getAllData(page))

    }, [page])

    return (

        <div className="container mt-4">

            <h2>Characters</h2>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Status</th>
                        <th>Species</th>
                        <th>Origin</th>
                        <th>Location</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        characters.map((c, index) => (
                            <tr key={index}>

                                <td>{c.name}</td>
                                <td>{c.status}</td>
                                <td>{c.species}</td>
                                <td>{c.origin.name}</td>
                                <td>{c.location.name}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            <div className="text-center">

                <button 
                className="btn btn-primary me-2" 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}> 
                Previous </button>
                <span> Page {page} </span>
                <button 
                className="btn btn-primary ms-2" 
                disabled={page === totalPages} 
                onClick={() => setPage(page + 1)}>
                Next </button>

            </div>

        </div>

    )
}

export default CharacterList
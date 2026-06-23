import { useEffect,useState } from "react";
import axios from "axios";

const ViewEmployees = ({
    setActiveTab,
    setSelectedEmployeeId
}) => {

    const [employees,setEmployees] =
        useState([]);

    const [page,setPage] =
        useState(0);

    const [totalPages,setTotalPages] =
        useState(0);

    const [search,setSearch] =
    useState("");    

    const size = 5;

    const fetchEmployees =
        async () => {

            try{

                const response =
                    await axios.get(

                        `http://localhost:8080/api/employee/all/v2?page=${page}&size=${size}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setEmployees(
                    response.data.data
                );

                setTotalPages(
                    response.data.totalPages
                );
            }
            catch(error){

                console.log(error);
            }
        };

    useEffect(() => {

        fetchEmployees();

    },[page]);

    return(

        <div className="card p-4">

            <h4>
                Employee List
            </h4>

            <div className="row mb-3">

            <div className="col-md-6">

                <input
                    className="form-control"
                    placeholder="Search Employee"
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            </div>

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>
                        Employee Id
                    </th>

                    <th>
                        Name
                    </th>

                    <th>
                        Designation
                    </th>

                    <th>
                        Username
                    </th>

                    <th>
                        Branch
                    </th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    employees
                        .filter(emp =>

                            emp.employeeName
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )

                            ||

                            emp.employeeId
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .map(emp => (

                        <tr key={emp.id}>

                            <td>
                                {emp.employeeId}
                            </td>

                            <td>
                                {emp.employeeName}
                            </td>

                            <td>
                                {emp.designation}
                            </td>

                            <td>
                                {emp.username}
                            </td>

                            <td>
                                {emp.branchName}
                            </td>

                            <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => {

                                    setSelectedEmployeeId(
                                        emp.id
                                    );

                                    setActiveTab(
                                        "update"
                                    );
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => {

                                    setSelectedEmployeeId(
                                        emp.id
                                    );

                                    setActiveTab(
                                        "delete"
                                    );
                                }}
                            >
                                Delete
                            </button>

                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {

                                    setSelectedEmployeeId(
                                        emp.id
                                    );

                                    setActiveTab(
                                        "assign"
                                    );
                                }}
                            >
                                Assign Branch
                            </button>

                        </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

            <div className="d-flex justify-content-between">

                <button
                    className="btn btn-secondary"
                    disabled={page===0}
                    onClick={()=>
                        setPage(
                            page-1
                        )
                    }>

                    Previous

                </button>

                <span>

                    Page {page+1} of {totalPages}

                </span>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page+1===totalPages
                    }
                    onClick={()=>
                        setPage(
                            page+1
                        )
                    }>

                    Next

                </button>

            </div>

        </div>
    );
};

export default ViewEmployees;

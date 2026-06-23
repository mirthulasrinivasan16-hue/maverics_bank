import { useEffect, useState } from "react";
import axios from "axios";

const CustomerBranchView = () => {

    const [myBranch, setMyBranch] =
        useState(null);

    const [branches, setBranches] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const size = 5;

    const token =
        localStorage.getItem("token");

    const customerId =
        localStorage.getItem("customerId");

    const fetchMyBranch =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/customer/get-one/${customerId}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setMyBranch(
                    response.data
                );
            }
            catch(error){

                console.log(error);
            }
        };

    const fetchBranches =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/branch/all/v2?page=${page}&size=${size}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setBranches(
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

        fetchMyBranch();

        fetchBranches();

    }, [page]);

    return (

        <>

            <div className="card p-4 mb-4">

                <h4>
                    My Branch
                </h4>

                {
                    myBranch &&

                    <div className="row">

                        <div className="col-md-3">
                            <strong>Branch:</strong><br/>
                            {myBranch.branchName}
                        </div>

                        <div className="col-md-3">
                            <strong>IFSC:</strong><br/>
                            {myBranch.ifscCode}
                        </div>

                        <div className="col-md-3">
                            <strong>City:</strong><br/>
                            {myBranch.city}
                        </div>

                        <div className="col-md-3">
                            <strong>Address:</strong><br/>
                            {myBranch.address}
                        </div>

                    </div>
                }

            </div>

            <div className="card p-4">

                <h4 className="mb-3">
                    All Branches
                </h4>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search Branch Name"
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <table className="table table-bordered">

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Branch</th>
                        <th>IFSC</th>
                        <th>City</th>
                        <th>Address</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        branches
                        .filter(branch =>
                            branch.branchName
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        )
                        .map(branch => (

                            <tr key={branch.id}>

                                <td>{branch.id}</td>
                                <td>{branch.branchName}</td>
                                <td>{branch.ifscCode}</td>
                                <td>{branch.city}</td>
                                <td>{branch.address}</td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

                <div className="d-flex justify-content-between">

                    <button
                        className="btn btn-secondary"
                        disabled={page===0}
                        onClick={() =>
                            setPage(page-1)
                        }
                    >
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
                        onClick={() =>
                            setPage(page+1)
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </>
    );
};

export default CustomerBranchView;
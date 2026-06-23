import { useEffect, useState } from "react";
import axios from "axios";

import UpdateBranch from "./UpdateBranch";

const ViewBranches = () => {

    const [branches, setBranches] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [showUpdate, setShowUpdate] =
        useState(false);

    const [selectedBranch, setSelectedBranch] =
        useState(null);

    const size = 5;

    const fetchBranches = async () => {

        try {

            const response =
                await axios.get(

                    `http://localhost:8080/api/branch/all/v2?page=${page}&size=${size}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
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

        fetchBranches();

    }, [page]);

    const handleEdit =
        (branch) => {

            setSelectedBranch(
                branch
            );

            setShowUpdate(
                true
            );
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete Branch?"
                );

            if(!confirmDelete)
                return;

            try {
                console.log(
    localStorage.getItem("token")
);
                await axios.delete(

                    `http://localhost:8080/api/branch/delete/${id}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Branch Deleted Successfully"
                );

                fetchBranches();
            }
            catch(error){

                console.log(error);

                alert(
                    "Delete Failed"
                );
            }
        };

    return (

        <>

            <div className="card p-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h4>
                        Branch List
                    </h4>

                    <span className="badge bg-primary">
                        Total : {branches.length}
                    </span>

                </div>

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

                <table className="table table-bordered table-hover">

                    <thead>

                    <tr>

                        <th>ID</th>

                        <th>Branch Name</th>

                        <th>IFSC</th>

                        <th>City</th>

                        <th>Address</th>

                        <th>Actions</th>

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

                                <td>
                                    {branch.id}
                                </td>

                                <td>
                                    {branch.branchName}
                                </td>

                                <td>
                                    {branch.ifscCode}
                                </td>

                                <td>
                                    {branch.city}
                                </td>

                                <td>
                                    {branch.address}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            handleEdit(
                                                branch
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(
                                                branch.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                    </tbody>

                </table>

                <div className="d-flex justify-content-between align-items-center">

                    <button
                        className="btn btn-secondary"
                        disabled={page === 0}
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <span>

                        Page {page + 1}
                        {" "}of{" "}
                        {totalPages}

                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={
                            page + 1 === totalPages
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

            {
                showUpdate &&

                <UpdateBranch

                    branch={selectedBranch}

                    refreshBranches={fetchBranches}

                    onClose={() =>
                        setShowUpdate(
                            false
                        )
                    }

                />
            }

        </>

    );
};

export default ViewBranches;
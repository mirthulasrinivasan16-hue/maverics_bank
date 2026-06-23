import { useState } from "react";
import axios from "axios";

const UpdateBranch = () => {

    const [branchId,setBranchId] =
        useState("");

    const [branch,setBranch] =
        useState({

            branchName:"",
            ifscCode:"",
            city:"",
            address:""

        });

    const token =
        localStorage.getItem("token");

    const searchBranch =
        async () => {

            try{

                const response =
                    await axios.get(

                        `http://localhost:8080/api/branch/get-one/${branchId}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setBranch(
                    response.data
                );
            }
            catch(error){

                alert(
                    "Branch Not Found"
                );
            }
        };

    const handleChange =
        (e) => {

            setBranch({

                ...branch,

                [e.target.name]:
                    e.target.value
            });
        };

    const updateBranch =
        async (e) => {

            e.preventDefault();

            try{

                await axios.put(

                    `http://localhost:8080/api/branch/update/${branchId}`,

                    branch,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Branch Updated"
                );
            }
            catch(error){

                alert(
                    "Update Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>Update Branch</h4>

            <div className="mb-3">

                <label>
                    Branch Id
                </label>

                <input
                    type="number"
                    className="form-control"
                    value={branchId}
                    onChange={(e)=>
                        setBranchId(
                            e.target.value
                        )
                    }
                />

            </div>

            <button
                className="btn btn-secondary mb-4"
                onClick={searchBranch}>

                Search

            </button>

            <form onSubmit={updateBranch}>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Branch Name
                    </label>

                    <div className="col-md-9">

                        <input
                            className="form-control"
                            name="branchName"
                            value={branch.branchName}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        IFSC Code
                    </label>

                    <div className="col-md-9">

                        <input
                            className="form-control"
                            name="ifscCode"
                            value={branch.ifscCode}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        City
                    </label>

                    <div className="col-md-9">

                        <input
                            className="form-control"
                            name="city"
                            value={branch.city}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Address
                    </label>

                    <div className="col-md-9">

                        <textarea
                            className="form-control"
                            name="address"
                            value={branch.address}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button
                    className="btn btn-warning">

                    Update Branch

                </button>

            </form>

        </div>
    );
};

export default UpdateBranch;
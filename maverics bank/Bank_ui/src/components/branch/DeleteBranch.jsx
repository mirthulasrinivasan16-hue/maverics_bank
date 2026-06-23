import { useState } from "react";
import axios from "axios";

const DeleteBranch = () => {

    const [branchId,setBranchId] =
        useState("");

    const deleteBranch =
        async () => {

            try{

                await axios.delete(

                    `http://localhost:8080/api/branch/delete/${branchId}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Branch Deleted"
                );
            }
            catch(error){

                alert(
                    "Delete Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>Delete Branch</h4>

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
                className="btn btn-danger"
                onClick={deleteBranch}>

                Delete Branch

            </button>

        </div>
    );
};

export default DeleteBranch;
import { useEffect,useState } from "react";
import axios from "axios";

const AssignEmployeeBranch = ({employeeId}) => {

    const [branchId,setBranchId] =
        useState("");

    const [branches,setBranches] =
    useState([]);    

    const fetchBranches =
    async () => {

        const response =
            await axios.get(

                "http://localhost:8080/api/branch/all",

                {
                    headers:{
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

        setBranches(
            response.data
        );
    };

    useEffect(() => {

    fetchBranches();

}, []);

    const assignBranch =
        async (e) => {

            e.preventDefault();

            try{

                await axios.put(

                    `http://localhost:8080/api/employee/assign-branch/${employeeId}`,

                    {
                        branchId
                    },

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Branch Assigned"
                );
            }
            catch(error){

                alert(
                    "Assignment Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>Assign Branch</h4>

            <form onSubmit={assignBranch}>
                <div className="mb-3">

                    <label>
                        Employee Id
                    </label>

                    <input
                        className="form-control"
                        value={employeeId}
                        disabled
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Branch Id
                    </label>

                   <select
    className="form-select"
    value={branchId}
    onChange={(e)=>
        setBranchId(
            e.target.value
        )
    }
>

    <option value="">
        Select Branch
    </option>

    {
        branches.map(branch => (

            <option
                key={branch.id}
                value={branch.id}
            >
                {branch.branchName}
            </option>

        ))
    }

</select>

                </div>

                <button
                    className="btn btn-success">

                    Assign

                </button>

            </form>

        </div>
    );
};

export default AssignEmployeeBranch;
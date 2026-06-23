import { useState } from "react";
import axios from "axios";

const AddBranch = () => {

    const [branch,setBranch] =
        useState({

            branchName : "",
            ifscCode : "",
            city : "",
            address : ""

        });

    const handleChange = (e) => {

        setBranch({

            ...branch,
            [e.target.name] :
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await axios.post(

                "http://localhost:8080/api/branch/add",

                branch,

                {
                    headers : {

                        Authorization :
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(
                "Branch Added Successfully"
            );
        }
        catch(err){

            alert(
                "Unable To Add Branch"
            );
        }
    };

    return(

        <div className="card p-4">

            <h4>Add Branch</h4>

            <form onSubmit={handleSubmit}>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Branch Name
                    </label>

                    <div className="col-md-9">

                        <input
                            type="text"
                            name="branchName"
                            className="form-control"
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
                            type="text"
                            name="ifscCode"
                            className="form-control"
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
                            type="text"
                            name="city"
                            className="form-control"
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
                            name="address"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button className="btn btn-primary">

                    Add Branch

                </button>

            </form>

        </div>
    );
};

export default AddBranch;
import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {

    const [employee,setEmployee] =
        useState({

            employeeName : "",
            designation : "",
            phone : "",
            gender : "",
            joiningDate : "",
            email : "",
            password : ""

        });

    const handleChange = (e) => {

        setEmployee({

            ...employee,
            [e.target.name] :
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await axios.post(

                "http://localhost:8080/api/employee/add",

                employee,

                {
                    headers : {

                        Authorization :
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(
                "Employee Added Successfully"
            );
        }
        catch(err){

            alert(
                "Unable To Add Employee"
            );
        }
    };

    return(

        <div className="card p-4">

            <h4>Add Employee</h4>

            <form onSubmit={handleSubmit}>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Employee Name
                    </label>

                    <div className="col-md-9">

                        <input
                            type="text"
                            name="employeeName"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Designation
                    </label>

                    <div className="col-md-9">

                        <input
                            type="text"
                            name="designation"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Phone
                    </label>

                    <div className="col-md-9">

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Gender
                    </label>

                    <div className="col-md-9">

                        <select
                            name="gender"
                            className="form-select"
                            onChange={handleChange}>

                            <option>
                                Select
                            </option>

                            <option>
                                MALE
                            </option>

                            <option>
                                FEMALE
                            </option>

                        </select>

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Joining Date
                    </label>

                    <div className="col-md-9">

                        <input
                            type="date"
                            name="joiningDate"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Email
                    </label>

                    <div className="col-md-9">

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <label className="col-md-3">
                        Password
                    </label>

                    <div className="col-md-9">

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <button className="btn btn-primary">

                    Add Employee

                </button>

            </form>

        </div>
    );
};

export default AddEmployee;
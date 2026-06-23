import { useEffect, useState } from "react";
import axios from "axios";

const UpdateEmployee = (
    {employeeId}
) => {

    const [employee,setEmployee] =
        useState({

            employeeName:"",
            designation:"",
            phone:"",
            gender:"",
            joiningDate:"",
            email:"",
            password:""

        });

    const token =
        localStorage.getItem("token");

   const searchEmployee =
    async () => {

        if(!employeeId) return;

        try{

            const response =
                await axios.get(

                    `http://localhost:8080/api/employee/get-one/${employeeId}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setEmployee(
                response.data
            );
        }
        catch(error){

            console.log(error);
        }
    };

    useEffect(() => {

    searchEmployee();

}, [employeeId]);

    const handleChange =
        (e) => {

            setEmployee({

                ...employee,

                [e.target.name]:
                    e.target.value
            });
        };

    const updateEmployee =
        async (e) => {

            e.preventDefault();

            try{

                await axios.put(

                    `http://localhost:8080/api/employee/update/${employeeId}`,

                    employee,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Employee Updated"
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

            <h4>Update Employee</h4>

            <form onSubmit={updateEmployee}>

                <div className="row mb-3">
                    <label className="col-md-3">
                        Employee Name
                    </label>

                    <div className="col-md-9">

                        <input
                            className="form-control"
                            name="employeeName"
                            value={employee.employeeName}
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
                            className="form-control"
                            name="designation"
                            value={employee.designation}
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
                            className="form-control"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                        />

                    </div>
                </div>

                <button
                    className="btn btn-warning">

                    Update Employee

                </button>

            </form>

        </div>
    );
};

export default UpdateEmployee;
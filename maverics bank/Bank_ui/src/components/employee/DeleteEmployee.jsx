import { useState } from "react";
import axios from "axios";

const DeleteEmployee = ({employeeId}) => {

    const deleteEmployee =
        async () => {

            try{

                await axios.delete(

                    `http://localhost:8080/api/employee/delete/${employeeId}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Employee Deleted"
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

    <h4>
        Delete Employee
    </h4>

    <p>
        Are you sure you want to delete employee id :
        <strong> {employeeId} </strong>
    </p>

    <button
        className="btn btn-danger"
        onClick={deleteEmployee}
    >
        Delete Employee
    </button>

</div>
    );
};

export default DeleteEmployee;
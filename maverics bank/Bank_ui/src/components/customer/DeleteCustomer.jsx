import { useState } from "react";
import axios from "axios";

const DeleteCustomer = () => {

    const [customerId, setCustomerId] =
        useState("");

    const deleteCustomer =
        async () => {

            try {

                await axios.delete(

                    `http://localhost:8080/api/customer/delete/${customerId}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Customer Deleted Successfully"
                );

            }
            catch (error) {

                alert(
                    "Delete Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Delete Customer
            </h4>

            <div className="mb-3">

                <label>
                    Customer Id
                </label>

                <input
                    type="number"
                    className="form-control"
                    value={customerId}
                    onChange={(e) =>
                        setCustomerId(
                            e.target.value
                        )
                    }
                />

            </div>

            <button
                className="btn btn-danger"
                onClick={deleteCustomer}
            >
                Delete Customer
            </button>

        </div>
    );
};

export default DeleteCustomer;
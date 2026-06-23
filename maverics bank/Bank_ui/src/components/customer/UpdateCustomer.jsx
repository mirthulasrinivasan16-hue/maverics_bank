import { useEffect, useState } from "react";
import axios from "axios";

const UpdateCustomer = ({
    customer,
    onClose,
    refreshCustomers
}) => {

    const [formData, setFormData] =
        useState(customer);

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        setFormData(customer);

    }, [customer]);

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const updateCustomer =
        async (e) => {

            e.preventDefault();

            try {

                await axios.put(

                    `http://localhost:8080/api/customer/update/v2/${formData.id}`,

                    formData,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Customer Updated Successfully"
                );

                refreshCustomers();

                onClose();

            }
            catch(error){

                alert(
                    "Update Failed"
                );
            }
        };

    if(!customer)
        return null;

    return (

        <div className="card p-4 mt-3">

            <div className="d-flex justify-content-between mb-3">

                <h4>
                    Update Customer
                </h4>

                <button
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

            <form onSubmit={updateCustomer}>

                <div className="mb-3">

                    <label>
                        Customer Name
                    </label>

                    <input
                        className="form-control"
                        name="customerName"
                        value={formData.customerName || ""}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Phone
                    </label>

                    <input
                        className="form-control"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Address
                    </label>

                    <input
                        className="form-control"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        PAN Number
                    </label>

                    <input
                        className="form-control"
                        name="panNumber"
                        value={formData.panNumber || ""}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Gender
                    </label>

                    <select
                        className="form-select"
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="MALE">
                            MALE
                        </option>

                        <option value="FEMALE">
                            FEMALE
                        </option>

                    </select>

                </div>

                <div className="mb-3">

                    <label>
                        DOB
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob || ""}
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="btn btn-warning"
                >
                    Update Customer
                </button>

            </form>

        </div>
    );
};

export default UpdateCustomer;
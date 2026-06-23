import { useEffect, useState } from "react";
import axios from "axios";

const UpdateProfile = () => {

    const customerId =
        localStorage.getItem("customerId");

    const [customerName, setCustomerName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [panNumber, setPanNumber] =
        useState("");

    const [gender, setGender] =
        useState("");

    const [dob, setDob] =
        useState("");

    useEffect(() => {

        fetchCustomer();

    }, []);

    const fetchCustomer =
        async () => {

            try {

                const response =
                    await axios.get(
                        `http://localhost:8080/api/customer/get-one/${customerId}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                const customer =
                    response.data;

                setCustomerName(
                    customer.customerName || ""
                );

                setPhone(
                    customer.phone || ""
                );

                setAddress(
                    customer.address || ""
                );

                setPanNumber(
                    customer.panNumber || ""
                );

                setGender(
                    customer.gender || ""
                );

                if(customer.dob){

                    setDob(
                        customer.dob
                    );
                }

            }
            catch(error){

                console.log(error);
            }
        };

    const updateProfile =
        async (e) => {

            e.preventDefault();

            try {

                await axios.put(
                    `http://localhost:8080/api/customer/update/v2/${customerId}`,
                    {
                        customerName,
                        phone,
                        address,
                        panNumber,
                        gender,
                        dob
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Profile Updated Successfully"
                );

            }
            catch(error){

                console.log(error);

                alert(
                    "Update Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Update Profile
            </h4>

            <form
                onSubmit={updateProfile}
            >

                <div className="mb-3">

                    <label className="form-label">
                        Customer Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Phone
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) =>
                            setPhone(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Address
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        value={address}
                        onChange={(e) =>
                            setAddress(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        PAN Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={panNumber}
                        onChange={(e) =>
                            setPanNumber(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Gender
                    </label>

                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) =>
                            setGender(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="MALE">
                            Male
                        </option>

                        <option value="FEMALE">
                            Female
                        </option>

                        <option value="OTHER">
                            Other
                        </option>

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Date Of Birth
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) =>
                            setDob(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Update Profile
                </button>

            </form>

        </div>
    );
};

export default UpdateProfile;
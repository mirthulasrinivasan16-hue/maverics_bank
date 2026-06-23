import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/auth.css";

function CompleteProfile() {

    const navigate = useNavigate();

    const [branches,setBranches] =
        useState([]);

    const [profile,setProfile] =
        useState({

            address : "",
            panNumber : "",
            gender : "",
            dob : "",
            branchId : ""

        });

    const token =
        localStorage.getItem("token");

    const customerId =
        localStorage.getItem("customerId");

    useEffect(() => {

        fetchBranches();

    }, []);

    const fetchBranches =
        async () => {

            try{

                const response =
                    await axios.get(
                        "http://localhost:8080/api/branch/all"
                    );

                setBranches(
                    response.data
                );
            }
            catch(error){

                console.log(error);
            }
        };

    const handleChange =
        (e) => {

            setProfile({

                ...profile,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try{

                await axios.put(

                    `http://localhost:8080/api/customer/complete-profile/${customerId}`,

                    profile,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert(
                    "Profile completed successfully"
                );

                navigate(
                    "/customer"
                );
            }
            catch(error){

                alert(
                    "Unable to complete profile"
                );

                console.log(error);
            }
        };

    return(

        <div className="auth-container">

            <div className="auth-left">

                <div className="logo">

                    <h1>
                        MAVERICS
                    </h1>

                    <span>
                        BANK
                    </span>

                </div>

                <div className="hero-content">

                    <h2>

                        Almost there,

                        <span>
                            {" "}complete your profile.
                        </span>

                    </h2>

                    <p>

                        Just a few details to
                        activate your banking
                        experience.

                    </p>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-card">

                    <h5>
                        Complete Profile
                    </h5>

                    <h1>
                        Customer Information
                    </h1>

                    <p>
                        Provide your details to
                        continue.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Address
                        </label>

                        <input
                            type="text"
                            name="address"
                            onChange={handleChange}
                            placeholder="Enter address"
                        />

                        <label>
                            PAN Number
                        </label>

                        <input
                            type="text"
                            name="panNumber"
                            onChange={handleChange}
                            placeholder="Enter PAN Number"
                        />

                        <label>
                            Gender
                        </label>

                        <select
                            name="gender"
                            onChange={handleChange}
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

                        </select>

                        <label>
                            Date Of Birth
                        </label>

                        <input
                            type="date"
                            name="dob"
                            onChange={handleChange}
                        />

                        <label>
                            Select Branch
                        </label>

                        <select
                            name="branchId"
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Branch
                            </option>

                            {
                                branches.map(
                                    branch => (

                                        <option
                                            key={branch.id}
                                            value={branch.id}
                                        >

                                            {
                                                branch.branchName
                                            }

                                        </option>
                                    )
                                )
                            }

                        </select>

                        <button
                            className="auth-btn"
                        >

                            Complete Profile

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CompleteProfile;
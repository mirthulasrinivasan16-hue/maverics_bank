import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/auth.css";

function Signup() {

    const navigate = useNavigate();

    const [form,setForm] =
        useState({

            customerName : "",
            username : "",
            phone : "",
            email : "",
            password : "",
            confirmPassword : ""

        });

    const [errMsg,setErrMsg] =
        useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name] :
                e.target.value
        });
    };

    const handleSignup =
        async (e) => {

            e.preventDefault();

            setErrMsg("");

            if(
                form.password !==
                form.confirmPassword
            ){

                setErrMsg(
                    "Passwords do not match"
                );

                return;
            }

            try{

                await axios.post(

                    "http://localhost:8080/api/customer/signup",

                    {

                        customerName:
                            form.customerName,

                        username:
                            form.username,

                        phone:
                            form.phone,

                        email:
                            form.email,

                        password:
                            form.password

                    }
                );

                alert(
                    "Account created successfully"
                );

                navigate("/");
            }
            catch(error){

                setErrMsg(

                    error.response?.data ||

                    "Signup failed"
                );
            }
        };

    return(

        <div className="auth-container">

            <div className="auth-left">

                <div className="logo">

                    <h1>
                        MAVERICS BANK
                    </h1>

                </div>

                <div className="hero-content">

                    <h2>

                        Banking that

                        <span>
                            {" "}moves with you.
                        </span>

                    </h2>

                    <p>

                        Create your account and
                        experience secure, smart
                        and seamless banking.

                    </p>

                    <div className="feature">

                        <h4>
                            Secure & Trusted
                        </h4>

                        <p>
                            Advanced security to
                            keep your information
                            safe.
                        </p>

                    </div>

                    <div className="feature">

                        <h4>
                            Fast & Seamless
                        </h4>

                        <p>
                            Open your account in
                            just a few simple steps.
                        </p>

                    </div>

                    <div className="feature">

                        <h4>
                            Smart Banking
                        </h4>

                        <p>
                            Manage your finances,
                            track insights and grow
                            your wealth.
                        </p>

                    </div>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-card">

                    <h5>
                        Create Account
                    </h5>

                    <h1>
                        Sign up
                    </h1>

                    <p>
                        Fill in the details below
                        to create your account
                    </p>

                    {
                        errMsg &&
                        <div className="error-msg">
                            {errMsg}
                        </div>
                    }

                    <form
                        onSubmit={handleSignup}
                    >

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="customerName"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                        />

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            onChange={handleChange}
                        />

                        <label>
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter mobile number"
                            onChange={handleChange}
                        />

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            onChange={handleChange}
                        />

                        <label>
                            Create Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            onChange={handleChange}
                        />

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />

                        <button
                            className="auth-btn"
                        >
                            Create Account
                        </button>

                    </form>

                    <div
                        style={{
                            marginTop:"20px",
                            textAlign:"center"
                        }}
                    >

                        Already have an account?

                        <Link
                            to="/"
                            style={{
                                marginLeft:"8px"
                            }}
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;
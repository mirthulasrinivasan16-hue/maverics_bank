import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/auth.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const loginResp =
                await axios.get(
                    "http://localhost:8080/api/auth/login",
                    {
                        auth: {
                            username,
                            password
                        }
                    }
                );

            const token =
                loginResp.data.token;

            localStorage.setItem(
                "token",
                token
            );

            const userResp =
                await axios.get(
                    "http://localhost:8080/api/auth/user-details",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            localStorage.setItem(
                "role",
                userResp.data.role
            );

            localStorage.setItem(
                "customerId",
                userResp.data.customerId
            );

            localStorage.setItem(
    "userId",
    userResp.data.id
);

            localStorage.setItem(
    "username",
    userResp.data.username
);

            if(userResp.data.role === "ADMIN"){

                navigate("/admin");
            }
            else if(userResp.data.role === "EMPLOYEE"){

                navigate("/employee");
            }
            else if(userResp.data.role === "CUSTOMER"){

                if(
                    !userResp.data.profileCompleted
                ){

                    navigate(
                        "/complete-profile"
                    );
                }
                else{

                    navigate(
                        "/customer"
                    );
                }
            }

        }
        catch(err){

            setErrMsg(
                "Invalid Username or Password"
            );
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-left">

                <div className="logo">

                    <h1>MAVERICS BANK</h1>

                </div>

                <div className="hero-content">

                    <h2>

                        Banking that

                        <span>
                            {" "}moves with you.
                        </span>

                    </h2>

                    <p>
                        Secure, smart and seamless
                        banking experience tailored
                        for you.
                    </p>

                    <div className="feature">

                        <h4>
                            Bank with Confidence
                        </h4>

                        <p>
                            Advanced security to
                            protect what matters.
                        </p>

                    </div>

                    <div className="feature">

                        <h4>
                            Fast & Seamless
                        </h4>

                        <p>
                            Send, receive and pay
                            in seconds.
                        </p>

                    </div>

                    <div className="feature">

                        <h4>
                            Smarter Insights
                        </h4>

                        <p>
                            Track, analyze and grow
                            your wealth.
                        </p>

                    </div>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-card">

                    <h5>
                        Welcome Back!
                    </h5>

                    <h1>
                        Login to your account

                    </h1>

                    <p>

                        Enter your credentials to
                        access your account
                    </p>

                    {
                        errMsg &&
                        <div className="error-msg">
                            {errMsg}
                        </div>
                    }

                    <form onSubmit={handleLogin}>

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e)=>
                                setUsername(
                                    e.target.value
                                )
                            }
                        />

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="auth-btn"
                        >
                            Login
                        </button>

                    </form>

                    <div className="signup-box">

                        <div>

                            <h4>
                                New to Maverics Bank?
                            </h4>

                            <p>
                                Create an account and
                                start your banking
                                journey.
                            </p>

                        </div>

                        <Link
                            to="/signup"
                            className="signup-btn"
                        >
                            Sign Up
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
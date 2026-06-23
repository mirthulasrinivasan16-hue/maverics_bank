import { useEffect, useState } from "react";
import axios from "axios";

const ViewProfile = () => {

    const [customer, setCustomer] =
        useState(null);

   const fetchProfile =
    async () => {

        try {

            const customerId =
    localStorage.getItem(
        "customerId"
    );

const response =
    await axios.get(
        `http://localhost:8080/api/customer/get-one/${customerId}`,
        {
            headers:{
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

            setCustomer(
                response.data
            );

        }
        catch(error){

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProfile();

    }, []);

    if(!customer){

        return <p>Loading...</p>;
    }

    return (

        <div className="card p-4">

            <h4>
                My Profile
            </h4>

            <table className="table">

                <tbody>

                <tr>
                    <th>Name</th>
                    <td>{customer.customerName}</td>
                </tr>

                <tr>
                    <th>Phone</th>
                    <td>{customer.phone}</td>
                </tr>

                <tr>
                    <th>Username</th>
                    <td>{customer.username}</td>
                </tr>

                <tr>
                    <th>Address</th>
                    <td>{customer.address}</td>
                </tr>

                <tr>
                    <th>PAN</th>
                    <td>{customer.panNumber}</td>
                </tr>

                <tr>
                    <th>Gender</th>
                    <td>{customer.gender}</td>
                </tr>

                <tr>
                    <th>Branch</th>
                    <td>{customer.branchName}</td>
                </tr>

                </tbody>

            </table>

        </div>
    );
};

export default ViewProfile;
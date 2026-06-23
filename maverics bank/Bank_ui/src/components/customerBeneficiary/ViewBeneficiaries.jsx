import { useEffect, useState } from "react";
import axios from "axios";

const ViewBeneficiaries = () => {

    const [beneficiaries, setBeneficiaries] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const fetchBeneficiaries =
        async () => {

            try {

                const customerId =
                    localStorage.getItem(
                        "customerId"
                    );

                const response =
                    await axios.get(

                        `http://localhost:8080/api/beneficiary/customer/${customerId}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setBeneficiaries(
                    response.data
                );
            }
            catch(error){

                console.log(error);
            }
        };

    const removeBeneficiary =
        async (id) => {

            if(
                !window.confirm(
                    "Remove beneficiary?"
                )
            ){
                return;
            }

            try{

                await axios.delete(

                    `http://localhost:8080/api/beneficiary/delete/${id}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                fetchBeneficiaries();

            }
            catch(error){

                alert(
                    "Delete Failed"
                );
            }
        };

    useEffect(() => {

        fetchBeneficiaries();

    }, []);

    return (

        <div className="card p-4">

            <h4>
                Beneficiary List
            </h4>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Beneficiary"
                value={search}
                onChange={(e)=>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>Name</th>
                    <th>Account Number</th>
                    <th>IFSC</th>
                    <th>Branch</th>
                    <th>Nickname</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    beneficiaries

                    .filter(
                        beneficiary =>

                            beneficiary
                            .beneficiaryName
                            .toLowerCase()
                            .includes(
                                search
                                .toLowerCase()
                            )
                    )

                    .map(
                        beneficiary => (

                        <tr
                            key={
                                beneficiary.id
                            }
                        >

                            <td>
                                {
                                    beneficiary
                                    .beneficiaryName
                                }
                            </td>

                            <td>
                                {
                                    beneficiary
                                    .accountNumber
                                }
                            </td>

                            <td>
                                {
                                    beneficiary
                                    .ifscCode
                                }
                            </td>

                            <td>
                                {
                                    beneficiary
                                    .branchName
                                }
                            </td>

                            <td>
                                {
                                    beneficiary
                                    .nickname
                                }
                            </td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        removeBeneficiary(
                                            beneficiary.id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

        </div>
    );
};

export default ViewBeneficiaries;
import { useState } from "react";

const SearchLoan = () => {

    const [search, setSearch] =
        useState("");

    return (

        <div className="card p-4">

            <h4>
                Search Loan
            </h4>

            <input
                className="form-control"
                placeholder="Loan Type"
                value={search}
                onChange={(e)=>
                    setSearch(
                        e.target.value
                    )
                }
            />

        </div>
    );
};

export default SearchLoan;
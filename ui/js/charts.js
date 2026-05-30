// ==========================================
// ADMIN DASHBOARD CHARTS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Transaction Chart

    const transactionCanvas =
        document.getElementById("transactionChart");

    if(transactionCanvas){

        new Chart(transactionCanvas, {

            type: "bar",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets: [{

                    label: "Transactions",

                    data: [
                        1200,
                        1500,
                        1800,
                        2200,
                        2600,
                        3000
                    ]

                }]

            }

        });

    }

    // Loan Chart

    const loanCanvas =
        document.getElementById("loanChart");

    if(loanCanvas){

        new Chart(loanCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Home",
                    "Personal",
                    "Vehicle",
                    "Education"
                ],

                datasets: [{

                    data: [
                        45,
                        25,
                        20,
                        10
                    ]

                }]

            }

        });

    }

    // Customer Growth

    const customerCanvas =
        document.getElementById("customerChart");

    if(customerCanvas){

        new Chart(customerCanvas, {

            type: "line",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets: [{

                    label: "Customers",

                    data: [
                        8000,
                        8600,
                        9200,
                        10000,
                        11200,
                        12458
                    ],

                    fill: true,
                    tension: 0.4

                }]

            }

        });

    }

});
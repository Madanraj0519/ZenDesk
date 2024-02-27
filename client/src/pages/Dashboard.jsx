import React from 'react';
import '../style/dashboard.css';

const Dashboard = () => {
    return (
        <>
            <h1 className="dashboard page_title pt-2">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <i className="icon fas fa-list text-5xl"></i>
                        <div className="mt-4">
                            <p className="font-bold text-lg">Tickets</p>
                            <p>Total number of outstanding tickets: </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <i className="fas fa-user-tie text-5xl"></i>
                        <div className="mt-4">
                            <p className="font-bold text-lg">Clients</p>
                            <p>Clients Added This Month: </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <i className="icon fas fa-people-carry text-5xl"></i>
                        <div className="mt-4">
                            <p className="font-bold text-lg">Jobs</p>
                            <p>Jobs Added This Month: </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <i className="fas fa-money-check-alt text-5xl"></i>
                        <div className="mt-4">
                            <p className="font-bold text-lg">Transactions</p>
                            <p>Income YTD: $</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="col-span-1 sm:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <canvas></canvas>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <canvas></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

import React from 'react';
import DashboardSidebar from '../features/DashboardSidebar';

const Dashboard = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-900">
         <div className="flex flex-grow">
             <DashboardSidebar />
           <div className="flex flex-col w-full">
            {/* Your other dashboard components go here */}
          </div>
        </div>
      </div>
    );
};

export default Dashboard;

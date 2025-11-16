import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getStatistics, APPLICATION_STATUSES } from '../utils/storage';

const COLORS = {
  'Not yet submitted': '#94a3b8',
  'Submitted': '#3b82f6',
  'Proceeded to interview': '#8b5cf6',
  'Rejected': '#ef4444',
  'Accepted': '#10b981'
};

function Home() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadStats();

    // Listen for storage changes from other tabs or updates
    const handleStorageChange = () => {
      loadStats();
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('applicationsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('applicationsUpdated', handleStorageChange);
    };
  }, []);

  const loadStats = () => {
    const statistics = getStatistics();
    setStats(statistics);

    // Convert to chart data format
    const data = APPLICATION_STATUSES.map(status => ({
      name: status,
      value: statistics[status] || 0
    })).filter(item => item.value > 0); // Only show statuses with applications

    setChartData(data);
  };

  const totalApplications = Object.values(stats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your job applications</p>
      </div>

      {totalApplications === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-4">Start tracking your job applications by adding your first one!</p>
          <a
            href="/applications"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Application
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
              <div className="space-y-3">
                {APPLICATION_STATUSES.map(status => (
                  <div key={status} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: COLORS[status] }}
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{stats[status] || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <div className="text-sm font-medium opacity-90">Total Applications</div>
              <div className="text-4xl font-bold mt-2">{totalApplications}</div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

const STORAGE_KEY = 'jobApplications';

export const APPLICATION_STATUSES = [
  'Not yet submitted',
  'Submitted',
  'Proceeded to interview',
  'Rejected',
  'Accepted'
];

// Get all applications from localStorage
export const getApplications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save applications to localStorage
export const saveApplications = (applications) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Add a new application
export const addApplication = (application) => {
  const applications = getApplications();
  const newApplication = {
    id: Date.now().toString(),
    ...application,
    createdAt: new Date().toISOString()
  };
  applications.push(newApplication);
  saveApplications(applications);
  return newApplication;
};

// Update an existing application
export const updateApplication = (id, updatedData) => {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === id);
  if (index !== -1) {
    applications[index] = { ...applications[index], ...updatedData };
    saveApplications(applications);
    return applications[index];
  }
  return null;
};

// Delete an application
export const deleteApplication = (id) => {
  const applications = getApplications();
  const filtered = applications.filter(app => app.id !== id);
  saveApplications(filtered);
  return filtered;
};

// Get aggregated statistics
export const getStatistics = () => {
  const applications = getApplications();
  const stats = APPLICATION_STATUSES.reduce((acc, status) => {
    acc[status] = applications.filter(app => app.status === status).length;
    return acc;
  }, {});
  return stats;
};

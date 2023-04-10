import Employee from './Employee.interface';

interface ProjectProfilesResult {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    description: string,
    employees: Employee[],
}

export default ProjectProfilesResult;
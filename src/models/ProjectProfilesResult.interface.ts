import EmployeeResult from './EmployeeResult.interface';

interface ProjectProfilesResult {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    description: string,
    employees: EmployeeResult[],
}

export default ProjectProfilesResult;
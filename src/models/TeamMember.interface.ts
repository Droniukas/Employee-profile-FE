import Employee from './Employee.interface';

interface TeamMember extends Employee {
  teamMemberStatus: string;
  teamMemberStartDate: string;
  teamMemberEndDate: string;
}
export default TeamMember;

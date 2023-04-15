import TeamMember from './TeamMember.interface';

interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  teamMembers: TeamMember[];
  status: string;
}

export default Project;

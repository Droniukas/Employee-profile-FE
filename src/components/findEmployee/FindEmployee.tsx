import './FindEmployee.scss';

import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';

import Employee from '../../models/Employee.interface';
import SearchAchievement from '../../models/SearchAchievement.interface';
import SearchDropdownOption from '../../models/SearchDropdownOption.interface';
import SearchSkill from '../../models/SearchSkill.interface';
import { AchievementsService } from '../../services/achievements.service';
import { EmployeeService } from '../../services/employee.service';
import { SkillsService } from '../../services/skills.service';
import SearchDropdown from '../inputs/SearchDropdown';
import SearchInput from '../inputs/SearchInput';
import FindEmployeeResults from './FindEmployeeResults';

const FindEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalEmployeesCount, setEmployeesCount] = useState<number>(0);
  const [inputValue, _setInputValue] = useState('');
  const [rowsPerPage, _setRowsPerPage] = useState<number>(10);
  const [page, _setPage] = useState<number>(0);
  const [dropdownSkills, setDropdownSkills] = useState<SearchSkill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<SearchDropdownOption[]>([]);
  const [dropdownAchievements, setDropdownAchievements] = useState<SearchAchievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<SearchDropdownOption[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<boolean>(false);

  const inputValueRef = useRef(inputValue);
  const rowsPerPageRef = useRef(rowsPerPage);
  const pageRef = useRef(page);
  const selectedSkillRef = useRef(selectedSkill);
  const selectedAchievementRef = useRef(selectedAchievement);

  const rowSizeOptions = [10, 20, 30, { label: 'All', value: -1 }];

  const employeeService = new EmployeeService();
  const skillService = new SkillsService();
  const achievementService = new AchievementsService();

  const setInputValue = (val: string) => {
    inputValueRef.current = val;
    _setInputValue(val);
  };

  const setRowsPerPage = (val: number) => {
    rowsPerPageRef.current = val;
    _setRowsPerPage(val);
  };

  const setPage = (val: number) => {
    pageRef.current = val;
    _setPage(val);
  };

  const getSkillsCategories = async () => {
    const results = await skillService.getSkillsCategories();
    setDropdownSkills(results);
  };

  const handleSearchSkillChange = (value: SearchDropdownOption[]) => {
    selectedSkillRef.current = value;
    setSelectedSkill(value);
    getEmployees();
    checkIfSearchCriteriaDefined();
  };

  const getAchievementsCategories = async () => {
    const results = await achievementService.getAchievementsCategories();
    setDropdownAchievements(results);
  };

  const handleSearchAchievementChange = (value: SearchDropdownOption[]) => {
    selectedAchievementRef.current = value;
    setSelectedAchievement(value);
    getEmployees();
    checkIfSearchCriteriaDefined();
  };

  const getEmployees = async () => {
    const results = await employeeService.searchByNameSkillsAchievements(
      inputValueRef.current,
      selectedSkillRef.current.map((skill) => skill.id),
      selectedAchievementRef.current.map((achievement) => achievement.id),
      pageRef.current,
      rowsPerPageRef.current,
    );
    setEmployees(results.employees);
    setEmployeesCount(results.count);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setPage(0);
      getEmployees();
      checkIfSearchCriteriaDefined();
      event.preventDefault();
    }
  };

  useEffect(() => {
    getSkillsCategories();
    getAchievementsCategories();
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    getEmployees();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getEmployees();
  };

  const checkIfSearchCriteriaDefined = () => {
    if (!selectedSkillRef.current.length && !selectedAchievementRef.current.length && !inputValueRef.current.length) {
      setSearchCriteria(false);
    } else {
      setSearchCriteria(true);
    }
  };

  const handleFindEmployeeResults = (employees: Employee[]) => {
    if (employees.length > 0) {
      return (
        <>
          <FindEmployeeResults employees={employees} />
          <TablePagination
            component="div"
            count={totalEmployeesCount}
            page={!totalEmployeesCount || totalEmployeesCount <= 0 ? 0 : pageRef.current}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPageRef.current}
            rowsPerPageOptions={rowSizeOptions}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      );
    } else {
      if (searchCriteria)
        return (
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: 20,
              mt: 3,
            }}
          >
            No employees match search criteria.
          </Typography>
        );

      return (
        <Typography
          sx={{
            color: 'primary.main',
            fontSize: 20,
            mt: 3,
          }}
        >
          Please define search criteria.
        </Typography>
      );
    }
  };

  return (
    <>
      <div className="find-employee-container">
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{
            position: 'relative',
            my: 0.25,
            width: '70vw',
            left: 0,
          }}
        >
          <SearchInput
            placeholder="Search employees by name, middle name or surname"
            onChange={(value) => setInputValue(value)}
            onKeyDown={keyDownHandler}
          />
          <SearchDropdown
            id="skill-search-box"
            placeholder="Select skills"
            options={dropdownSkills.map((skill) => {
              return {
                category: skill.category,
                id: skill.skillId,
                name: skill.skillName,
              };
            })}
            noOptionsText="No such skill."
            onChange={(values) => handleSearchSkillChange(values)}
          />
          <SearchDropdown
            id="achievement-search-box"
            placeholder="Select achievements"
            options={dropdownAchievements.map((achievement) => {
              return {
                category: achievement.category,
                id: achievement.achievementId,
                name: achievement.achievementName,
              };
            })}
            noOptionsText="No such achievement."
            onChange={(values) => handleSearchAchievementChange(values)}
          />
        </Box>
      </div>
      {handleFindEmployeeResults(employees)}
    </>
  );
};

export default FindEmployee;

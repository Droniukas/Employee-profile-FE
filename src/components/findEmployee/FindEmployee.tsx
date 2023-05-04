import './FindEmployee.scss';

import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useRef, useState } from 'react';

import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchAchievementDropdown from '../inputs/SearchAchievementDropdown';
import SearchInput from '../inputs/SearchInput';
import SearchSkillDropdown from '../inputs/SearchSkillDropdown';
import FindEmployeeResults from './FindEmployeeResults';

const FindEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalEmployeesCount, setEmployeesCount] = useState<number>(0);
  const rowSizeOptions = [10, 20, 30, { label: 'all', value: -1 }];

  const employeeService = new EmployeeService();

  const [inputValue, _setInputValue] = useState('');
  const inputValueRef = useRef(inputValue);

  const setInputValue = (val: string) => {
    inputValueRef.current = val;
    _setInputValue(val);
  };

  const [rowsPerPage, _setRowsPerPage] = useState<number>(10);
  const rowsPerPageRef = useRef(rowsPerPage);

  const setRowsPerPage = (val: number) => {
    rowsPerPageRef.current = val;
    _setRowsPerPage(val);
  };

  const [page, _setPage] = useState<number>(0);
  const pageRef = useRef(page);

  const setPage = (val: number) => {
    pageRef.current = val;
    _setPage(val);
  };

  const getEmployees = async () => {
    const results = await employeeService.searchByNameSkillsAchievements(
      inputValueRef.current,
      [],
      [],
      pageRef.current,
      rowsPerPageRef.current,
    );
    setEmployees(results.employees);
    setEmployeesCount(results.count);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setPage(0);
        getEmployees();
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
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

  return (
    <>
      <div className="find-employee-container">
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{
            position: 'relative',
            my: 0.25,
            width: 1344,
            left: 0,
          }}
        >
          <SearchInput placeholder="Search employees by name..." onChange={(value) => setInputValue(value)} />
          <SearchSkillDropdown />
          <SearchAchievementDropdown />
        </Box>
      </div>
      {employees.length > 0 && (
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
      )}
    </>
  );
};

export default FindEmployee;

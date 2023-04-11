import './FindEmployee.scss';

import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useRef, useState } from 'react';

import Employee from '../../models/Employee.interface';
import { EmployeeService } from '../../services/employee.service';
import SearchInput from '../inputs/SearchInput';
import FindEmployeeResults from './FindEmployeeResults';

const FindEmployee = () => {
  const [results, setResults] = useState<Employee[]>([]);
  const [totalResultCount, setResultCount] = useState<number>(0);
  const rowSizeOptions = [10, 20, 30, { label: 'all', value: -1 }];

  const employeeService = new EmployeeService();

  const [inputValue, _setInputValue] = useState('');
  const inputValueRef = useRef(inputValue);

  function setInputValue(val: string) {
    inputValueRef.current = val;
    _setInputValue(val);
  }

  const [rowsPerPage, _setRowsPerPage] = useState<number>(10);
  const rowsPerPageRef = useRef(rowsPerPage);

  function setRowsPerPage(val: number) {
    rowsPerPageRef.current = val;
    _setRowsPerPage(val);
  }

  const [page, _setPage] = useState<number>(0);
  const pageRef = useRef(page);

  function setPage(val: number) {
    pageRef.current = val;
    _setPage(val);
  }

  const getResults = async () => {
    const result = await employeeService.searchByName(inputValueRef.current, pageRef.current, rowsPerPageRef.current);
    setResults(result.employees);
    setResultCount(result.count);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setPage(0);
        getResults();
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
    getResults();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getResults();
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
        </Box>
      </div>
      {results.length > 0 && (
        <>
          <FindEmployeeResults results={results} />
          <TablePagination
            component="div"
            count={totalResultCount}
            page={!totalResultCount || totalResultCount <= 0 ? 0 : pageRef.current}
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

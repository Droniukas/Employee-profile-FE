import React, { useCallback, useEffect, useState } from 'react';
import './FindEmployee.scss';
import SearchInput from '../inputs/SearchInput';
import EmployeeResult from '../../models/EmployeeResult.interface';
import FindEmployeeResults from './FindEmployeeResults';
import useDebouncedState from '../../hooks/useDebouncedState';
import { EmployeeService } from '../../services/employee.service';
import { TablePagination } from '@mui/material';

const FindEmployee = () => {
  // const [inputValue, setInputValue] = useDebouncedState('', 500);
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<EmployeeResult[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const rowSizeOptions = [10, 20, 30, { label: 'all', value: -1 }];

  const employeeService = new EmployeeService();

  const getResults = async () => {
    const result = await employeeService.searchByName(inputValue, page, rowsPerPage);
    setResults(result);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        getResults();
      }
    };
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const renderResults = useCallback(() => <FindEmployeeResults results={results} />, [results]);

  const handleChangePage = ( event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    getResults();
    
  };

  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getResults();
  };

  return (
    <>
      <div className='find-employee-container'>
        <SearchInput
          placeholder='Search employees by name...'
          onChange={(value) => setInputValue(value)}
        />
      </div>
      {renderResults()}

      <TablePagination
        component='div'
        count={results.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions = {rowSizeOptions}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default FindEmployee;

import React, {useEffect, useState} from 'react';
import './FindEmployee.scss';
import SearchInput from '../../inputs/SearchInput';
import EmployeeResult from '../../../models/EmployeeResult.interface';
import FindEmployeeResults from './FindEmployeeResults';
import useDebouncedState from '../../../hooks/useDebouncedState';
import {EmployeeService} from '../../../services/employee.service';

const FindEmployee = () => {
    const [inputValue, setInputValue] = useDebouncedState('', 500);
    const [results, setResults] = useState<EmployeeResult[]>([]);
    
    const employeeService = new EmployeeService();

    useEffect(() => {
        if (inputValue) {
            getResults(inputValue);
        }

        if (!inputValue) {
            setResults([]);
        }
    }, [inputValue]);

    const getResults = async (searchValue: string) => {
        const result = await employeeService.searchByName(searchValue);
        setResults(result);
    };

    return (
        <div className='find-employee-container'>
            <SearchInput placeholder='Search employees by name...'
                         onChange={(value) => setInputValue(value)}/>
            <FindEmployeeResults results={results}/>
        </div>
    );
};

export default FindEmployee;
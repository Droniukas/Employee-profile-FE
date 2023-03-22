import React, {useEffect, useState} from 'react';
import './FindEmployee.scss';
import SearchInput from '../../inputs/SearchInput';
import EmployeeResult from '../../../models/EmployeeResult.interface';
import FindEmployeeResults from './FindEmployeeResults';
import useDebouncedState from '../../../hooks/useDebouncedState';
import { WidthFull } from '@mui/icons-material';

const FindEmployee = () => {
    const [inputValue, setInputValue] = useDebouncedState('', 500);
    const [results, setResults] = useState<EmployeeResult[]>([]);

    useEffect(() => {
        if (inputValue) {
            getResults(inputValue);
        }

        if (!inputValue) {
            setResults([]);
        }
    }, [inputValue]);

    const getResults = async (searchValue: string) => {
        const result = await (await fetch(`http://localhost:3005/employees/search?name=${searchValue}`)).json();

        setResults(result);
    };

    return <div className='find-employee__container'>
        <SearchInput
            placeholder='Search employees by name...'
            onChange={(value) => setInputValue(value)}
            
        />
        <FindEmployeeResults
            results={results}
        />
    </div>;
};

export default FindEmployee;
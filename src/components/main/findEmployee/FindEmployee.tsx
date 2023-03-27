import React, {useEffect, useState} from 'react';
import './FindEmployee.scss';
import SearchInput from '../../inputs/SearchInput';
import EmployeeResult from '../../../models/EmployeeResult.interface';
import FindEmployeeResults from './FindEmployeeResults';
import useDebouncedState from '../../../hooks/useDebouncedState';

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
        const result = await (await fetch(`${process.env.REACT_APP_API_URL}/employee/search?name=${searchValue}`)).json();
        // const data = loadJSON('test.json');

        setResults(result);
    };
    console.log(results)
    return (
        <div className='find-employee__container'>
            <SearchInput
                placeholder='Search employees by name...'
                onChange={(value) => setInputValue(value)}
            />
             
            <FindEmployeeResults
                results={results}
            />
        </div>
    );
};

export default FindEmployee;
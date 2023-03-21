import React from 'react';
import EmployeeResult from '../../../models/EmployeeResult.interface';

type Props = {
    results: EmployeeResult[];
};

const FindEmployeeResults: React.FC<Props> = ({results}) => {
    if (!results.length) return null;

    return (
        <table className="ui celled table">
            <thead>
            <tr>
                <th>photo</th>
                <th>name</th>
                <th>middle name</th>
                <th>surname</th>
                <th>title</th>
            </tr>
            </thead>
            <tbody>
            {results.map((result) => (
                <tr key={result.id}>
                    <td data-label='photo'>{result.image}</td>
                    <td data-label='name'>{result.name}</td>
                    <td data-label='middle_name'>{result.middle_name}</td>
                    <td data-label='surname'>{result.surname}</td>
                    <td data-label='title'>{result.title_id}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default FindEmployeeResults;
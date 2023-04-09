import React from 'react';
import './ProjectFilter.scss';
import {ProjectStatus} from '../enums/ProjectStatus';

const ProjectFilter = (props: any) => {
    function onFilterValueChange(event: any) {
        props.filterValueSelected(event.target.value);
    }

    return (
        <div className='filter-area'>
            Show:
            <select name='status'
                    onChange={onFilterValueChange}>
                <option value='All'>All projects</option>
                <option value={ProjectStatus.ONGOING}>{ProjectStatus.ONGOING}</option>
                <option value={ProjectStatus.FINISHED}>{ProjectStatus.FINISHED}</option>
                <option value={ProjectStatus.FUTURE}>{ProjectStatus.FUTURE}</option>
            </select>
        </div>
    );
};

export default ProjectFilter;
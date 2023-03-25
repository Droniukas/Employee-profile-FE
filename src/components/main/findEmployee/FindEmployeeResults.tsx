import React from 'react';
import EmployeeResult from '../../../models/EmployeeResult.interface';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

type Props = {
    results: EmployeeResult[];
};

const FindEmployeeResults: React.FC<Props> = ({results}) => {
    if (!results.length) return null;

    function renderResultItem(result: EmployeeResult) {
        return (
            <>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <Avatar
                            src='/static/images/avatar/1.jpg'
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={result.middleName
                            ? `${result.name} ${result.middleName} ${result.surname}`
                            : `${result.name} ${result.surname}`
                        }
                        secondary={
                            <React.Fragment>
                                {result.title}
                            </React.Fragment>
                        }
                        sx={{
                            color: '#000048'
                        }}
                    />
                </ListItem>
                <Divider
                    variant='fullWidth'
                    component='li'
                />
            </>
        );
    }

    return (
        <List
            sx={{
                width: '100%'
            }}>
            {results
                .sort((a, b) => a.name > b.name ? 1 : -1)
                .map((result) => (renderResultItem(result)))}
        </List>
    );
};

export default FindEmployeeResults;
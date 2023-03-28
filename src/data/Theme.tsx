import {createMuiTheme} from '@mui/material/styles';

const Theme = createMuiTheme({
    typography: {
        fontFamily: ['Inter', 'sans-serif'
        ].join(','),
        fontSize: 14,
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },

    },
    palette: {
        primary: {
            main: '#000048'
        },
        secondary: {
            main: '#78ECE8'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '100px',
                },
            },
        },
    },
});

export default Theme;

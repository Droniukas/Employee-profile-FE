const express = require('express');
const employeesJson = require('./employees.json');
const cors = require('cors');
const surnames = employeesJson.map(employee => employee.surname);
const app = express();
app.use(cors());
const port = 3005;
const wait = ms => {
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, ms);
    });
};
app.get('/employees', (req, res) => {
    res.json(employeesJson);
});
app.get('/employees/search', async (req, res) => {
    const searchParam = req.query.name;
    const filteredSurnames = employeesJson.filter(employee =>
        employee.name.toLowerCase().startsWith(searchParam),
    );
    await wait(1000);
    res.json(filteredSurnames);
});
app.listen(port, () => {
    console.log(`Employees server listening on port ${port}`);
});
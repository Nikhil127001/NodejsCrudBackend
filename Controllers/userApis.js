const express = require('express');

const routes = express.Router();

const fs = require('fs');
const path = require('path');

const dataFilepath = path.join(__dirname, '../userdatafile.json')

const getdata = () => {
    const data = fs.readFileSync(dataFilepath);
    return JSON.parse(data);
}

// to get details of a perticular user with id
routes.get('/userIndex/:id', (req, res) => {
    const user = getdata();
    const dynamicid = req.params.id
    const userDetails = user.find(userx => userx.id == dynamicid);
    if (userDetails) {
        res.status(200).send(userDetails);
    } else {
        res.status(400).send('user not exists');
    }
})

// to get all users details
routes.get('/details', (req, res) => {
    const users = getdata();
    res.status(200).send(users);
})

// to insert a user in the db userIndexfile.json
routes.post('/insertUser', (req, res) => {
    const data = req.body;
    const usersdata = getdata();

    if (usersdata.find(item => item.id != data.id)) {
        //insert
        data.id = new Date().getTime();
        usersdata.push(data)
        fs.writeFileSync(dataFilepath, JSON.stringify(usersdata, null, 2));
        res.status(200).send("user created successfully")
    }
    else {
        res.status(400).send("user already exists")
    }
})

// put request to update properties of users

routes.put('/updateUser/:id', (req, res) => {
    const userid = req.params.id;
    const dataToBeUpdated = req.body;
    const AllUsersData = getdata();

    const userIndex = AllUsersData.findIndex(item => item.id == userid);
    console.log(userIndex);
    if (AllUsersData[userIndex]) {
        AllUsersData[userIndex].name = dataToBeUpdated.name || AllUsersData[userIndex].name;
        AllUsersData[userIndex].class = dataToBeUpdated.class || AllUsersData[userIndex].class;
        AllUsersData[userIndex].age = dataToBeUpdated.age || AllUsersData[userIndex].age;
        AllUsersData[userIndex].address = dataToBeUpdated.address || AllUsersData[userIndex].address;

        console.log(AllUsersData);
        const updatedData = fs.writeFileSync(dataFilepath,JSON.stringify(AllUsersData,null,2));
        res.status(200).send({
            message: 'user updated successfully',
        })
    } else {
        res.status(400).send('invalid id');
    }
})


module.exports = routes;


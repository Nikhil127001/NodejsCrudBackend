const express = require('express');
const routes = express.Router();
// const fs = require('fs');
// const path = require('path');

// const dataFilepath = path.join(__dirname, '../userdatafile.json')
const users = require('../Models/userModel')

// const getdata = () => {
//     // const data = fs.readFileSync(dataFilepath);
//     return JSON.parse(users);
// }

// to get details of a perticular user with id
// routes.get('/userIndex/:id', (req, res) => {
//     const user = getdata();
//     const dynamicid = req.params.id
//     const userDetails = user.find(userx => userx.id == dynamicid);
//     if (userDetails) {
//         res.status(200).send(userDetails);
//     } else {
//         res.status(400).send('user not exists');
//     }
// })

// to get all users details
routes.get('/details',async(req, res) => {
   
    res.json(await users.find());
})

// to insert a user in the db userIndexfile.json
routes.post('/insertUser', async(req, res) => {
    const { name, age, grade, address } = req.body;
    const user = new users({
        name,
        age,
        grade,
        address
    })

    const newUser = await user.save();
    res.json({
        message: 'Todo saved successfully',
        savedTodo : newUser
    });
})

// // put request to update properties of users

// routes.put('/updateUser/:id', (req, res) => {
//     const userid = req.params.id;
//     const dataToBeUpdated = req.body;
//     const AllUsersData = getdata();

//     const userIndex = AllUsersData.findIndex(item => item.id == userid);
//     console.log(userIndex);
//     if (AllUsersData[userIndex]) {
//         AllUsersData[userIndex].name = dataToBeUpdated.name || AllUsersData[userIndex].name;
//         AllUsersData[userIndex].class = dataToBeUpdated.class || AllUsersData[userIndex].class;
//         AllUsersData[userIndex].age = dataToBeUpdated.age || AllUsersData[userIndex].age;
//         AllUsersData[userIndex].address = dataToBeUpdated.address || AllUsersData[userIndex].address;

//         console.log(AllUsersData);
//         fs.writeFileSync(dataFilepath, JSON.stringify(AllUsersData, null, 2));
//         res.status(200).send({
//             message: 'user updated successfully',
//         })
//     } else {
//         res.status(400).send('invalid id');
//     }
// })

// routes.delete('/user/:id', (req, res) => {
//     const userid = req.params.id;
//     const users = getdata();

//     const index = users.findIndex(user => user.id == userid);

//     if (index !== -1) {
//         users.splice(index, 1);
//         fs.writeFileSync(dataFilepath, JSON.stringify(users, null, 2));

//         res.status(200).send('user deleted successfully')
//     }
//     res.status(400).send('user does not exists')
// })


module.exports = routes;


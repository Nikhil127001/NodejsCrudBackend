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
routes.get('/userdata/:id', (req, res) => {
    const user = getdata();
    const dynamicid = req.params.id
    const userDetails = user.find(userx => userx.id == dynamicid);
    if(userDetails){
        res.status(200).send(userDetails);
    }else{
        res.status(400).send('user not exists');
    }
})

// to get all users details
routes.get('/details', (req, res) => {
    const users = getdata();
    res.status(200).send(users);
})

// to insert a user in the db userdatafile.json
routes.post('/insertUser', (req, res) => {
    const data = req.body;
    const usersdata = getdata();

    if(usersdata.find(item => item.id != data.id)){
        //insert
        data.id = new Date().getTime();
        usersdata.push(data)
        fs.writeFileSync(dataFilepath,JSON.stringify(usersdata,null,2));
        res.status(200).send("user created successfully")
    }
    else{
        res.status(400).send("user already exists")
    }
})


module.exports = routes;


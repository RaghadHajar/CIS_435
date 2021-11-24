//this is where I would put code... IF I HAD ANY!!

//lecture 8 1:36:00 goes over how to use fs 
//which is a node module that allows for reading/writing to files
//Hopefully will be able to use this to read the users.JSON file
//also pour one out for Fudgeloptopus :'(

//return ture if user exists
//help from lec 8 57:00, he is doing it with AJAX tho

//lets try implementing what he did



const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

const portNum = 3500;

app.use(cors({origin: '*'}));

app.use(express.json());

const users = [
    {
        "id": 0,
        "username": 'N/A',
        "note": "User does not exist"
    },
    {
        "id": 1,
        "username": 'Bob',
        "note": "I'm Bob and I like cereal"
    },
    {
        "id": 2,
        "username": "Evilbob",
        "note": "I'm Evilbob and I hate cereal"
    }
];

// const users = '{ "user" : [' +
// '{ "id":1 , "username":"Bob", "note": "I am Bob and I like cereal" },' +
// '{ "id":2 , "username":"Evilbob", "note": "I am Evilbob and I hate cereal"  },' +
// ' ]}';

console.log("lets try reading a file\n");
fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
console.log(fileUsers);
// console.log('\n JSON at 0 \n');
// console.log(fileUsers.users[0].note);
// console.log('\n JSON at 1 \n');
// console.log(fileUsers.users[1].note);

app.get('/', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.first_name + ' ' + req.query.last_name);

    console.log('sending response to the client from / ...');
    res.send('hello');
});

//return all users
app.get('/users', (req, res) => {
    res.send(fileUsers);
});

//return given user

app.get('/users/:username', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.first_name);

    console.log('sending response to the client from / ...');
    //have to figure out this part
    // const user_name = users.find(c => c.username === req.params.username);
    // if(!user_name) res.status(404).send(users[0]);
    // res.send(user_name);

    for(let i = 0; i < fileUsers.users.length; i++)
    {
            if(fileUsers.users[i].username === req.params.username){
                res.send(JSON.stringify(fileUsers.users[i]));
            }
            else {
                res.send("User does not exist");
            }
    }
    });

app.post('/users', (req, res) => {
    console.log('received from client: ' + req.query.username + ' ' + req.body.note);
    
        const user = {
            id: users.length + 1,
            username: req.body.username,
            note: req.body.note
        };

        users.push(user);
        res.send(user);
    });

app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
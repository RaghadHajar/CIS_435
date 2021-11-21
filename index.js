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

const portNum = 3500;

app.use(cors({origin: '*'}));

app.use(express.json());

const users = [
    {
        id: 1,
        username: 'Bob',
        note: "I'm Bob and I like cereal"
    },
    {
        id: 2,
        username: "Evilbob",
        note: "I'm Evilbob and I hate cereal"
    }
];

app.get('/', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.first_name + ' ' + req.query.last_name);

    console.log('sending response to the client from / ...');
    res.send('hello');
});

//return all users
app.get('/users', (req, res) => {
    res.send(users);
});

//return given user
app.get('/users/:username', (req, res) => {
    console.log('\n\nON THE SERVER');
    //console.log('received from client: ' + req.query.first_name + ' ' + req.query.last_name);

    console.log('sending response to the client from / ...');
    //have to figure out this part
    const user_name = users.find(c => c.username === req.params.username);
    if(!user_name) res.status(404).send("user does not exist");
    res.send(JSON.stringify(user_name));
    });

app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
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

const portNum = 3000;

app.use(cors({origin: '*'}));

app.use(express.json());

app.get('/', (req, res) => {
    let data = "users.json"
    let users = data[0];
    console.log('\n\nON THE SERVER');
    //console.log('received from client: ' + req.query.first_name + ' ' + req.query.last_name);

    console.log('sending response to the client from / ...');
    //have to figure out this part
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username == req.query.username)
        {
            //res.send(JSON.stringify({users[i].note}));
        }
        
    }
    
});

app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
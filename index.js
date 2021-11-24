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

// const users = [
//     {
//         "id": 0,
//         "username": 'N/A',
//         "note": "User does not exist"
//     },
//     {
//         "id": 1,
//         "username": 'Bob',
//         "note": "I'm Bob and I like cereal"
//     },
//     {
//         "id": 2,
//         "username": "Evilbob",
//         "note": "I'm Evilbob and I hate cereal"
//     }
// ];

// const users = '{ "user" : [' +
// '{ "id":1 , "username":"Bob", "note": "I am Bob and I like cereal" },' +
// '{ "id":2 , "username":"Evilbob", "note": "I am Evilbob and I hate cereal"  },' +
// ' ]}';

console.log("lets try reading a file\n");
let fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
console.log(fileUsers);
console.log("length of fileUsers = " + fileUsers.users.length);
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
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
    res.send(fileUsers);
});

//return given user

app.get('/users/:username', (req, res) => {
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.first_name);

    console.log('sending response to the client from /');
    //have to figure out this part
    // const user_name = users.find(c => c.username === req.params.username);
    // if(!user_name) res.status(404).send(users[0]);
    // res.send(user_name);

    let userFound = false;
    for(let i = 0; i < fileUsers.users.length; i++)
    {
        console.log("user at " + i + " = " + fileUsers.users[i].username + "\n");
            if(fileUsers.users[i].username === req.params.username){
               userFound = true;
               res.send(JSON.stringify(fileUsers.users[i]));
                break;
            }
    }
    if(!userFound){
        res.send("User does not exist");
    }

    });

app.post('/users', (req, res) => {

    //Get the users that we know exist
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
    console.log('received from client: ' + req.query.username + ' ' + req.body.note);
    
    //everything that a user holds
        const user = {
            id: fileUsers.users.length + 1,
            username: req.body.username,
            note: req.body.note
        };

        //newNots and newNOtes.notes will be used to create our new JSON file
        //note contains all the data that a note will hold, an id and the content
        //don't forget to change id of note if it is being appended
        var newNotes = {};
        newNotes.notes = [];
        const note = {
            id: 0,
            note: req.body.note
        };

        // users.push(user);
        // res.send(user);        
        let userFound = false; 

        //loop through our list of users and if the user we are looking for exists 
        //set user found to true
        //store the data from that users file into fileNotes
        //set the note id to += 1 of the number of notes
        //push our new note onto fileNotes
        //finally write fileNotes to our users json file
        //break out of for loop so we don't check every user if we don't have to
        for(let i = 0; i < fileUsers.users.length; i++)
        {
            //if user is found append file
            if(fileUsers.users[i].username === req.body.username){
                console.log("user found append note");
                userFound = true;
                let fileNotes = JSON.parse(fs.readFileSync(user.username + ".json", 'utf8'));
                //fs.writeFileSync("users.json", JSON.stringify(fileUsers));
                note.id = fileNotes.notes.length + 1;
                fileNotes.notes.push(note);
                fs.writeFileSync(user.username + ".json", JSON.stringify(fileNotes));
                break;
            }
        }
        //if user not found create new file and add to users.json
        //push user onto fileUsers
        //write our new user to list of current users
        //create the array of notes and add our note
        //write that array of notes to our json file
        if(!userFound){
            console.log("User not found adding user");
            fileUsers.users.push(user);
            fs.writeFileSync("users.json", JSON.stringify(fileUsers));
            newNotes.notes.push(note);
            fs.writeFileSync(user.username + ".json", JSON.stringify(newNotes));
        }

        res.send(fileUsers);
    });

app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
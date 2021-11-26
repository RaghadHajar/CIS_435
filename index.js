
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

const portNum = 3500;

app.use(cors({origin: '*'}));

app.use(express.json());


console.log("lets try reading a file\n");
let fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
console.log(fileUsers);
console.log("length of fileUsers = " + fileUsers.users.length);

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

    let userFound = false;
    for(let i = 0; i < fileUsers.users.length; i++)
    {
            if(fileUsers.users[i].username === req.params.username){
               userFound = true;
               let text = fs.readFileSync(req.params.username + ".txt", "utf-8");
               res.send(JSON.stringify({note: text}));
                break;
            }
    }
    if(!userFound){
        res.send(JSON.stringify({note: "User does not exist"}));
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
        };

        let userFound = false; 
        
        
        for(let i = 0; i < fileUsers.users.length; i++)
        {
            //if user is found append file
            if(fileUsers.users[i].username === req.body.username){
                console.log("user found append note");
                userFound = true;
                let text = fs.readFileSync(user.username + ".txt", "utf-8");
                text = text + " " + req.body.note;
                fs.writeFileSync(user.username + ".txt", text);
                break;
            }
        }
        if(!userFound){
            console.log("User not found adding user");
            fileUsers.users.push(user);
            fs.writeFileSync("users.json", JSON.stringify(fileUsers));
            fs.writeFileSync(user.username + ".txt", req.body.note);
        }
        res.send(fileUsers);
    });

app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
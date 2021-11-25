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

//this is where we read in our users.json file so we can check if users exist
//note: idk if it's necessary but I parse the file in every method again just in case theres an update
//maybe not the best practice but this is such a small app it doesn't matter
let fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
//I send it to the console so I can verify what I get
console.log(fileUsers);

//console.log("length of fileUsers = " + fileUsers.users.length);
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
    //parse the our users.json again in case of changes and store it back to fileUsers
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
    //lets us know what we're getting
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.first_name);
    console.log('sending response to the client from /');

    //userFound bool so we know if we found a matching user
    let userFound = false;
    //go through the entire users array from our file users and check if we find a match
    //if we do find a match:
    //set userFond to true, create a text variable to read the contents of the txt file associated with the user
    //this will be the username we're given + ".txt" "jason.txt" for example
    //then simply convert the text to a JSON string as a note object
    //break out of the loop so we don't check everything if we found what we're looking for
    for(let i = 0; i < fileUsers.users.length; i++)
    {
        //console.log("user at " + i + " = " + fileUsers.users[i].username + "\n");
            if(fileUsers.users[i].username === req.params.username){
               userFound = true;
               let text = fs.readFileSync(req.params.username + ".txt", "utf-8");
               res.send(JSON.stringify({note: text}));
               //res.send(JSON.stringify(fileUsers.users[i]));
                break;
            }
    }
    //if after loop we don't find a match send a note object saying the user doesn't exist
    if(!userFound){
        res.send(JSON.stringify({note: "User does not exist"}));
    }

    });

app.post('/users', (req, res) => {

    //Get the users that we know exist
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));
    console.log('received from client: ' + req.query.username + ' ' + req.body.note);
    
    //everything that a user holds
    //used to create a new user in fileUsers
        const user = {
            id: fileUsers.users.length + 1,
            username: req.body.username,
            note: req.body.note
        };

        //this was used for multiple notes solution
        //newNots and newNOtes.notes will be used to create our new JSON file
        //note contains all the data that a note will hold, an id and the content
        //don't forget to change id of note if it is being appended
        // var newNotes = {};
        // newNotes.notes = [];
        // const note = {
        //     id: 0,
        //     note: req.body.note
        // };
        
        //bool to tell if a user is found
        let userFound = false; 

        //My cool solution, If we wanted to have multiple notes per user
        //loop through our list of users and if the user we are looking for exists 
        //set user found to true
        //store the data from that users file into fileNotes
        //set the note id to += 1 of the number of notes
        //push our new note onto fileNotes
        //finally write fileNotes to our users json file
        //break out of for loop so we don't check every user if we don't have to
        // for(let i = 0; i < fileUsers.users.length; i++)
        // {
        //     //if user is found append file
        //     if(fileUsers.users[i].username === req.body.username){
        //         console.log("user found append note");
        //         userFound = true;
        //         let fileNotes = JSON.parse(fs.readFileSync(user.username + ".json", 'utf8'));
        //         //fs.writeFileSync("users.json", JSON.stringify(fileUsers));
        //         note.id = fileNotes.notes.length + 1;
        //         fileNotes.notes.push(note);
        //         fs.writeFileSync(user.username + ".json", JSON.stringify(fileNotes));
        //         break;
        //     }
        // }
        // //if user not found create new file and add to users.json
        // //push user onto fileUsers
        // //write our new user to list of current users
        // //create the array of notes and add our note
        // //write that array of notes to our json file
        // if(!userFound){
        //     console.log("User not found adding user");
        //     fileUsers.users.push(user);
        //     fs.writeFileSync("users.json", JSON.stringify(fileUsers));
        //     newNotes.notes.push(note);
        //     fs.writeFileSync(user.username + ".json", JSON.stringify(newNotes));
        // }

        //Our easier solution, one note per user

        //loop through the entire users file 
        //if we find the user we're looking for:
        //set userFound to true
        //set a variable text = to the contents of the txt file associated with the user we're looking for
        //append the new note to text
        //write our text variable to the associated txt file
        //hint: in order to get the txt file we want it will be titled (username.txt), so we just use the username we're given and add .txt to the end when telling it what to look for
        //Next we also want to keep track of what the users note is in our users.json file 
        //(just in case that is useful later)
        //so we set the current fileUsers.users objects note to our text variable and write fileUsers to users.JSON
        for(let i = 0; i < fileUsers.users.length; i++)
        {
            //if user is found append file
            if(fileUsers.users[i].username === req.body.username){
                console.log("user found append note");
                userFound = true;
                let text = fs.readFileSync(user.username + ".txt", "utf-8");
                text = text + " " + req.body.note;
                fs.writeFileSync(user.username + ".txt", text);

                fileUsers.users[i].note = text;
                fs.writeFileSync("users.json", JSON.stringify(fileUsers));
                break;
            }
        }
        //if the user is not found
        //push our new user object to our fileUsers
        //write our fileUsers to the users.JSON file
        //hint: everytime you call write it overrides what was there before this is why we have to add things
        //to a variable holding the current contents and send that variable 
        //next we write to a file called the username we recieve.txt 
        //hint: if that file doesn't exist it will automatically be created
        if(!userFound){
            console.log("User not found adding user");
            fileUsers.users.push(user);
            fs.writeFileSync("users.json", JSON.stringify(fileUsers));
            fs.writeFileSync(user.username + ".txt", req.body.note);
        }
        //now we send fileUsers
        //idk I think we just have to send something this might be wrong 
        res.send(fileUsers);
    });


app.delete('/users', (req, res) => {
    fileUsers= JSON.parse(fs.readFileSync('users.json', 'utf8'));

    const user = {
        username: req.body.username
    }
    console.log(user.username);
    let userFound = false;
    //search trough all file users 
    //if found set a text variable to "" write "" to the associated .txt file
    //set the users note in the users.json file to ""
    for(let i = 0; i < fileUsers.users.length; i++)
        {
            //if user is found append file
            if(fileUsers.users[i].username === req.body.username){
                console.log("user found delete note");
                userFound = true;
                let text = " ";
                fs.writeFileSync(user.username + ".txt", text);
                fileUsers.users[i].note = text;
                fs.writeFileSync("users.json", JSON.stringify(fileUsers));
                res.send(JSON.stringify({note: text}));
                break;
            }
        }
        //if not found return not found
        if(!userFound){
            res.send(JSON.stringify({note: "User does not exist"}));
        }
        
});    
//this just tells the backend to listen for the front end to speak up
app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
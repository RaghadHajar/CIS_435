let outputSpan; 

function handleViewButton(){
    //get the value thats passed into the username box
    const userName = document.querySelector('#name').value;
    console.log(userName);
    //const note = document.querySelector('#note').value;

    //where our server resides 
    const url = "http://localhost:3500/users/";
    //const params = `?first_name=${userName}`;
    const params = userName;
    
    //console.log("reaching for " + url + params);
    //10:00 he talks about this

    //calls a get method in our backend
    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    
    //tells it to go to "http://localhost:3500/users/" + what ever user name was entered and use a get method
    //pretty much tells it to go the the section of code in the backend that has app.get('/users/:username'
    //it returns a jsonObject and we extract the note from it and update our output span so it displays on the screen
    fetch(url + params, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
            outputSpan.innerHTML = jsonObject.note;
        });
    
}

function handleAddButton(){
    //This gets the values from what the user entered in the user field and the note field
    const newUsername = document.querySelector('#name').value;
    const newNote = document.querySelector('#note').value;
    //console.log(userName);

    //create an object for what we will pass to the backend
    const dataObject = {
        username: newUsername,
        note: newNote
    };

    //where our server resides 
    const url = "http://localhost:3500/users";
    //const params = `?first_name=${userName}`;
    //const params = userName;
    
    //console.log("reaching for " + url + params);
    //10:00 he talks about this

    //calls a get method in our backend sending it a JSON string of our dataObject as body
    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };
    
    //tells it to go to "http://localhost:3500/users/" and use the post method from above
    //pretty much tells it to go the the section of code in the backend that has app.post('/users',
    //it returns a jsonObject and we extract the note from it and update our output span so it displays on the screen
    //Idk if we really need it to display that but it does for now
    fetch(url, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
            outputSpan.innerHTML = jsonObject.note;
        });
}

function start() {
    const addButton = document.querySelector('#add_note');
    const viewButton = document.querySelector('#View_note');

    //when add button clicked call addbutton function
    addButton.onclick = handleAddButton;
    //when view button clicked call view button function
    viewButton.onclick = handleViewButton;

    //set output span to span with id output
    outputSpan = document.querySelector('#output');
}

window.onload = start;
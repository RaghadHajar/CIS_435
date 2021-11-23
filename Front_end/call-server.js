let outputSpan; 

function handleViewButton(){
    const userName = document.querySelector('#name').value;
    console.log(userName);
    //const note = document.querySelector('#note').value;

    //where our server resides 
    const url = "http://localhost:3500/users/";
    //const params = `?first_name=${userName}`;
    const params = userName;
    
    //console.log("reaching for " + url + params);
    //10:00 he talks about this
    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };
    
    fetch(url + params, fetchObject)
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
            outputSpan.innerHTML = jsonObject.note;
        });
    
}

function handleAddButton(){
    const newUsername = document.querySelector('#name').value;
    const newNote = document.querySelector('#note').value;
    //console.log(userName);
    //const note = document.querySelector('#note').value;

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
    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };
    
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

    addButton.onclick = handleAddButton;
    viewButton.onclick = handleViewButton;

    outputSpan = document.querySelector('#output');
}

window.onload = start;
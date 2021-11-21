let outputSpan; 

function handleViewButton(){
    const userName = document.querySelector('#name').value;
    //const note = document.querySelector('#note').value;

    //where our server resides 
    const url = "http://localhost:3500/users";
    const params = `?username=${userName}`;
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
            outputSpan.innerHTML = jsonObject.note;
        });
}

// function handleAddButton(){
//     //add stuff to add notes n ish
// }

function start() {
    //const addButton = document.querySelector('#add_note');
    const viewButton = document.querySelector('#View_note');

    //addButton.onclick = handleAddButton;
    viewButton.onclick = handleViewButton;

    outputSpan = document.querySelector('#output');
}

window.onload = start;
//this is where I would put code... IF I HAD ANY!!

//lecture 8 1:36:00 goes over how to use fs 
//which is a node module that allows for reading/writing to files
//Hopefully will be able to use this to read the users.JSON file
//also pour one out for Fudgeloptopus :'(

//load node.js fs module
'use strict';
const fs = require("fs");

//read json file and parse it to convert it to readable txt
//kept for example, returns all JSON
let data = fs.readFileSync('users.json');
let user = JSON.parse(data);
console.log(user);

//return ture if user exists
//help from lec 8 57:00, he is doing it with AJAX tho

//did not work
// console.log("start \n")
// let data = fs.readFileSync('users.json');
// let userArr = JSON.stringify(data);
// for(let i = 0; i < data.length; i++)
// {
//     if(data[0].username == "Bob")
//     {
//         console.log("ladies and gentlemen we gotem")
//     }
// }

//this is what he uses with AJAX in order to print out the data that has certain values 
//fetch only works with http, maybe we have to host the users.json file with node and then fetch it
// fetch('users.json')
//     .then( response => response.json())
//     .then( json => {
//         dataArray = json;
//         for(let i = 0; i < dataArray.length; i++)
//         {
//             console.log(dataArray[i].username);
//         }
//     })
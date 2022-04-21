// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {customersPromise, bookingsPromise, roomsPromise} from "./apiCalls";

// console.log('This is the JavaScript entry file - your code begins here.');
let customersData = [];
let bookingsData = [];
let roomsData = [];


window.onload = (event) => loadWindow();


const loadWindow = () => {
  Promise.all(
    [
      customersPromise,
      bookingsPromise,
      roomsPromise
    ]
  ).then(jsonArray => {
    jsonArray[0].customers.forEach(customer => {
      customersData.push(customer);
    });
    jsonArray[1].bookings.forEach(booking => {
      bookingsData.push(booking);
    });
    jsonArray[2].rooms.forEach(room => {
      roomsData.push(room);
    });
    showData();
  });
};

const showData = () => {
  console.log("outside", customersData);
  console.log("outside", bookingsData);
  console.log("outside", roomsData);
};

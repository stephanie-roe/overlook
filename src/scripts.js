// Imports
import './css/styles.css';
import './images/turing-logo.png';
import {customersPromise, bookingsPromise, roomsPromise} from "./apiCalls";
import Customer from "./classes/Customer";


//Global Variables
let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;

//Query Selectors
const pastBookingsTile = document.querySelector(".past-bookings");
const totalSpendTile = document.querySelector(".total");

//Event Listeners
window.onload = (event) => loadWindow();

//Event Handlers
const loadWindow = () => {
//promise.all can be outside of the function, can be set to a variable.
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
    instantiateCustomer(50);
    showBookings();
    showTotal();
  })
  // showData();
  // setTimeout(() => instantiateCustomer(50), 2500)
};

const showData = () => {
  // console.log("outside", customersData);
  // console.log("outside", bookingsData);
  // console.log("outside", roomsData);
};

const instantiateCustomer = (id) => {
//match up id from login to the id in customersData and use that to set new customer obj, which will instantiate our current customer.
// parseInt to a number to cmopare the customers username and the id number
//eventually when api is incorporated, this will move into .then
  let customerArg;
  customersData.forEach((customer) => {
    if (customer.id === id) {
      customerArg = customer
    }
  })
  currentCustomer = new Customer(customerArg);
  return currentCustomer
};

const showBookings = () => {
  currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getAllRooms(roomsData);

  currentCustomer.allRooms.forEach((room) => {
    pastBookingsTile.innerHTML += `<section class="bookings-card">
                                  <p class="date">${room.dateBooked}</p>
                                  <p class="room-type">You booked the ${room.roomType}.</p>
                                  <p class="booking-details">Room Number: ${room.number}</p>
                                  <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
                                  <p class="booking-details">Has bidet? ${room.bidet}</p>
                                  <p class="total">Total: $${room.costPerNight}</p>
                                  </section>`
  // could be cool to reformat the date so it is more readable
  })
}

const showTotal = () => {
  currentCustomer.getTotalSpend(roomsData);
  totalSpendTile.innerHTML += `<h3 class="total-spent">Total: $${currentCustomer.amountSpent}</h3>`
}

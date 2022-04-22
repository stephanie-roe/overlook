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
const pastBookingsTile = document.querySelector(".past-booking-cards-container");
const currentBookingsTile = document.querySelector(".current-booking-cards-container");
const futureBookingsTile = document.querySelector(".future-booking-cards-container");
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
    currentCustomer.getCustomerBookings(bookingsData);
    showPastBookings();
    showCurrentBookings();
    showFutureBookings();
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

const showPastBookings = () => {

  // currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getPastRooms();
  currentCustomer.pastBookings.forEach((room) => {
    const total = currencyFormatter.format(room.costPerNight);
    pastBookingsTile.innerHTML += `<section class="bookings-card">
                                <div class="booking-card-header"
                                  <p class="date">${room.dateBooked}</p>
                                  <p class="booking-details">Room Number: ${room.number}</p>
                                </div>
                                  <p class="room-type">You booked the ${room.roomType}.</p>
                                  <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
                                  <p class="booking-details">Has bidet? ${room.bidet}</p>
                                  <p class="booking-total">Total: ${total}</p>
                                  </section>`
  // could be cool to reformat the date so it is more readable
  })
}

const showCurrentBookings = () => {
  // currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getCurrentRoom();

  if (!currentCustomer.currentBookings.length) {
    currentBookingsTile.innerHTML += `<section class="book-now-cta">
                                      <p class="book-now-message">No active bookings, we hope to see you soon!</p>
                                      </section>`
  } else if (currentCustomer.currentBookings.length > 0) {
    currentCustomer.currentBookings.forEach((room) => {
      const total = currencyFormatter.format(room.costPerNight);
      currentBookingsTile.innerHTML += `<section class="bookings-card">
                                  <div class="booking-card-header"
                                    <p class="date">${room.dateBooked}</p>
                                    <p class="booking-details">Room Number: ${room.number}</p>
                                  </div>
                                    <p class="room-type">You booked the ${room.roomType}.</p>
                                    <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
                                    <p class="booking-details">Has bidet? ${room.bidet}</p>
                                    <p class="booking-total">Total: ${total}</p>
                                    </section>`
    })
  }
}

const showFutureBookings = () => {
  // currentCustomer.getCustomerBookings(bookingsData);
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getFutureRooms();


  currentCustomer.futureBookings.forEach((room) => {
    const total = currencyFormatter.format(room.costPerNight);
    futureBookingsTile.innerHTML += `<section class="bookings-card">
                                <div class="booking-card-header"
                                  <p class="date">${room.dateBooked}</p>
                                  <p class="booking-details">Room Number: ${room.number}</p>
                                </div>
                                  <p class="room-type">You booked the ${room.roomType}.</p>
                                  <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
                                  <p class="booking-details">Has bidet? ${room.bidet}</p>
                                  <p class="booking-total">Total: ${total}</p>
                                  </section>`
  // could be cool to reformat the date so it is more readable
  })
}

const showTotal = () => {
  totalSpendTile.innerHTML = ""
  const total = currentCustomer.getTotalSpend(roomsData);
  const displayTotal = currencyFormatter.format(total)
  totalSpendTile.innerHTML += `<h3 class="total-spent">Total: ${displayTotal}</h3>`
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
const bookingForm = document.querySelector(".booking-form");
const bookNowButton = document.querySelector(".book-now-button");
const userDashboard = document.querySelector(".user-dashboard");
const bookingDashboard = document.querySelector(".booking-dashboard");
const submitDateButton = document.querySelector(".submit-date-button");
const roomOptionsContainer = document.querySelector(".room-options-container");
const dateInput = document.querySelector(".date-input");
const roomChoiceCTA = document.querySelector(".room-choice-cta");
//Event Listeners
window.onload = (event) => loadWindow();

bookNowButton.addEventListener("click", function() {
  loadBookingDashboard();
});

submitDateButton.addEventListener("click", function() {
//some function invoked in here to show avail rooms
  showAvailableRooms()
});

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
  currentCustomer.sortBookingDates("pastBookings")
  // currentCustomer.pastBookings = currentCustomer.sortBookingDates("pastBookings")

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
  currentCustomer.sortBookingDates("currentBookings")

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
  currentCustomer.sortBookingDates("futureBookings")

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

const show = elements => {
  elements.forEach(element => element.classList.remove("hidden"));
};

const hide = elements => {
  elements.forEach(element => element.classList.add("hidden"));
};

const loadBookingDashboard = () => {
  hide([userDashboard])
  show([bookingDashboard])
  injectBookingForm()
};

const injectBookingForm = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let date = `${yyyy}-${mm}-${dd}`;

  bookingForm.innerHTML +=  `<label for="check-in">When will you be arriving?</label>
                              <input type="date" id="start" name="check-in" min=2022-04-01 value=${date}>`

};



const getAvailableRooms = (bookingsData) => {
  const dateInput = document.querySelector("#start");
  const selectedDate = dateInput.value.replaceAll("-", "/");

  const unbooked = bookingsData.filter((booking) => {
    return booking.date !== selectedDate
  });

  const availableRooms = unbooked.reduce((arr, booking) => {
    roomsData.forEach((room) => {
      if (room.number === booking.roomNumber && !arr.includes(room)) {
        arr.push(room)
      }
    })
    return arr
  }, []);
  return availableRooms;
};

const showAvailableRooms = (roomsData) => {
  show([roomChoiceCTA])
  const availableRooms = getAvailableRooms(bookingsData);
  availableRooms.forEach((room) => {
    roomOptionsContainer.innerHTML += `<section class="available-room-card" id="${room.number}">
                                        <p>${room.roomType}</p>
                                        <p>${room.bedSize} x ${room.numBeds}</p>
                                        <p>ameneties: ${room.bidet}</p>
                                      </section>`
  });
}

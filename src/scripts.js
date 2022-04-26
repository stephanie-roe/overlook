// Imports ---------------------------------------------------------------------

import './css/styles.css';
import {customersPromise, bookingsPromise, roomsPromise, postBooking, getPromise} from "./apiCalls";
import Customer from "./classes/Customer";


// Global Variables  -----------------------------------------------------------

let currentCustomer;
let selectedDate = "";
let selectedRoom = null;
let roomsData = [];
let bookingsData = [];
let customersData = [];

// Query Selectors  ------------------------------------------------------------

// Containers
const loginContainer = document.querySelector(".customer-login-container");
const nav = document.querySelector(".nav-bar");
const userDashboard = document.querySelector(".user-dashboard");
const pastBookingsTile = document.querySelector(".past-booking-cards-container");
const currentBookingsTile = document.querySelector(".current-booking-cards-container");
const futureBookingsTile = document.querySelector(".future-booking-cards-container");
const totalSpendTile = document.querySelector(".total");
const bookingDashboard = document.querySelector(".booking-dashboard");
const roomOptionsContainer = document.querySelector(".room-options-container");
const roomFiltersDropdown = document.querySelector(".dropdown-content");
const filterContainer = document.querySelector(".dropdown-filter-rooms");

// Forms & Inputs
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const bookingForm = document.querySelector(".booking-form");
const dateInput = document.querySelector(".date-input");

// Buttons
const loginButton = document.querySelector(".submit-login-button");
const bookNowButton = document.querySelector(".book-now-button");
const homeButton = document.querySelector(".user-dashboard-button");
const submitDateButton = document.querySelector(".submit-date-button");
const roomFilterButton = document.querySelector(".filter-by-type");
const clearFilterButton = document.querySelector(".clear-filters");
const submitBookingButton = document.querySelector(".submit-booking-button");

// Text
const loginError = document.querySelector(".login-error");
const customerName = document.querySelector(".customer-welcome");
const roomChoiceCTA = document.querySelector(".room-choice-cta");
const roomConfirmation = document.querySelector(".room-confirmation");
const selectedBookingTotal = document.querySelector(".selected-booking-total");

//Event Listeners  -------------------------------------------------------------
window.onload = (event) => loadWindow();

loginButton.addEventListener("click", function() {
  event.preventDefault();
  verifyCredentials(customersData);
});

bookNowButton.addEventListener("click", function() {
  loadBookingDashboard();
});

homeButton.addEventListener("click", function() {
  redirectHome();
});

submitDateButton.addEventListener("click", function() {
  showAvailableRooms();
});

roomOptionsContainer.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains("available-room-card")) {
    showSelectedTotal(e.target.id);
  };
});

roomFilterButton.addEventListener("click", function() {
  injectFilters();
});

roomFiltersDropdown.addEventListener("click", function(e) {
  if(e.target.classList.contains("room-type")) {
    displayFilteredRooms(e);
    show([clearFilterButton]);
  };
});

roomFiltersDropdown.addEventListener("keypress", function(e) {
  if(e.target.classList.contains("room-type") && e.key === "Enter") {
    displayFilteredRooms(e);
    show([clearFilterButton]);
  };
});

clearFilterButton.addEventListener("click", function() {
  showAvailableRooms();
  hide([clearFilterButton]);
});

submitBookingButton.addEventListener("click", function() {
  submitBooking();
});


//Event Handlers ---------------------------------------------------------------

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
  });
};

const verifyUsername = () => {
  const usernameEntered = username.value;
  const letters = usernameEntered.slice(0, usernameEntered.search(/\d/));
  const userID = Number(usernameEntered.replace(letters, ""));

  return userID;
};

const verifyPassword = () => {
  const passwordEntered = password.value;
  if (passwordEntered === "overlook2021") {
    return true;
  } else {
    return false;
  };
};

const displayCustomerName = () => {
  const customerNames = currentCustomer.name.split(" ");
  const firstName = customerNames[0];
  customerName.innerHTML = "";
  customerName.innerHTML = `Welcome, ${firstName}`;
};

const instantiateCustomer = (id) => {
  let customerArg;
  customersData.forEach((customer) => {
    if (customer.id === id) {
      customerArg = customer;
    };
  });
  currentCustomer = new Customer(customerArg);
  return currentCustomer;
};

const commenceLogin = () => {
  hide([loginContainer]);
  show([userDashboard, nav]);
  currentCustomer.getCustomerBookings(bookingsData);
  showPastBookings();
  showCurrentBookings();
  showFutureBookings();
  showTotal();
  displayCustomerName();
};

const verifyCredentials = (customersData) => {
  const userID = verifyUsername();
  customersData.forEach((customer) => {
    if (customer.id === userID && verifyPassword()) {
      instantiateCustomer(userID);
      commenceLogin();
    } else {
      show([loginError]);
      setTimeout(() => hide([loginError]), "2000");
    };
  });
  if (userID && verifyPassword()) {
    instantiateCustomer(userID);
    commenceLogin();
  };
};

const showBidet = (room) => {
  if (room.bidet === false) {
    return "no bidet";
  } else {
    return "bidet";
  };
};

const showPastBookings = () => {
  pastBookingsTile.innerHTML = "";
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.pastBookings = [];
  currentCustomer.getPastRooms();
  currentCustomer.sortBookingDates("pastBookings");
  currentCustomer.pastBookings.forEach((room) => {
    const total = currencyFormatter.format(room.costPerNight);
    pastBookingsTile.innerHTML += `<section role="contentinfo" class="bookings-card">
    <div class="booking-card-header"
    <p class="date">${room.dateBooked}</p>
    <p class="booking-details">Room Number: ${room.number}</p>
    </div>
    <p class="room-type">You booked the ${room.roomType}.</p>
    <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
    <p class="booking-details">amenities: ${showBidet(room)}</p>
    <p class="booking-total">Total: ${total}</p>
    </section>`;
  });
};

const showCurrentBookings = () => {
  currentBookingsTile.innerHTML = "";
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.currentBookings = [];
  currentCustomer.getCurrentRoom();
  currentCustomer.sortBookingDates("currentBookings");

  if (!currentCustomer.currentBookings.length) {
    currentBookingsTile.innerHTML += `<section role="contentinfo" class="book-now-cta">
    <p class="book-now-message">No active bookings, we hope to see you soon!</p>
    </section>`;
  } else if (currentCustomer.currentBookings.length > 0) {
    currentCustomer.currentBookings.forEach((room) => {
      const total = currencyFormatter.format(room.costPerNight);
      currentBookingsTile.innerHTML += `<section role="contentinfo" class="bookings-card">
      <div class="booking-card-header"
      <p class="date">${room.dateBooked}</p>
      <p class="booking-details">Room Number: ${room.number}</p>
      </div>
      <p class="room-type">You booked the ${room.roomType}.</p>
      <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
      <p class="booking-details">amenities: ${showBidet(room)}</p>
      <p class="booking-total">Total: ${total}</p>
      </section>`;
    });
  };
};

const showFutureBookings = () => {
  futureBookingsTile.innerHTML = "";
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.futureBookings = [];
  currentCustomer.getFutureRooms();
  currentCustomer.sortBookingDates("futureBookings");

  currentCustomer.futureBookings.forEach((room) => {
    const total = currencyFormatter.format(room.costPerNight);
    futureBookingsTile.innerHTML += `<section role="contentinfo" class="bookings-card">
    <div class="booking-card-header"
    <p class="date">${room.dateBooked}</p>
    <p class="booking-details">Room Number: ${room.number}</p>
    </div>
    <p class="room-type">You booked the ${room.roomType}.</p>
    <p class="booking-details">${room.bedSize} x ${room.numBeds}</p>
    <p class="booking-details">amenities: ${showBidet(room)}</p>
    <p class="booking-total">Total: ${total}</p>
    </section>`;
  });
};

const showTotal = () => {
  totalSpendTile.innerHTML = "";
  currentCustomer.amountSpent = 0;
  const total = currentCustomer.getTotalSpend(roomsData);
  const displayTotal = currencyFormatter.format(total);
  totalSpendTile.innerHTML += `<h3 class="total-spent">Total: ${displayTotal}</h3>`;
};

const loadBookingDashboard = () => {
  hide([userDashboard, filterContainer]);
  show([bookingDashboard, homeButton, submitBookingButton]);
  injectBookingForm();
  disableBookNowButton();
};

const redirectHome = () => {
  hide([bookingDashboard, homeButton]);
  show([userDashboard]);
  showPastBookings();
  showCurrentBookings();
  showFutureBookings();
  showTotal();
};

const disableBookNowButton = () => {
  if (selectedDate === "" && selectedRoom === null || selectedRoom === null) {
    submitBookingButton.disabled = true;
  } else {
    submitBookingButton.disabled = false;
  };
};

const injectBookingForm = () => {
  hide([roomOptionsContainer, selectedBookingTotal, roomConfirmation, roomChoiceCTA]);
  show([dateInput]);
  bookingForm.innerHTML = "";
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let date = `${yyyy}-${mm}-${dd}`;

  bookingForm.innerHTML +=  `<label for="check-in">When will you be arriving?</label>
  <input class="check-in-date" type="date" id="start" name="check-in" min=${date}>`;

};

const getAvailableRooms = (bookingsData) => {

  const dateInput = document.querySelector("#start");
  selectedDate = dateInput.value.replaceAll("-", "/");

  const booked = bookingsData.filter((booking) => {
    return booking.date === selectedDate;
  }).map((booking) => booking.roomNumber);

  const availableRooms = roomsData.filter((room) => (!booked.includes(room.number)));

  return availableRooms;
};

const showAvailableRooms = (roomsData) => {
  roomOptionsContainer.innerHTML = "";
  show([roomChoiceCTA, roomOptionsContainer, filterContainer]);
  const availableRooms = getAvailableRooms(bookingsData);
  if (selectedDate !== "") {
    hide([dateInput]);
    let cards = "";
    availableRooms.forEach((room) => {
      cards += `<div  class="available-room-card">
      <button class="room-selector" id="${room.number}">
      ${room.roomType}<br>
      ${room.bedSize} x ${room.numBeds}<br>
      ameneties: ${showBidet(room)}
      </button>
      </div>`;
    });
    const dateConfirmation = `<h3> rooms available on ${selectedDate} </h3>`;
    roomOptionsContainer.innerHTML += dateConfirmation + cards;
  } else {
    hide([roomChoiceCTA, filterContainer]);
    roomOptionsContainer.innerHTML += `<h3 class="date-select-error-message">Please select a date to continue</h3>`;
    setTimeout(() => {
      roomOptionsContainer.innerHTML = ""
    }, "2000");
  };
};

const injectFilters = () => {
  roomFiltersDropdown.innerHTML = "";
  const allRooms = getAvailableRooms(bookingsData);

  const filters = allRooms.reduce((arr, room) => {
    if(!arr.includes(room.roomType)) {
      arr.push(room.roomType);
    }
    return arr;
  }, []);

  filters.forEach((option) => {
    const id = option.replaceAll(" ", "");
    roomFiltersDropdown.innerHTML += `<p tabindex="0" class="room-type" id=${id}>${option}</p>`;
  });
};

const applyFilter = (id) => {
  const availableRooms = getAvailableRooms(bookingsData);
  const filteredRooms = availableRooms.filter((room) => {
    return id === room.roomType.replaceAll(" ", "");
  });
  return filteredRooms;
};

const displayFilteredRooms = (e) => {
  const filteredRooms = applyFilter(e.target.id);
  roomOptionsContainer.innerHTML = "";
  let filteredRoomsHTML = "";
  filteredRooms.forEach((room) => {
    filteredRoomsHTML += `<div class="available-room-card">
    <button class="room-selector" id="${room.number}">
    ${room.roomType}<br>
    ${room.bedSize} x ${room.numBeds}<br>
    amenities: ${room.bidet}
    </button>
    </div>`;
  });
  let header = `<h3>available on ${selectedDate}: ${filteredRooms[0].roomType}`;
  roomOptionsContainer.innerHTML += header + filteredRoomsHTML;
};

const showSelectedTotal = (id) => {
  const availableRooms = getAvailableRooms(bookingsData);
  selectedRoom = availableRooms.find((room) => {
    const roomNum = room.number.toString();
    return roomNum === id;
  });
  show([selectedBookingTotal, roomConfirmation, submitBookingButton]);
  hide([roomChoiceCTA, roomOptionsContainer, dateInput, filterContainer]);
  const selectedTotal = currencyFormatter.format(selectedRoom.costPerNight);
  selectedBookingTotal.innerText = `Total: ${selectedTotal}`;
  roomConfirmation.innerText = `You've selected the ${selectedRoom.roomType} on ${selectedDate}`;
  disableBookNowButton();
};

const compileBooking = () => {
  const newBooking = { userID: currentCustomer.id,
    date: selectedDate,
    roomNumber: selectedRoom.number};
  return newBooking;
  };

const submitBooking = () => {
    postBooking(compileBooking());
    showBookingConfirmation();
    setTimeout(() => redirectHome(), "2000");
    selectedDate = "";
    selectedRoom = null;
  };

const displayConfirmationMessage = () => {
  roomConfirmation.innerHTML = "";
  roomConfirmation.innerHTML += `<h3>Booking Complete!</h3>`;
};

const showBookingConfirmation = () => {
  hide([selectedBookingTotal]);
  show([roomConfirmation]);
  displayConfirmationMessage();
  hide([submitBookingButton]);
};

const refreshBookings = (id) => {
  Promise.all(
    [
      getPromise("http://localhost:3001/api/v1/bookings")
    ]
  ).then(jsonArray => {
    bookingsData = [];
    jsonArray[0].bookings.forEach(booking => {
      bookingsData.push(booking);
    });
    refreshData(jsonArray, id);
  });
};

const refreshData = (jsonArray, id) => {
  const url = "http://localhost:3001/api/v1/bookings";
  getPromise(url);
  jsonArray[0].bookings.forEach(booking => {
    bookingsData.push(booking);
  });
  const findCustomer = () => {
    customersData.forEach((customer1) => {
      if (customer1.id === id) {
        currentCustomer.allBookings = [];
        currentCustomer.getCustomerBookings(bookingsData);
      };
    });
  };
  findCustomer();
};

const show = elements => {
  elements.forEach(element => element.classList.remove("hidden"));
};

const hide = elements => {
  elements.forEach(element => element.classList.add("hidden"));
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Exports ---------------------------------------------------------------------

export { refreshBookings, currentCustomer, show };

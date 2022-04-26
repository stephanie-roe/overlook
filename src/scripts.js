// Imports
import './css/styles.css';
import './images/turing-logo.png';
import {customersPromise, bookingsPromise, roomsPromise, postBooking, getPromise} from "./apiCalls";
import Customer from "./classes/Customer";


//Global Variables
let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;
let selectedDate = "";
let selectedRoom = null;

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
const submitBookingButton = document.querySelector(".submit-booking-button");
const selectedBookingTotal = document.querySelector(".selected-booking-total");
const roomConfirmation = document.querySelector(".room-confirmation");
const homeButton = document.querySelector(".user-dashboard-button");
const roomFiltersDropdown = document.querySelector(".dropdown-content");
const roomFilterButton = document.querySelector(".filter-by-type");
const filterContainer = document.querySelector(".dropdown-filter-rooms");
const clearFilterButton = document.querySelector(".clear-filters");
const loginContainer = document.querySelector(".customer-login-container");
const loginButton = document.querySelector(".submit-login-button");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const nav = document.querySelector(".nav-bar");
const customerName = document.querySelector(".customer-welcome");
const loginError = document.querySelector(".login-error")
//Event Listeners
window.onload = (event) => loadWindow();

loginButton.addEventListener("click", function() {
  event.preventDefault()
  verifyCredentials(customersData)
  // verifyUsername(customersData)
  // console.log(customersData)
})

bookNowButton.addEventListener("click", function() {
  loadBookingDashboard();
});

bookingForm.addEventListener("click", function(e) {
  if(e.target.parentElement.classList.contains("check-in-date"))
  console.log("it works")
  // captureDate()
})

submitDateButton.addEventListener("click", function() {
  showAvailableRooms()
  // selectedDate = ""
});

roomOptionsContainer.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains("available-room-card")) {
    showSelectedTotal(e.target.id)
  }
});

homeButton.addEventListener("click", function() {
  hide([bookingDashboard, homeButton])
  show([userDashboard])
  showPastBookings();
  showCurrentBookings();
  showFutureBookings();
  showTotal();
})

roomFilterButton.addEventListener("click", function() {
  injectFilters()
})

roomFiltersDropdown.addEventListener("click", function(e) {
  if(e.target.classList.contains("room-type")) {
    displayFilteredRooms(e)
    show([clearFilterButton])
  }
})

roomFiltersDropdown.addEventListener("keypress", function(e) {
  if(e.target.classList.contains("room-type") && e.key === "Enter") {
    displayFilteredRooms(e)
    show([clearFilterButton])
  }
})

clearFilterButton.addEventListener("click", function() {
  showAvailableRooms()
  hide([clearFilterButton])
})

submitBookingButton.addEventListener("click", function() {
  postBooking(compileBooking())
  showBookingConfirmation()
  setTimeout(() => redirectHome(), "2000")
  selectedDate = ""
  selectedRoom = null
})


//Event Handlers
const redirectHome = () => {
  hide([bookingDashboard, homeButton])
  show([userDashboard])
  showPastBookings();
  showCurrentBookings();
  showFutureBookings();
  showTotal();
}

const showBookingConfirmation = () => {
  hide([selectedBookingTotal])
  show([roomConfirmation])
  roomConfirmation.innerHTML = ""
  roomConfirmation.innerHTML += `<h3>Booking Complete!</h3>`
  hide([submitBookingButton])
}

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
    // instantiateCustomer(50);
    // currentCustomer.getCustomerBookings(bookingsData);
    // showPastBookings();
    // showCurrentBookings();
    // showFutureBookings();
    // showTotal();
  })
};

// LOGIN FUNCTIONALITY
// add event listener to log in button
// this will capture the user's username and password, which only needs to equal overlook2021
// iterate over customersData, using the username as comparison (find)
// when they match - return obj is set to currentCustomer global variable
// ERRORHANDLING HERE- IF THEY LOGIN W A CUSTOMER NUMBER NOT FOUND, SHOW AN ERROR MESSAGE
// SAME IF PW IS INCORRECT

// another function will hide the login screen,
// include the promise.all and all other window load funcs
// customer id in instantiateCustomer will just be currentCustomer.id

// MAYBE ACTUALLY KEEP THE FIRST FETCH IN THE PAGE LOAD AND THEN MOVE THE INITIALIZING FUNCS WHEN LOGGED IN

const verifyUsername = () => {
  const usernameEntered = username.value
  const letters = usernameEntered.slice(0, usernameEntered.search(/\d/))
  const userID = Number(usernameEntered.replace(letters, ""))

  return userID
}

const verifyPassword = () => {
  const passwordEntered = password.value
  console.log(passwordEntered)
  if (passwordEntered === "overlook2021") {
    return true
  } else {
    return false
  }
}

const verifyCredentials = (customersData) => {
  const userID = verifyUsername()
  customersData.forEach((customer) => {
    if (customer.id === userID && verifyPassword()) {
      instantiateCustomer(userID);
      commenceLogin()
    } else {
      show([loginError])
      setTimeout(() => hide([loginError]), "2000")
    }
  })
// iterate over customersdata and find a matching id and if that matches and verify pass is truthy, then do below
  if (userID && verifyPassword()) {
    // console.log("it works!!!")
    instantiateCustomer(userID);
    commenceLogin()
    // instantiateCustomer(userID)
    // invoke login function - hide login page, invoke those methods that are currently in my promise.all show user dashboard
  }
  //else show error message
  // NEED TO ADD AN ELSE TO DO ERROR HANDLING HERE
}

const commenceLogin = () => {
  hide([loginContainer])
  show([userDashboard, nav])
  currentCustomer.getCustomerBookings(bookingsData);
  showPastBookings();
  showCurrentBookings();
  showFutureBookings();
  showTotal();
  const customerNames = currentCustomer.name.split(" ")
  const firstName = customerNames[0]
  customerName.innerHTML = ""
  customerName.innerHTML = `Welcome, ${firstName}`
}


const instantiateCustomer = (id) => {
//match up id from login to the id in customersData and use that to set new customer obj, which will instantiate our current customer.
// if customer.username === username, customer id will be set to global variable of id and that is what will be passed into the arg
  // will probably need a findcustomerbyid function before this to set that id to then be passed in when we instantiate
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
  pastBookingsTile.innerHTML = ""
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getPastRooms();
  currentCustomer.sortBookingDates("pastBookings")
  currentCustomer.pastBookings.forEach((room) => {

    const total = currencyFormatter.format(room.costPerNight);
    pastBookingsTile.innerHTML += `<section role="contentinfo" class="bookings-card">
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
  currentBookingsTile.innerHTML = ""
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getCurrentRoom();
  currentCustomer.sortBookingDates("currentBookings")

  if (!currentCustomer.currentBookings.length) {
    currentBookingsTile.innerHTML += `<section role="contentinfo" class="book-now-cta">
                                      <p class="book-now-message">No active bookings, we hope to see you soon!</p>
                                      </section>`
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
                                    <p class="booking-details">Has bidet? ${room.bidet}</p>
                                    <p class="booking-total">Total: ${total}</p>
                                    </section>`
    })
  }
}

const showFutureBookings = () => {
  futureBookingsTile.innerHTML = ""
  currentCustomer.getAllRooms(roomsData);
  currentCustomer.getFutureRooms();
  currentCustomer.sortBookingDates("futureBookings")

  currentCustomer.futureBookings.forEach((room) => {
    const total = currencyFormatter.format(room.costPerNight);
    futureBookingsTile.innerHTML += `<section role="contentinfo" class="bookings-card">
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
  currentCustomer.amountSpent = 0
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
  show([bookingDashboard, homeButton, submitBookingButton])
  injectBookingForm()
  disableBookNowButton()
};

const injectBookingForm = () => {
  hide([roomOptionsContainer, selectedBookingTotal, roomConfirmation, roomChoiceCTA])
  show([dateInput])
  bookingForm.innerHTML = ""
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let date = `${yyyy}-${mm}-${dd}`;

  bookingForm.innerHTML +=  `<label for="check-in">When will you be arriving?</label>
                              <input class="check-in-date" type="date" id="start" name="check-in" min=${date}>`

};

const getAvailableRooms = (bookingsData) => {

  const dateInput = document.querySelector("#start");
  selectedDate = dateInput.value.replaceAll("-", "/");

  const booked = bookingsData.filter((booking) => {
    return booking.date === selectedDate
  }).map((booking) => booking.roomNumber)

  const availableRooms = roomsData.filter((room) => (!booked.includes(room.number)))

  return availableRooms;
};

const showAvailableRooms = (roomsData) => {
  roomOptionsContainer.innerHTML = ""
  show([roomChoiceCTA, roomOptionsContainer, filterContainer])
  const availableRooms = getAvailableRooms(bookingsData);
  if (selectedDate !== "") {
    hide([dateInput])
    let cards = ""
    availableRooms.forEach((room) => {
      cards += `<div  class="available-room-card">
                                            <button class="room-selector" id="${room.number}">
                                            ${room.roomType}<br>
                                            ${room.bedSize} x ${room.numBeds}<br>
                                            ameneties: ${room.bidet}
                                            </button>
                                          </div>`
    });
    const dateConfirmation = `<h3> rooms available on ${selectedDate} </h3>`
    roomOptionsContainer.innerHTML += dateConfirmation + cards
  } else {
    hide([roomChoiceCTA, filterContainer])
    roomOptionsContainer.innerHTML += `<h3 class="date-select-error-message">Please select a date to continue</h3>`
  }
};

const showSelectedTotal = (id) => {
    const availableRooms = getAvailableRooms(bookingsData);
    selectedRoom = availableRooms.find((room) => {
      const roomNum = room.number.toString()
      return roomNum === id
    })
    show([selectedBookingTotal, roomConfirmation, submitBookingButton])
    hide([roomChoiceCTA, roomOptionsContainer, dateInput, filterContainer])
    const selectedTotal = currencyFormatter.format(selectedRoom.costPerNight)
    selectedBookingTotal.innerText = `Total: ${selectedTotal}`
    roomConfirmation.innerText = `You've selected the ${selectedRoom.roomType} on ${selectedDate}`
    disableBookNowButton()
}

const injectFilters = () => {
  roomFiltersDropdown.innerHTML = "";
  const allRooms = getAvailableRooms(bookingsData);

  const filters = allRooms.reduce((arr, room) => {
    if(!arr.includes(room.roomType)) {
      arr.push(room.roomType)
    }
    return arr
  }, [])

  filters.forEach((option) => {
    const id = option.replaceAll(" ", "");
    roomFiltersDropdown.innerHTML += `<p tabindex="0" class="room-type" id=${id}>${option}</p>`
  })
}

const applyFilter = (id) => {
  const availableRooms = getAvailableRooms(bookingsData);
  const filteredRooms = availableRooms.filter((room) => {
    return id === room.roomType.replaceAll(" ", "")
  })
  return filteredRooms
}

const displayFilteredRooms = (e) => {
  const filteredRooms = applyFilter(e.target.id)
  roomOptionsContainer.innerHTML = ""
  let filteredRoomsHTML = ""
  filteredRooms.forEach((room) => {
    filteredRoomsHTML += `<div class="available-room-card">
                                          <button class="room-selector" id="${room.number}">
                                          ${room.roomType}<br>
                                          ${room.bedSize} x ${room.numBeds}<br>
                                          amenities: ${room.bidet}
                                          </button>
                                        </div>`
  })
  let header = `<h3>available on ${selectedDate}: ${filteredRooms[0].roomType}`
  roomOptionsContainer.innerHTML += header + filteredRoomsHTML;
}

// const clearFilters = () => {
//   // this would be the event handler for a clear filters button
//   // it would basically just reinvoke the method that showed all of the room options.
// }


const compileBooking = () => {
  const newBooking = { userID: currentCustomer.id,
                      date: selectedDate,
                      roomNumber: selectedRoom.number}
  return newBooking
}


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
  })
};

const refreshData = (jsonArray, id) => {
  const url = "http://localhost:3001/api/v1/bookings"
  getPromise(url)
  jsonArray[0].bookings.forEach(booking => {
    bookingsData.push(booking);
  });
  const findCustomer = () => {
    customersData.forEach((customer1) => {
      if (customer1.id === id) {
        currentCustomer.allBookings = [];
        currentCustomer.getCustomerBookings(bookingsData);
      }
    })
  }
  findCustomer()
}

// const disableDateSubmitButton = () => {
//   if (selectedDate === "") {
//     submitDateButton.disabled = true
//   } else {
//     submitDateButton.disabled = false
//   }
// }


const disableBookNowButton = () => {
  if (selectedDate === "" && selectedRoom === null) {
    submitBookingButton.disabled = true
  } else {
    submitBookingButton.disabled = false
  }
}
// const captureDate = () => {
//   const dateInput = document.querySelector("#start");
//   selectedDate = dateInput.value.replaceAll("-", "/");
// }


export { refreshBookings, currentCustomer, show };

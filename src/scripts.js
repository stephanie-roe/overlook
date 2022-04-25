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
let selectedDate;
let selectedRoom;

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

//Event Listeners
window.onload = (event) => loadWindow();

bookNowButton.addEventListener("click", function() {
  loadBookingDashboard();
});

submitDateButton.addEventListener("click", function() {
  showAvailableRooms()
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

submitBookingButton.addEventListener("click", function() {
  postBooking(compileBooking())
  // create a POST request ✅
  // refetch the customer and bookings data (? BUG MAY EXIST HERE)
    // this will update the user's bookings, rooms, dom manipulation, etc (ONLY WORKS ON PAGE REFRESH)
    // this will also ensure bookings are not replicated (SEEMS LIKE THIS HAS BEEN HANDLED- NO OVERLAPS)
})


//Event Handlers
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
    instantiateCustomer(50);
    currentCustomer.getCustomerBookings(bookingsData);
    showPastBookings();
    showCurrentBookings();
    showFutureBookings();
    showTotal();
  })
};

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
  currentBookingsTile.innerHTML = ""
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
  futureBookingsTile.innerHTML = ""
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
  show([bookingDashboard, homeButton])
  injectBookingForm()
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
                              <input type="date" id="start" name="check-in" min=${date} required>`

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
  availableRooms.forEach((room) => {
    roomOptionsContainer.innerHTML += `<div  class="available-room-card">
                                          <button id="${room.number}">
                                          ${room.roomType}<br>
                                          ${room.bedSize} x ${room.numBeds}<br>
                                          ameneties: ${room.bidet}
                                          </button>
                                        </div>`
  });
};

const showSelectedTotal = (id) => {
    const availableRooms = getAvailableRooms(bookingsData);
    selectedRoom = availableRooms.find((room) => {
      const roomNum = room.number.toString()
      return roomNum === id
    })
    show([selectedBookingTotal, roomConfirmation])
    hide([roomChoiceCTA, roomOptionsContainer, dateInput, filterContainer])
    const selectedTotal = currencyFormatter.format(selectedRoom.costPerNight)
    selectedBookingTotal.innerText = `Total: ${selectedTotal}`
    roomConfirmation.innerText = `You've selected the ${selectedRoom.roomType} on ${selectedDate}`
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
    roomFiltersDropdown.innerHTML += `<p class="room-type" id=${id}>${option}</p>`
  })
}

//THESE FUNCTIONS NEED TO BE BUILD OUT TO ALLOW USER TO FILTER BY ROOM TYPE
// const applyFilter = () => {
// this would happen when someone clicks on the filter of thier choosing
// we could do a filter over the all rooms and the room type would be the criteria
// reset what is showing on the dom for that section and then iterate over the shortened array and inject that html
// }

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


export { refreshBookings, currentCustomer };

import { refreshBookings, currentCustomer} from "./scripts.js";

const getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log("error"));
};
// add error handling for response.ok and throw catch error

let customersPromise = getPromise("http://localhost:3001/api/v1/customers");
let bookingsPromise = getPromise("http://localhost:3001/api/v1/bookings");
let roomsPromise = getPromise("http://localhost:3001/api/v1/rooms");

let postBooking = (obj) => {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  })
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((booking) => {
    // errorMessage.innerText = ""
    // invoke the refresh function here
    let id = currentCustomer.id
    refreshBookings(id)
    console.log("Success!")
  })
  .catch((error) => {
    console.log("Oh No!");
    // errorMessage.innerText = "Apologies, booking unsuccessful"
    // return errorMessage
  });
};

export {customersPromise, bookingsPromise, roomsPromise, postBooking, getPromise};

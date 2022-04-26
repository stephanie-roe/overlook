import { refreshBookings, currentCustomer, show} from "./scripts.js";

let errorMessage = document.querySelector(".error-message-post-unsuccessful");

const getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log("error"));
};

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
    errorMessage.innerText = "";
    let id = currentCustomer.id;
    refreshBookings(id);
    console.log("Success!");
  })
  .catch((error) => {
    console.log("Oh No!");
    show([errorMessage]);
    errorMessage.innerText = "Apologies, booking unsuccessful. Please select a date and room and try again.";
    return errorMessage;
  });
};

export {customersPromise, bookingsPromise, roomsPromise, postBooking, getPromise};

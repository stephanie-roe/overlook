const getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log("error"));
};
// add error handling for response.ok and throw catch error

let customersPromise = getPromise("http://localhost:3001/api/v1/customers");
let bookingsPromise = getPromise("http://localhost:3001/api/v1/bookings");
let roomsPromise = getPromise("http://localhost:3001/api/v1/rooms");

export {customersPromise, bookingsPromise, roomsPromise};

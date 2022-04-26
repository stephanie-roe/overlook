const roomsData = [ {"number": 15,
                      "roomType": "residential suite",
                      "bidet": true,
                      "bedSize": "queen",
                      "numBeds": 1,
                      "costPerNight": 358.4},
                      {"number": 24,
                      "roomType": "suite",
                      "bidet": false,
                      "bedSize": "full",
                      "numBeds": 2,
                      "costPerNight": 477.38},
                      {"number": 12,
                      "roomType": "single room",
                      "bidet": false,
                      "bedSize": "twin",
                      "numBeds": 2,
                      "costPerNight": 172.09},
                      {"number": 11,
                      "roomType": "single room",
                      "bidet": true,
                      "bedSize": "twin",
                      "numBeds": 2,
                      "costPerNight": 207.24},
                      {"number": 18,
                      "roomType": "residential suite",
                      "bidet": true,
                      "bedSize": "king",
                      "numBeds": 2,
                      "costPerNight": 207.24}];

const customersData = [ {"id": 1,
                      "name": "Leatha Ullrich"},
                      {"id": 2,
                      "name": "Rocio Schuster"},
                      {"id": 3,
                      "name": "Kelvin Schiller"}];

const bookingsData = [{"id": "5fwrgu4i7k55hl6sz",
                      "userID": 1,
                      "date": "2122/04/23",
                      "roomNumber": 15},
                      {"id": "5fwrgu4i7k55hl6t5",
                      "userID": 2,
                      "date": "2022/04/22",
                      "roomNumber": 24},
                      {"id": "5fwrgu4i7k55hl6t6",
                      "userID": 2,
                      "date": "2022/01/10",
                      "roomNumber": 12},
                      {"id": "5fwrgu4i7k55hl6ti",
                      "userID": 2,
                      "date": "2022/01/22",
                      "roomNumber": 11},
                      {"id": "5fwrgu4i7k55hl6ti",
                      "userID": 2,
                      "date": `${getToday()}`,
                      "roomNumber": 18}];

const getToday = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let date = `${yyyy}/${mm}/${dd}`;
  return date;
};

export {roomsData, customersData, bookingsData, getToday};

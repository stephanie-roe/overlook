class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.username = `customer${customer.id}`;
    //NEED TO TEST FOR THIS
    this.name = customer.name;
    this.allBookings = [];
    this.allRooms = [];
    this.pastBookings = [];
    this.currentBookings = [];
    this.futureBookings = [];
    this.amountSpent = 0;
  };
  getCustomerBookings(bookings) {
    bookings.forEach((booking) => {
      if (this.id === booking.userID && !this.allBookings.includes(booking)) {
        this.allBookings.push(booking);
      };
    });
  };
  getTotalSpend(rooms) {
    const result = this.allBookings.reduce((total, booking) => {
      rooms.forEach((room) => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
          return total;
        };
      });
      return total;
    }, 0);
    return this.amountSpent = result;
  };
  getAllRooms(rooms) {
    const result = this.allBookings.reduce((arr, booking) => {
      rooms.forEach((room) => {
        if (booking.roomNumber === room.number) {
          const obj = {number: room.number,
                      roomType: room.roomType,
                      bidet: room.bidet,
                      bedSize: room.bedSize,
                      numBeds: room.numBeds,
                      costPerNight: room.costPerNight,
                      dateBooked: booking.date};
          arr.push(obj);
        }
      });
      return arr;
    }, []);
    this.allRooms = result;
  };
  getFutureRooms() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let currentDate = Date.parse(date);
    this.allRooms.forEach((room) => {
      let bookingDate = Date.parse(room.dateBooked);
      if (bookingDate > currentDate && !this.futureBookings.includes(room)) {
        this.futureBookings.push(room);
      };
    });
  };
  getCurrentRoom() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let currentDate = Date.parse(date);
    this.allRooms.forEach((room) => {
      let bookingDate = Date.parse(room.dateBooked);
      if (bookingDate === currentDate && !this.currentBookings.includes(room)) {
        this.currentBookings.push(room);
      };
    });
  };
  getPastRooms() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let currentDate = Date.parse(date);
    this.allRooms.forEach((room) => {
      let bookingDate = Date.parse(room.dateBooked);
      if (bookingDate < currentDate && !this.pastBookings.includes(room)) {
        this.pastBookings.push(room);
      };
    });
  };
  sortBookingDates(roomsArray) {
    let sortedDates = this[roomsArray].reduce((acc, room) => {
      let parsed = Date.parse(room.dateBooked);
      acc.push(parsed);
      return acc;
    }, []);

    sortedDates.sort((a, b) => {
      return b - a;
    });

    let result = sortedDates.reduce((acc, date) => {
      this[roomsArray].forEach(room => {
        let bookingDate = Date.parse(room.dateBooked);
        if (date === bookingDate && !acc.includes(room)) {
          acc.push(room);
        };
      });
      return acc;
    }, []);
     return this[roomsArray] = result;
  };
};

export default Customer;

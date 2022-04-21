class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.allBookings = [];
    // booking objs - might not need this?
    this.allRooms = [];
    // this is what will be displayed on the DOM
    this.pastBookings = [];
    this.currentBookings = [];
    this.futureBookings = [];
    this.amountSpent = 0;
  }
  // addBooking(booking) {
  //
  // }
  getCustomerBookings(bookings) {
    bookings.forEach((booking) => {
      if (this.id === booking.userID) {
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
                      dateBooked: booking.date}
          arr.push(obj);
        }
      })
      return arr
    }, [])
    this.allRooms = result
  };
};

export default Customer;

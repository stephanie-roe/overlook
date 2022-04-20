class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.allBookings = [];
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
};

export default Customer;

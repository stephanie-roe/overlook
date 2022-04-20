class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.allBookings = [];
    this.pastBookings = [];
    this.currentBookings = [];
    this.futureBookings = [];
  }
  // addBooking(booking) {
  //
  // }
}

export default Customer;

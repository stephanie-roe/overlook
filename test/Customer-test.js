import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import {customersData, bookingsData, roomsData, getToday} from "./data";

describe("Customer", () => {
  let customer1, customer2, customer3;

  beforeEach(() => {
    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
    customer3 = new Customer(customersData[2]);

  });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(customer1).to.be.an.instanceof(Customer);
  });

  it("should have a property that holds the customer's id", () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it("should have a property that holds the customer's username", () => {
    expect(customer1.username).to.equal("customer1");
    expect(customer2.username).to.equal("customer2");
  });

  it("should have a property that holds the customer's name", () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  });

  it("should be able to store all of the customer's bookings", () => {
    customer1.getCustomerBookings(bookingsData);
    customer2.getCustomerBookings(bookingsData);

    expect(customer1.allBookings[0].roomNumber).to.equal(15);
    expect(customer1.allBookings[0].id).to.equal("5fwrgu4i7k55hl6sz");

    expect(customer2.allBookings[1].roomNumber).to.equal(12);
    expect(customer2.allBookings[1].id).to.equal("5fwrgu4i7k55hl6t6");
  });

  it("should not add a booking to the user's allBookings property if the booking does not belong to the user", () => {
    customer3.getCustomerBookings(bookingsData);

    expect(customer3.allBookings).to.deep.equal([]);
  });

  it("should be able total up the amount spent on all bookings", () => {
    customer1.getCustomerBookings(bookingsData);
    customer1.getTotalSpend(roomsData);

    customer2.getCustomerBookings(bookingsData);
    customer2.getTotalSpend(roomsData);

    expect(customer1.amountSpent).to.equal(358.4);
    expect(customer2.amountSpent).to.equal(1063.95)
  });

  it("should have a total amount spent of 0 if user has no rooms booked", () => {
    customer3.getCustomerBookings(bookingsData);
    customer3.getTotalSpend(roomsData);

    expect(customer3.amountSpent).to.equal(0);
  });

  it("should have a method that stores all of the rooms a customer has booked with all the necessary info", () => {
    customer1.getCustomerBookings(bookingsData);
    customer1.getAllRooms(roomsData);

    expect(customer1.allRooms[0].roomType).to.equal("residential suite");
    expect(customer1.allRooms[0].bidet).to.equal(true);
    expect(customer1.allRooms[0].dateBooked).to.equal("2122/04/23");
  });

  it("should not have any rooms if the customer has no bookings", () => {
    customer3.getCustomerBookings(bookingsData);
    customer3.getAllRooms(roomsData);

    expect(customer3.allRooms).to.deep.equal([]);
  });

  it("should be able to determine if a customer has any upcoming bookings", () => {
    customer1.getCustomerBookings(bookingsData);
    customer1.getAllRooms(roomsData);
    customer1.getFutureRooms();

    expect(customer1.futureBookings[0].dateBooked).to.equal("2122/04/23");
  });

  it("should not have any rooms in it's futureBookings array if they do not have any upcoming bookings", () => {
    customer3.getCustomerBookings(bookingsData);
    customer3.getAllRooms(roomsData);
    customer3.getFutureRooms();

    expect(customer3.futureBookings).to.deep.equal([]);
  });

  it("should be able to determine if a customer has any active bookings", () => {
    customer2.getCustomerBookings(bookingsData);
    customer2.getAllRooms(roomsData);
    customer2.getCurrentRoom();

    expect(customer2.currentBookings[0].dateBooked).to.equal(`${getToday()}`);
    // change this so the date is somehow today ????
    // somehow get current date(can do same for future)
  });

  it("should be able to determine if a customer does not have any active bookings", () => {
    customer3.getCustomerBookings(bookingsData);
    customer3.getAllRooms(roomsData);
    customer3.getCurrentRoom();

    expect(customer3.currentBookings).to.deep.equal([]);
  });

  it("should be able to determine if a customer has any past bookings", () => {
    customer2.getCustomerBookings(bookingsData);
    customer2.getAllRooms(roomsData);
    customer2.getPastRooms();

    expect(customer2.pastBookings[0].dateBooked).to.equal("2022/04/22");
  });

  it("should be able to determine if a customer does not have any past bookings", () => {
    customer3.getCustomerBookings(bookingsData);
    customer3.getAllRooms(roomsData);
    customer3.getPastRooms();

    expect(customer3.pastBookings).to.deep.equal([]);
  });

  it("should be able sort a customer's bookings for each category in chronological order", () => {
    customer2.getCustomerBookings(bookingsData);
    customer2.getAllRooms(roomsData);
    customer2.getPastRooms();
    customer2.sortBookingDates("pastBookings");

    expect(customer2.pastBookings[0].dateBooked).to.equal("2022/04/22");
    expect(customer2.pastBookings[0].costPerNight).to.equal(477.38);
  });
});

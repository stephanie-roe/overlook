import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import {customersData, bookingsData, roomsData} from "./data";

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

  it("should have a property that holds the customer's name", () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  });

  it("should be able to store all of the customer's bookings", () => {
    customer1.getCustomerBookings(bookingsData);
    customer2.getCustomerBookings(bookingsData);

    expect(customer1.allBookings[0].roomNumber).to.equal(15);
    expect(customer1.allBookings[0].id).to.equal("5fwrgu4i7k55hl6sz");

    expect(customer2.allBookings[0].roomNumber).to.equal(24);
    expect(customer2.allBookings[0].id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it("should not add a booking to the user's allBookings property if the booking does not belong to the user", () => {
    customer3.getCustomerBookings(bookingsData);

    expect(customer3.allBookings).to.deep.equal([]);
  });

  it("should be able total up the amount spent on all bookings", () => {
    customer1.getCustomerBookings(bookingsData);
    customer1.getTotalSpend(roomsData);

    expect(customer1.amountSpent).to.equal(358.4);
  });
});

// it should have a method that allows the user to book a room

// it should have a method to determine if the booking occurred in the past
  // this method will reference current date using conditional logic
  // if it is before the current date, it will be pushed into past bookings array (happy path)
  // if the booking did not occur in the past, it will not pass the conditional logic and nothing will be pushed into the past bookings array/ []. (sad path)

// it should have a method to determine if the booking is currently active (referencing current date)
  // this method will reference the current date using conditional logic
  // if the current date matches the date booked, the booking will be pushed into the current bookings array (happy path)
  // if the current date does not match the date booked, the current bookings array will remain empty/[] (sad path)

// it should have a method to determine if the booking is scheduled for the future (referencing current date)
  // this method will reference current date using conditional logic
  // if the booking is before the current date, the booking will be pushed into the furture bookings array (happy path)
  // if the booking is in the past/ current, it will not be pushed and the future bookings array will remain empty/ [] (sad path)

// it should have a method that totals up the amount spent on rooms over the customer's lifetime.
  // iterates over each of the past/current/future rooms arrays and totals up those costs, combines those three totals to get the grand total

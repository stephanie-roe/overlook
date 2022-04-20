import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer"

describe("Customer", () => {
  let customer1, customer2;

  beforeEach(() => {
    customer1 = new Customer(1, "Leatha Ullrich");
    customer2 = new Customer(2, "Rocio Schuster");
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
});

// it should have a property that contains the customer's all time bookings
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

import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/Booking";
import {customersData, bookingsData, roomsData} from "./data";

describe("Booking", () => {
  let booking1, booking2;

  beforeEach(() => {
    booking1 = new Booking(bookingsData[0]);
    booking2 = new Booking(bookingsData[1]);
  });

  it("should be a function", () => {
    expect(Booking).to.be.a("function");
  });

  it("should be an instance of Booking", () => {
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it("should have an id", () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it("should have a property that stores the ID of the user who has booked the room", () => {
    expect(booking1.userID).to.equal(1);
    expect(booking2.userID).to.equal(2);
  });

  it("should have a date that is has been booked", () => {
    expect(booking1.date).to.equal("2122/04/23");
    expect(booking2.date).to.equal("2022/04/22");
  });

  it("should have a property that stores the room number of the booking", () => {
    expect(booking1.roomNumber).to.equal(15);
    expect(booking2.roomNumber).to.equal(24);
  });
});

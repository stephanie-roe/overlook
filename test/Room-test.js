import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/Room";
import {roomsData} from "./data";

describe("Room", () => {
  let room1, room2;

  beforeEach(() => {
    room1 = new Room(roomsData[0]);
    room2 = new Room(roomsData[1]);
  });

  it("should be a function", () => {
    expect(Room).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(room1).to.be.an.instanceof(Room);
  });

  it("should have a property that holds the room's number", () => {
    expect(room1.number).to.equal(15);
    expect(room2.number).to.equal(24);
  });

  it("should have a property that holds the room's type", () => {
    expect(room1.roomType).to.equal("residential suite");
    expect(room2.roomType).to.equal("suite");
  });

  it("should have a property that communicates if the room does have a bidet", () => {
    expect(room1.bidet).to.equal(true);
  });

  it("should also communicate if the room does not have a bidet", () => {
    expect(room2.bidet).to.equal(false);
  });

  it("should have a property that holds the bed size", () => {
    expect(room1.bedSize).to.equal("queen");
    expect(room2.bedSize).to.equal("full");
  });

  it("should have a property that holds the number of beds", () => {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
  });

  it("should have a property that stores the room's cost per night", () => {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
  });


});

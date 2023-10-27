import Rover from "../src/Rover.js";

describe("Rover", () => {
  it("should create a new Rover", () => {
    const rover = new Rover(0, 0, []);
    expect(rover).toBeInstanceOf(Rover);
  });

  it("should have a default direction of 90", () => {
    const rover = new Rover(0, 0, []);
    expect(rover.direction).toBe(90);
  });

  it("should have a default position of 0,0", () => {
    const rover = new Rover(0, 0, []);
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
  });

  it("should move forward when given F", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    rover.execCommands("F");
    expect(rover.y).toBe(1);
    expect(rover.x).toBe(0);
  });
  it("should have direction 0 when given R", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    rover.execCommands("R");
    expect(rover.direction).toBe(0);
  });
  it("should have direction 180 when given L", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    rover.execCommands("L");
    expect(rover.direction).toBe(180);
  });
  it("should have direction 90 when given RRRR", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    rover.execCommands("RRRR");
    expect(rover.direction).toBe(90);
  });
  it("should have position 0,0 when given FFFF", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    rover.execCommands("FFFF");
    expect(rover.y).toBe(0);
    expect(rover.x).toBe(0);
  });
  it("should maintain previous position when next position is an obstacle", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ]);
    rover.execCommands("F");
    expect(rover.y).toBe(0);
    expect(rover.x).toBe(0);
  });
  it("should expect a string as output when given a predetermined input", () => {
    const rover = new Rover(0, 0, [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
    ]);
    let response = rover.execCommands("RFF");
    expect(response).toStrictEqual({
      direction: 0,
      hasObstacle: true,
      x: 1,
      y: 0,
    });
    response = rover.execCommands("RF");
    expect(response).toStrictEqual({
      direction: 270,
      hasObstacle: false,
      x: 1,
      y: 3,
    });
    response = rover.execCommands("LFRFFLFFFLL");
    expect(response).toStrictEqual({
      direction: 180,
      hasObstacle: false,
      x: 0,
      y: 1,
    });
  });
});

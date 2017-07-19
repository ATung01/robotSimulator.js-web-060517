'use strict';

function Robot(coordinates=[0,0], bearing) {
  // Pos is an object of x,y coordinates
  this.coordinates = coordinates;
  this.bearing = bearing;
  // this.orient = function(currentDirection) {
  //   if(directions.includes(currentDirection)) {
  //     this.bearing = currentDirection
  //   }
  //   else {
  //     throw new Error(["Invalid Robot Bearing"]);
  //   }
  // };
}


Robot.prototype.orient = function(currentDirection) {
  let directions = ['east', 'west', 'north', 'south'];
  if(directions.includes(currentDirection)) {
    this.bearing = currentDirection
  }
  else {
    throw new Error(["Invalid Robot Bearing"]);
  }
};

Robot.prototype.turnRight = function() {
  switch(this.bearing) {
    case 'east':
    this.bearing = 'south'
    break;
    case 'south':
    this.bearing = 'west'
    break;
    case 'west':
    this.bearing = 'north'
    break;
    case 'north':
    this.bearing = 'east'
    break;
  }
}
Robot.prototype.turnLeft = function() {
  switch(this.bearing) {
    case 'east':
    this.bearing = 'north'
    break;
    case 'north':
    this.bearing = 'west'
    break;
    case 'west':
    this.bearing = 'south'
    break;
    case 'south':
    this.bearing = 'east'
    break;
  }
}

Robot.prototype.at = function(x, y) {
  this.coordinates = [x, y];
}

Robot.prototype.advance = function() {
  switch(this.bearing) {
    case 'east':
      this.coordinates[0]++;
      break;
    case 'north':
      this.coordinates[1]++;
      break;
    case 'west':
      this.coordinates[0]--;
      break;
    case 'south':
      this.coordinates[1]--;
      break;
  }
}

Robot.prototype.instructions = function(instructions) {
  let orders = instructions.split('');
  return orders.map( function (order) {
    switch (order) {
      case 'R':
        return 'turnRight';
        break;
      case 'L':
        return 'turnLeft';
        break;
      case 'A':
        return 'advance';
        break;
    };
  });
}

Robot.prototype.place = function(position) {
  this.coordinates[0] = position.x;
  this.coordinates[1] = position.y;
  this.bearing = position.direction;
}

Robot.prototype.evaluate = function(instructions) {
  let robot = this;
  let orders = this.instructions(instructions);
  orders.forEach(function(order) {
    switch (order) {
      case 'turnLeft':
        robot.turnLeft();
        break;
      case 'turnRight':
        robot.turnRight();
        break;
      case 'advance':
        robot.advance();
        break;
    }
  });
}

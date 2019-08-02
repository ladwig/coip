const { Gpio } = require("onoff");
const WebSocket = require("ws");

const first = new Gpio(17, "out");
const second = new Gpio(22, "out");
const third = new Gpio(23, "out");
const fourth = new Gpio(24, "out");

let current = [];

async function stop(action) {
  if (current.length === 1) {
    try {
      await first.write(Gpio.LOW);
      await second.write(Gpio.LOW);
      await third.write(Gpio.LOW);
      await fourth.write(Gpio.LOW);

      current = [];

      return;
    } catch (e) {
      console.log(e);
    }
  }

  const index = current.indexOf(action);

  if (index) {
    current.splice(index, 1);
  }

  await move(current[current.length - 1], false);
}

async function moveForward() {
  try {
    await first.write(Gpio.LOW);
    await second.write(Gpio.HIGH);
    await third.write(Gpio.HIGH);
    await fourth.write(Gpio.LOW);
  } catch (e) {
    console.log(e);
  }
}

async function moveBackwards() {
  try {
    await first.write(Gpio.HIGH);
    await second.write(Gpio.LOW);
    await third.write(Gpio.LOW);
    await fourth.write(Gpio.HIGH);
  } catch (e) {
    console.log(e);
  }
}

async function moveRight() {
  try {
    await first.write(Gpio.LOW);
    await second.write(Gpio.HIGH);
    await third.write(Gpio.LOW);
    await fourth.write(Gpio.LOW);
  } catch (e) {
    console.log(e);
  }
}

async function moveLeft() {
  try {
    await first.write(Gpio.LOW);
    await second.write(Gpio.LOW);
    await third.write(Gpio.HIGH);
    await fourth.write(Gpio.LOW);
  } catch (e) {
    console.log(e);
  }
}

async function move(double, push) {
  try {
    switch (double) {
      case 10:
        if (push) current.push(10);
        await moveForward();
        break;
      case 20:
        if (push) current.push(20);
        await moveRight();
        break;
      case 30:
        if (push) current.push(30);
        await moveBackwards();
        break;
      case 40:
        if (push) current.push(40);
        await moveLeft();
        break;
      default:
        stop();
        break;
    }
  } catch (e) {
    console.log(e);
  }
}

function prepare(ip) {
  const ws = new WebSocket(`wss://${ip}`);

  ws.on("open", function() {
    ws.send(1010);
    console.log("I am ready");
  });

  ws.on("message", async function(data) {
    try {
      const double = parseInt(data.toString("hex"), 16);
      await move(double, true);
    } catch (e) {
      console.log(e);
    }
  });
}
module.exports = prepare;

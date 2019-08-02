const controls = require("./controls");

function main() {
  const { argv } = process;
  const ip = argv[2] || "car-over-ip-socket.now.sh";

  controls(ip);
}

main();

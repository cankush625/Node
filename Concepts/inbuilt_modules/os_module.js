const os = require("os");

// Get user information
console.log(os.userInfo());

// Get the system uptime
console.log(`System uptime is ${os.uptime()} seconds`);

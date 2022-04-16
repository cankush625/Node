// Note:
// Event is core building block of NodeJS. Lots of node modules extends/use the Events Emitter.
// So, even if we are not using Event Emitter directly, it is being used behind
// the scene by some modules we are using.
// Eg. .on method from HTTP module. http.Server has events like request, connect, etc.

const EventsEmitter = require("events");

const customEmitter = new EventsEmitter();

customEmitter.on("response", () => {
    console.log("Date received");
});

customEmitter.emit("response");

// Event with arguments
customEmitter.on("welcome", (name) => {
    console.log(`Hello ${name}`);
});

customEmitter.emit("welcome", "Robert");

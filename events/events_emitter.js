const EventsEmitter = require("events");

const customEmitter = new EventsEmitter();

customEmitter.on("response", () => {
    console.log("Date received");
});

customEmitter.emit("response")

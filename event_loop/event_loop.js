console.log("Before setTimeout");

// register callback with setTimeout
setTimeout(() => {
    console.log("Set Timeout");
}, 0);

console.log("After setTimeout");

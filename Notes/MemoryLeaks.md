# Understanding and debugging memory leaks in NodeJS applications

## What is memory leak?
When a computer program/application incorrectly manages memory allocations in such
a way that memory that is no longer needed is not released.

## Why does Garbage Collector is not of most use in this situation?
Garbage collection can only collect what it knows not to be in use.  
Objects that are reachable from roots are not garbage.

### Examples of implementations that are not memory leaks:
```
def fun() => {
    var garbage = new Array(10000);
    return true;
}
```
The variable garbage in above function will not do memory leak because GC knows this variable
is not used anywhere and hence it will be garbage collected.

```
app.get("/", (req, res) =>{
    req.garbage = new Array(10000);
    res.status(200).send("success");
});
```
In the above function, the request object only last for a request, and it is garbage collected.  
Hence, the garbage property allocated to req object is also garbage collected.  
So, this is not a memory leak.

## How to identify a memory leak in NodeJS?
Memory leak happens when expected short-lived objects are attached to long-lived objects.

### Example of memory leak:
```
const maps = new Map();
app.get("/", (req, res) =>{
    maps.set(req.id, req.user.name);
    res.status(200).send("success");
});
```
In the above example, the maps is a global object. This global object lives forever.    
Requests are expected to be short-lived.  
So, this is a memory leak.

## Debugging Memory Leaks
In order to debug a memory leak, we need to know following things:  
1. Where is the memory leaking from?
2. What tools are available using which we can detect and inspect the memory leak.
3. Can these tools be used in production server?

### Tools available for debugging memory leaks
- JavaScript Leaks
  - process.memoryUsage
  - Heap Snapshots
  - Allocation timelines
  - Sampling Heap Profiler
  - V8 Heap Statistics
- Native Leaks
  - Valgrind
  - tcmalloc nad Sampling Heap Profiler
- System Level
  - top, ps commands in Linux or Unix
  - Task Manager in Windows

## JavaScript Leaks

### Using process.memoryUsage for debugging memory leaks
```
setInterval(() => {
  const {rss, heapTotal} = process.memoryUsage();
  console.log(rss, " ", heapTotal);
}, 5000); 
```

In the above code, I have used process.memoryUsage function for getting Resident Set Size
and heapTotal.  
**rss**: Resident Set Size. The amount of RAM the Node process is consuming.  
**heapTotal**: Total space available for JS objects presently. It is the amount of space Garbage Collector
thinks we should require for JS objects.  
**heapUsed**: It is the variable. It shows total space occupied by JS objects presently.  
**external**: Amount of memory that node core allocating for objects that it needs to connect 
between JavaScript and Native site. It is the amount of memory consumed by off-heap data(buffers) used
by Node.

### Heap Snapshot for debugging memory leaks
We can do debug memory using Heap Snapshot with the help of Chrome Dev Tools. Go to the memory tab and
here take a heap snapshot. This snapshot will have all the objects used by JS at the point. Using this
heap snapshots we can find the memory leak.  
It collects everything on the heap and hence the snapshot size is very large.

#### Attaching Chrome Dev Tools to NodeJS
`node --inspect app.js`  
DevTools > Memory>Take Heap Snapshot

#### Production Considerations for Heap Snapshot
- Use heapdump module - Generate dumps on demand, or on SIGUSR2
- Beware of latency spikes.
- The heap snapshot may contain sensitive data. Share this data with care.

### Allocation Timeline
It is similar to the Heap Snapshot, but it takes sequence of snapshots. With allocation timeline, we can
see the memory data at specific time.  
This has high overhead.

### Sampling Heap Profiler
This is very similar to the CPU profiler. It shows the functions that are allocating the memory.  
It keeps track of live sampled objects along with the allocating stacktrace.  
This has low overhead. This tool is built for production.
Caveats:
- Allocations from inline functions get attributed to the calls.
- Some edge cases might not be observable yet.

## Native Leaks
- Non-JavaScript components can leak memory
  - Native addons
  - NodeJS core bits written in C++ (for example)
  - V8 (for example)
- Usually indicated by stable heap, growing RSS
- Tools
  - Isolating native addons
  - Valgrind: useful but not suitable for use in production
  - tcmalloc and sampling heap profiler
    - HEAPPROFILE=heapprof LD_PRELOAD=/path/to/libtcmalloc.so node app.js
    - Use pprof to view profiles

## Useful modules and utilities:
- memory-usage: plots memory usage over time
- inspector: This is the Node built-in module which is JS API for V8 inspector
- heapdump: heap snapshots
- heap-profile: sampling heap profiles
- llnode: Low level memory debugging
- mdb: Low level memory debugging

## Resources:  
[Slides](https://goo.gl/Chdxow)
[Understanding and Debugging Memory Leaks in Your Node.js Applications](https://www.youtube.com/watch?v=hliOMEQRqf8)

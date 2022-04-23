# Debugging in Production

## Production Crisis
- Runtime Performance
- Runtime Crashes
- Memory Leaks

## Runtime Performance
CPU is critical
1. Snapshot what is currently executing:  
    Here, we can't use console.log in production because it will add some performance issues.
    Instead, we can use Linux Perf Events. It's great dynamic tracing framework.  
    Just use the command `perf` to get the perf events.  
    Get stack trace using perf. The number stack traces and stack frames we got are too many.
    It is not possible to figure out CPU performance degrade for each stack trace. The solution
    here is to use `Flame Graph` to visualize the stack traces and stack frames we have collected.
2. Flame Graph Interpretation:
    1. The top edge shows who is running on CPU and how much.
    2. Top-Down shows ancestry.
    3. Widths are proportional to presence in samples.
3. Identify candidate code paths for performance improvements.

## Runtime Crashes
Core dumps is important for debugging the application at runtime crash.  
### Postmortem debugging
When runtime crash happen, we take core dump, load the core dump elsewhere and restart the app. Now,
the app is running and continuing service. On the other hand, engineers will debug the core dump and
implement a fix for it.  
Here, it is important to configure Node to Dump Core on Error.  
`node --abort_on_uncaught_exception app.js`  
When we run app with `abort_on_uncaught_exception` flag, Node will dump the core when the error occurs.  

## Note:
Core Dump gives us Complete Process State.

### Postmortem Methodology

- Where: Inspect stack trace
- Why: Inspect heap and stack variable state  
Use mdb or any equivalent command to inspect the core dump.
Use jsstack or any equivalent command to inspect stack trace.

## Memory Leaks
To inspect memory leak, take a core dump at any point in time. To find memory leak, we need to find objects
that are causing memory leaks.  
To find these objects, we have to use `findjsobjects` command. This will find all JS objects on heap.

### Memory Leak strategy
- Look at objects on heap for suspicious objects
- Take successive core dumps and compare object counts
- Growing object counts are likely leaking
- Inspect object for more context
- Walk reverse references to find root objects

#### Analyze leaked object
- Find the root object of the leaked object
- Find the root cause behind the memory leak

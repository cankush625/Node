# EventLoop in NodeJS
NodeJS uses a pre-allocated set of threads to run the asynchronous tasks called the Thread Pool.
The default number of threads in thread pool is 4. We can increase or decrease the number of threads in thread pool.

# NodeJS EventLoop is not so Single Threaded
Event loop in NodeJS is a central dispatch that routes requests to C++ and results back to JavaScript.
Event loop also manages timer and other things.

# EventLoop in detail
Node event loop is a semi-infinite while loop, calling (polling) on a kernel and blocking on the O/S until some in a
 set of file descriptors (event or callback or FS module) are ready.

# When does Node EventLoop exit?
It exists when it no longer has any events to wait for, at which point the loop must complete and terminate. This is
because the epoll (or any other polling mechanism) will never give an event if there are no events.

## Note:
.unref() marks handles that are being waited on in the loop as "not counting" towards keeping the event loop alive.

# Can we poll for all system activity NodeJS wants to be notified of? Can everything be async?
The answer can be Yes as well as No. There are three kinds of things:
- Pollable File Descriptors: can be directly waited on
    Pollable File descriptors are:  
        - Sockets (net/dgram/http/https/tls/child_process pipes/stdin/stdout/stderr)  
        - Time (timeouts and intervals)  
            &nbsp;&nbsp;&nbsp;&nbsp; timeout resolution is milliseconds, timespec is nanoseconds, but both are rounded up to system clock granularity.  
            &nbsp;&nbsp;&nbsp;&nbsp;Only one timeout at a time can be waited on, but NodeJS keeps all timeouts sorted, and sets the timeout value to the next one.  
        - DNS  
            DNS are sometimes pollable.  
            The system resolver for hostnames does not necessarily use DNS  
        - Signals  
            They are completely async. Uses the self-pipe pattern to write the signal number to the loop.  
        - Child processes  
            They does not use thread pool.  
            Unix signals child process termination with SIGCHLD  
            Pipes between the parent and child are pollable  
        - C++ addons  
            C++ addons are sometimes pollable.  
            Addons should use the UV thread pool or integrate with the loop, but not necessary it is done.
- Time: next timeout can be directly waited on
- Everything else: must happen off loop, and signal back to the loop when done

## Note:
File Descriptors and File System are two different concepts.

Not pollable File Descriptors are:
    - Everything in File System uses uv thread pool(unless they are sync)

## Note:
UV thread pool is shared by:
    - FS
    - DNS (only dns.lookup())
    - crypto
    - http.get/request() (if called with a name, dns.lookup() is used)
    - Any C++ addons that use it

## Note:
How to avoid dns.lookup()?
    - Resolve DNS names yourself using the direct APIs to avoid dns.lookup(), and stay out of the thread pool
    - Increase the size of the UV thread pool using environment variable `UV_THREADPOOL_SIZE`

## Note:
Listening for signals does not "ref" the event loop, which is consistent with signal usage as a "probably won't happen" IPC mechanism.

## References
[Node's Event Loop From the Inside Out by Sam Roberts](https://www.youtube.com/watch?v=P9csgxBgaZ8)

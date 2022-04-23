# Is NodeJS really single threaded?

NodeJS is not truly single threaded. 
NodeJS uses a library called `libuv` for getting the thread pool. This library is written in C language.  
In certain cases like CPU intensive operations or IO intensive operations, NodeJS uses threads.  

Generally, NodeJS uses threading for following things:
1. DNS resolution
2. Async file system read
3. Crypto library - encryption, hashing
4. Compression

When we register callback to do CPU intensive or IO intensive operations, the Event loop brings these functions
to run on main thread. But as these function may take longer time, out app will get blocked. To overcome this
issue NodeJS EventLoop runs these functions on threads. NodeJS event loop offloads the heavy tasks to the worker
pool/ worker threads, NodeJS provides a pointer to the corresponding C++ function in the NodeJS C++ bindings.

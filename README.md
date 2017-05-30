"# sylvester-rest-server" 

For this rest-server to run, you must have node and mongodb installed on your system.
Also ensure environment varibale should be set for node, npm and mongo

To open an instance of mongodb server. 
	> create a folder named "data" in the root directory (sylvester-rest-server folder)
	> Open the terminal in the same directory.
	> Run the command "mongod --dbpath data" (this will start mongodb server instance)
	> Do not close that terminal.
Now our mongodb server is running. 

To run our server:
	> Change to the root directory (sylvester-rest-server folder)
	> Open another terminal.
	> Run command "npm install" (this will install all the required modules) (Note: this will need internet)
	> When all the modules are installed we can start our server.
	> For starting the server run command "node server"

Now the server is ready to listen for the requests.

http://localhost:3000 (for home)


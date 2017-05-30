"# sylvester-rest-server" 

For this rest-server to run, you must have node and mongodb installed on your system.
Also ensure environment varibale should be set for node, npm and mongo.


To open an instance of mongodb server. 

	Step 1. create a folder named "data" in the root directory (sylvester-rest-server folder)

	Step 2. Open the terminal in the same directory.

	Step 3. Run the command "mongod --dbpath data" (this will start mongodb server instance)

	Step 4. Do not close that terminal.

Now our mongodb server is running. 

To run our server:

	Step 1. Change to the root directory (sylvester-rest-server folder)

	Step 2. Open another terminal.

	Step 3. Run command "npm install" (this will install all the required modules) (Note: this will need internet)

	Step 4. When all the modules are installed we can start our server.

	Step 5. For starting the server run command "node server"

Now the server is ready to listen for the requests.

http://localhost:3000 (for home)


# Server backend
Welcome to the backend!

## Getting started
To get started with the backend. Follow the steps below:

### Setup and start the server
1. Clone the repository: `git clone https://github.com/burlingtoncodeacademy-students/g3-react-chat.git`
2. Change to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Run the server: `npm start`

### Making requests from postman
1. Open postman
2. Click import and import [React-chat.postman_collection.json](React-chat.postman_collection.json)![alt text](image.png)
3. For more information please see the body of each requests in postman

### MongoDB cluster
In this project, we use MongoDB Atlas cluster to allow everyone access to the same database. To connect to this database, in your mongoDBCompass, please paste in the following:
-  ```mongodb+srv://admin:QTMICAaRMWkCWHDK@cluster0.fojckkb.mongodb.net/```

_note: This connection is made through an admin user which mean you can create, edit and delete documents and collections. Please only use it for testing requests._

## Resources
- [Postman collection](server\React-chat.postman_collection.json). _Note that the data on the database is changing from time to time when someone else is making requests like update/delete._
- To view the database, please paste this 
```mongodb+srv://admin:QTMICAaRMWkCWHDK@cluster0.fojckkb.mongodb.net/```
 into your mongoDBCompass.
- more information comming soon...
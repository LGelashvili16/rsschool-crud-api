# rsschool-crud-api

## In order to correctly run the app you should do the following:

1. Clone the repository.
2. Run the command `npm install` to install all the dependencies.
3. You can run the app in development mode using `npm run start:dev` command.
4. You can run the app in production mode using `npm run start:prod` command.

### Using the application.

You can use Postman to check the data. Port can be changed from the .env file.

All Users - To get all the users array, send 'GET' request at the 'http://localhost:5000/api/users' endpoint.

Get User - To get a user object, send 'GET' request at the 'http://localhost:5000/api/users/userId' endpoint.

Create User - To create a new user, send 'POST' request at the 'http://localhost:5000/api/users' endpoint.

Update User - To update the user data, send 'PUT' request at the 'http://localhost:5000/api/users/userId' endpoint.

Delete User - To delete a user, send 'DELETE' request at the 'http://localhost:5000/api/users/userId' endpoint.

# mobile-app-user-profile

features:
OTP-based login/signup
profile view and update 
upload a user's photograph from the camera or phone library with a maximum image size of 5MB
note - make sure to create the uploads/ directory in the root of your project to store the uploaded files.

following API endpoints are available:
POST /users/signup - used for OTP-based signup. the request body should contain email, first name and last name fields.
POST /users/login - used for OTP-based login. the request body should contain email field.
GET /users/:userId/profile - retrieves the user's profile. the userId parameter in the URL specifies the user ID.
PUT /users/:userId/profile - updates the user's profile. the userId parameter in the URL specifies the user ID. the request body should contain firstName and lastName fields.
POST /users/:userId/photo - uploads the user's photograph. the userId parameter in the URL specifies the user ID. the photograph file should be sent in the request body with the key photo.

tech-stack:
Node.js, Express, and MongoDB, following the MVC pattern.

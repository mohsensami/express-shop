# My Express.js App

A simple web application built with **Express.js**, **EJS**, **MongoDB**, **bcryptjs**, and **multer**.

## Features

- User authentication with hashed passwords (using `bcryptjs`)  
- File uploads with `multer`  
- Dynamic HTML rendering with `EJS` templating engine  
- Data persistence with `MongoDB`  
- RESTful routing and basic MVC structure  

## Technologies

- [Express.js](https://expressjs.com/)  
- [EJS](https://ejs.co/)  
- [MongoDB](https://www.mongodb.com/)  
- [Mongoose](https://mongoosejs.com/)  
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)  
- [multer](https://github.com/expressjs/multer)  

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    PORT=3000
    SECRET=your_secret_key
    ```

5. Start the app:

    ```bash
    npm start
    ```

    The app should now be running on: [http://localhost:3000](http://localhost:3000)

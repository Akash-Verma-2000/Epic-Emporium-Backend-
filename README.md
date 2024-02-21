# Epic Emporium

Our platform offers secure APIs for customers and vendors, with JWT token authentication and Multer for seamless file uploads. Customers can browse, add to cart, and checkout, while vendors manage products effortlessly. Simplifying e-commerce for all.

## Technologies

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-darkred?style=for-the-badge&logoColor=white)

### Steps to Setup

1. Clone the repository **`git clone <URL>`**
2. Install dependencies **`npm install`**
3. Run the server from the index.js file **`npm start`**

## Dependencies

- **`body-parser ^1.20.2`**: For parsing JSON data from request body.
- **`cors ^2.8.5`**: For handling CORS policy issues.
- **`dotenv ^16.4.1`**: For Enviornmental variables.
- **`express ^4.18.2`**: Framwork for the node.js.
- **`jsonwebtoken ^9.0.2`**: For securing the doubts.
- **`mongoose ^8.1.1`**: ODM tool for MongoDB data-base.
- **`multer ^1.4.5-lts.1`**: For uploading multipart form data.
- **`nodemailer ^6.9.9`**: For sending emails.

## Features

- ### User

  - #### Customer:
    - Customer Registration.
    - Customer Login.
    - Sending OTP for password reset.
    - Verifying the OTP.
    - Reseting the password.
  - #### Customer:
    - Vendor Registration.
    - Vendor Login.
    - Sending OTP for password reset.
    - Verifying the OTP.
    - Reseting the password.

- ### Products

    -  Fetch all products. 
    -  Fetch single product details.
    -  Fetch products by category.
    -  Fetch products of logged in vendor.
    -  Add product.
    -  Delete product.
    -  Update product.

- ### Cart

    -  Add to cart 
    -  Remove from cart
    -  Increase quantity
    -  Decrease quantity
    -  Fetch all cart products

## Project Structure

- **`configurations`** 
    - **`email.config.js`** : This file contains the functions for sending emails.
    - **`mongoose.config.js`** : This file contains the functions for connecting the data-base.
- **`features`**
    - **`cart`**
        - **`cart.controller.js`** : Responsible for sending responses related to cart.
        - **`cart.repository.js`** : Responsible for updating data-base of the cart.
        - **`cart.route.js`** : Route configurations of the cart.
        - **`cart.schema.js`** : Schema model of the cart document in the data-base.
    - **`products`** 
        - **`product.controller.js`** : Responsible for sending responses related to products.
        - **`product.repository.js`** : Responsible for updating data-base of the products.
        - **`product.route.js`** :  Route configurations of the products.
        - **`product.schema.js`** : Schema model of the product document in the data-base.
    - **`user`**
        - **`customer`**
            - **`customer.controller.js`** : Responsible for sending responses related to customer.
            - **`customer.repository.js`** : Responsible for updating data-base of the customer.
            - **`customer.route.js`** : Route configurations of the customer.
            - **`customer.schema.js`** : Schema model of the customer document in the data-base.
        - **`vendor`**
            - **`vendor.controller.js`** : Responsible for sending responses related to vendor.
            - **`vendor.repository.js`** : Responsible for updating data-base of the vendor.
            - **`vendor.route.js`** : Route configurations of the vendor.
            - **`vendor.schema.js`** : Schema model of the vendor document in the data-base.
- **`middlewares`** 
    - **`fileUpload.middleware.js`** : Middleware for uploading multi part form data.
    - **`jwt.middleware.js`** : Middleware for authentication (JWT) 
- **`uploads`** : Contains all the uploaded product photos.
- **`gitignore`** : Files to be ignored during git commit.
- **`index.js`** : Entry point of the project.
- **`package-lock.json`** : Meta information of the dependencies versions.
- **`package.json`** : Meta information of the complete project.

   

## Author

Akash Verma

## Contact me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akash-verma-09aug2000/) [![LeetCode](https://img.shields.io/badge/-LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black)](https://leetcode.com/Akash_Verma2000/) [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:akash.verma217112@gmail.com)
[![Naukari](https://img.shields.io/badge/Naukri.com-0A66C2?style=for-the-badge&logo=Naukri.com&logoColor=white)](https://www.naukri.com/mnjuser/profile)

## License

This project is licensed under the ISC License.

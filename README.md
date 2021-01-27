# SHOPPERS 👚👜👗👖
> Shopper is an implementation of an on-line store in Postgresql, Vue.js,  and Sails.js which is similar to the existing online shopping websites like Amazon and ebay.
Each user can sign-in either as a user(shopper) or an admin. Then based on their roles they will have different access privileges. 

> Key Features:  
User:  Add products to cart, Place an order, Make payment with using Flutterwave, Real time SMS and E-mail notification upon order payment and delivery  
Admin: Manage Inventory (Create, or edit, or delete a product ), Deliver order


## Admin Data
> email: admin@shoppers.com
password: admin_SHOPPERS


## Getting Started

> [UI Templates](#ui-templates) &middot; [Technologies](#technologies-used) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Author](#author)

---

## UI Templates

UI templates for the application can be found here on [https://shoppers-ui.netlify.app](https://shoppers-ui.netlify.app).

---

## Heroku App

Application was deployed to Heroku. Use public URL [http://shoppers-api.herokuapp.com/](http://shoppers-api.herokuapp.com/) with API endpoints.

---

## Technologies Used
[node]: (https://nodejs.org)
    
- [Node.js](https://nodejs.org) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Sails.js](https://sailsjs.com/) - Sails is the most popular MVC framework for Node.js, designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.
---
## Installations

#### Getting started

- You need to have Node and Sails installed on your computer.
- Install [Node](https://nodejs.org).
- Install sails:
    ```shell
    S npm install sails -g
    ```
#### Clone

- clone SHOPPERS API
    ```shell
    $ git clone https://github.com/RIDUMATICS/Shoppers-API
    ```
- clone SHOPPERS UI
    ```shell
    $ git clone https://github.com/RIDUMATICS/Shoppers-UI
    ```
#### Setup (API)

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your sails server
  > run the command below
  ```shell
  $ sails lift
  ```
- Use `http://localhost:1337` as base url for endpoints

#### Setup (UI)

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your sails server
  > run the command below
  ```shell
  $ npm run serve
  ```
- Use `http://localhost:8080` as the base url
## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                           |
| ------ | --------------------------------------- | ------------------------------------|
| GET    | Get all the products [ Authorization: none ]             | `/products`                     |
| GET    | Get a single produte [ Authorization: none ]               | `/products/:productId`                 |
| POST   | Add a new product [Authorization: Admin ]                       | `/products`                     |
| PATCH    | Update the information of a product | `/products/:productId`                 |
| DELETE | Remove a product                    | `/products/:productId`                |
| POST   | Sign-up a new user              | `/auth/signup`                     |
| POST   |  log-in a user              | `/auth/login`                     |
| GET    | Get all orders               | `/orders`                     |
| GET    | Get a single order         | `/orders/:orderId` |
| POST   | Add an order to database.           | `/orders`                    |
| PUT    | Modify an order                         | `/orders/:orderId`                |
| DELETE    | remove an order                      | `/orders/:ordr`                    |

Pagination: Products
Example: http://shoppers-api.herokuapp.com/products?page=1&limit=5

Category: [clothing | bags | shoes | accessories]
Example: http://shoppers-api.herokuapp.com/products?category=clothing

## Author

- [Ridwan Onikoyi](https://github.com/RIDUMATICS) 

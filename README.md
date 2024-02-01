# Stripe-Payment-Gateway-


# Stripe Payment Processing Application
This application demonstrates a simple server built with Node.js and Express for handling payment-related functionalities using the Stripe API.

# Prerequisites
Before running the application, make sure you have the following installed on your machine:

Node.js
npm (Node Package Manager)
Installation
# Clone the repository:

git clone https://github.com/Jitugandhare/Stripe-Payment-Gateway-.git

Navigate to the project directory: cd Stripe-Payment-Gateway

Install dependencies: npm install

# Configuration
Create a .env file SECRET_KEY=your_stripe_secret_key PORT=8080 # Specify the desired port (optional) Replace your_stripe_secret_key with your actual Stripe secret key.
Running the Application
npm run server

# API Endpoints:
POST /api/v1/create_intent: Create a new payment intent. POST /api/v1/capture_intent/:id: Capture a payment intent by ID. POST /api/v1/create_refund/:id: Create a refund for a charge ID. GET /api/v1/get_intents: Retrieve the list of recent payment intents.



# Postman Link to the API

https://www.postman.com/planetary-meadow-590434/workspace/stripe-payment/collection/26068076-981e5e69-c904-4fbd-8c09-cf0c37462323?action=share&creator=26068076
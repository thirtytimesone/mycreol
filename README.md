# Toast Orders Mobile App

A React Native mobile application that integrates with AWS services and the Toast API for restaurant orders and payments.

## Features

- User authentication with AWS Cognito
- Menu browsing with Toast API integration
- Shopping cart functionality
- Order processing and payment handling
- Order history tracking
- Real-time order status updates

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: AWS (Cognito, API Gateway, Lambda, DynamoDB)
- **Payment Processing**: Toast API
- **Navigation**: React Navigation
- **State Management**: React Hooks

## Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- AWS Account with configured services
- Toast API credentials

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Services

Update `src/aws-exports.js` with your AWS configuration:

```javascript
const awsconfig = {
  Auth: {
    region: 'your-aws-region',
    userPoolId: 'your-user-pool-id',
    userPoolWebClientId: 'your-user-pool-web-client-id',
  },
  API: {
    endpoints: [
      {
        name: 'toastAPI',
        endpoint: 'https://your-api-gateway-url',
        region: 'your-aws-region'
      }
    ]
  }
};
```

### 3. Configure Toast API

Update the Toast API credentials in:
- `src/services/ToastAPI.js`
- `src/screens/MenuScreen.js`
- `src/screens/CheckoutScreen.js`

Replace `[restaurant-guid]` and `[access-token]` with your actual Toast API credentials.

### 4. AWS Backend Setup

You'll need to set up the following AWS services:

#### Cognito User Pool
- Create a user pool for authentication
- Configure app client settings
- Note the User Pool ID and App Client ID

#### API Gateway
- Create REST API endpoints for:
  - `POST /orders` - Create new order
  - `GET /orders/user/{userId}` - Get user orders
  - `PUT /orders/{orderId}` - Update order status

#### Lambda Functions
Create Lambda functions for:
- Order processing
- User order retrieval
- Order status updates

#### DynamoDB Tables
- `Orders` table with partition key `id`
- `UserOrders` table with partition key `userId`

### 5. Run the Application

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Project Structure

```
src/
├── screens/
│   ├── HomeScreen.js          # Main landing screen
│   ├── MenuScreen.js          # Menu browsing
│   ├── CartScreen.js          # Shopping cart
│   ├── CheckoutScreen.js      # Order checkout
│   └── OrderHistoryScreen.js  # Order history
├── services/
│   ├── ToastAPI.js           # Toast API integration
│   └── AWSService.js         # AWS services wrapper
└── aws-exports.js            # AWS configuration
```

## Key Components

### ToastAPI Service
Handles all interactions with the Toast POS system:
- Menu retrieval
- Order creation
- Payment processing
- Order status tracking

### AWSService
Manages AWS integrations:
- User authentication (Cognito)
- Order storage (DynamoDB via API Gateway)
- User session management

### Screen Components
- **HomeScreen**: User authentication and navigation
- **MenuScreen**: Display menu items with add-to-cart functionality
- **CartScreen**: Cart management and quantity updates
- **CheckoutScreen**: Customer info, payment processing, and order submission
- **OrderHistoryScreen**: Display past orders with status tracking

## Environment Variables

Create a `.env` file in the root directory:

```
TOAST_API_BASE_URL=https://ws-api.toasttab.com
TOAST_RESTAURANT_GUID=your-restaurant-guid
TOAST_ACCESS_TOKEN=your-access-token
AWS_REGION=your-aws-region
```

## Security Considerations

- Never commit API keys or sensitive credentials
- Use environment variables for configuration
- Implement proper input validation
- Use HTTPS for all API communications
- Follow AWS security best practices

## Development Notes

- The app includes mock data for development when API calls fail
- Toast API credentials need to be obtained from Toast developer portal
- AWS services require proper IAM permissions setup
- Test payment processing in Toast sandbox environment first

## Deployment

For production deployment:
1. Build the app using Expo build service or EAS Build
2. Configure production AWS environment
3. Update API endpoints to production URLs
4. Test all payment flows thoroughly
5. Submit to app stores following their guidelines

## Support

For issues related to:
- Toast API: Check Toast developer documentation
- AWS services: Refer to AWS documentation
- React Native: Check React Native community resources
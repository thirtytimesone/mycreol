import axios from 'axios';

const TOAST_BASE_URL = 'https://ws-api.toasttab.com';
const TOAST_API_VERSION = 'v1';

class ToastAPI {
  constructor(restaurantGuid, accessToken) {
    this.restaurantGuid = restaurantGuid;
    this.accessToken = accessToken;
    this.baseURL = `${TOAST_BASE_URL}/${TOAST_API_VERSION}`;
  }

  // Get menu items
  async getMenu() {
    try {
      const response = await axios.get(
        `${this.baseURL}/menus`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Toast-Restaurant-External-ID': this.restaurantGuid
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  }

  // Create order
  async createOrder(orderData) {
    try {
      const response = await axios.post(
        `${this.baseURL}/orders`,
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Toast-Restaurant-External-ID': this.restaurantGuid,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Process payment
  async processPayment(paymentData) {
    try {
      const response = await axios.post(
        `${this.baseURL}/payments`,
        paymentData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Toast-Restaurant-External-ID': this.restaurantGuid,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  // Get order status
  async getOrderStatus(orderId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Toast-Restaurant-External-ID': this.restaurantGuid
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  }
}

export default ToastAPI;
import { API, Auth } from 'aws-amplify';

class AWSService {
  // User authentication
  static async signUp(username, password, email) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  static async signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  static async signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('No authenticated user:', error);
      return null;
    }
  }

  // API calls to your backend
  static async saveOrder(orderData) {
    try {
      const response = await API.post('toastAPI', '/orders', {
        body: orderData
      });
      return response;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }

  static async getUserOrders(userId) {
    try {
      const response = await API.get('toastAPI', `/orders/user/${userId}`);
      return response;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      const response = await API.put('toastAPI', `/orders/${orderId}`, {
        body: { status }
      });
      return response;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}

export default AWSService;
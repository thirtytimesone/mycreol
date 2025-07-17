import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import ToastAPI from '../services/ToastAPI';
import AWSService from '../services/AWSService';

const CheckoutScreen = ({ route, navigation }) => {
  const { cart, total } = route.params;
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const processOrder = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      // Create order data
      const orderData = {
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        customer: customerInfo,
        total: total,
        timestamp: new Date().toISOString()
      };

      // Initialize Toast API
      const toastAPI = new ToastAPI('[restaurant-guid]', '[access-token]');
      
      // Create order in Toast
      const toastOrder = await toastAPI.createOrder(orderData);
      
      // Process payment
      const paymentData = {
        orderId: toastOrder.id,
        amount: total,
        paymentMethod: {
          type: 'CREDIT_CARD',
          cardNumber: paymentInfo.cardNumber,
          expiryDate: paymentInfo.expiryDate,
          cvv: paymentInfo.cvv,
          cardholderName: paymentInfo.cardholderName
        }
      };
      
      const paymentResult = await toastAPI.processPayment(paymentData);
      
      // Save order to AWS
      const user = await AWSService.getCurrentUser();
      if (user) {
        await AWSService.saveOrder({
          ...orderData,
          userId: user.username,
          toastOrderId: toastOrder.id,
          paymentId: paymentResult.id,
          status: 'CONFIRMED'
        });
      }
      
      Alert.alert(
        'Order Confirmed!', 
        `Your order has been placed successfully. Order ID: ${toastOrder.id}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
      
    } catch (error) {
      console.error('Order processing error:', error);
      Alert.alert('Error', 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      Alert.alert('Error', 'Please fill in all customer information');
      return false;
    }
    
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName) {
      Alert.alert('Error', 'Please fill in all payment information');
      return false;
    }
    
    return true;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cart.map(item => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemText}>
              {item.name} x {item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={customerInfo.name}
          onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={customerInfo.email}
          onChangeText={(text) => setCustomerInfo({...customerInfo, email: text})}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={customerInfo.phone}
          onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
          keyboardType="phone-pad"
        />
      </View>

      {/* Payment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChangeText={(text) => setPaymentInfo({...paymentInfo, cardNumber: text})}
          keyboardType="numeric"
          maxLength={16}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            value={paymentInfo.expiryDate}
            onChangeText={(text) => setPaymentInfo({...paymentInfo, expiryDate: text})}
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChangeText={(text) => setPaymentInfo({...paymentInfo, cvv: text})}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          value={paymentInfo.cardholderName}
          onChangeText={(text) => setPaymentInfo({...paymentInfo, cardholderName: text})}
        />
      </View>

      <TouchableOpacity 
        style={[styles.placeOrderButton, loading && styles.disabledButton]}
        onPress={processOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  placeOrderButton: {
    backgroundColor: '#34C759',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
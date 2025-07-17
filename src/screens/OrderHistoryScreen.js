import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import AWSService from '../services/AWSService';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderHistory();
  }, []);

  const loadOrderHistory = async () => {
    try {
      const user = await AWSService.getCurrentUser();
      if (user) {
        const userOrders = await AWSService.getUserOrders(user.username);
        setOrders(userOrders);
      } else {
        Alert.alert('Error', 'Please sign in to view order history');
      }
    } catch (error) {
      console.error('Error loading order history:', error);
      // Fallback to mock data for development
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return '#34C759';
      case 'PREPARING': return '#FF9500';
      case 'READY': return '#007AFF';
      case 'DELIVERED': return '#34C759';
      case 'CANCELLED': return '#FF3B30';
      default: return '#666';
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.orderDate}>
        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
      
      <View style={styles.itemsList}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.orderItem}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading order history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id?.toString()}
          style={styles.ordersList}
        />
      )}
    </View>
  );
};

// Mock data for development
const mockOrders = [
  {
    id: '12345',
    status: 'DELIVERED',
    timestamp: '2024-01-15T12:30:00Z',
    items: [
      { name: 'Classic Burger', quantity: 1 },
      { name: 'French Fries', quantity: 1 }
    ],
    total: 15.98
  },
  {
    id: '12346',
    status: 'PREPARING',
    timestamp: '2024-01-16T18:45:00Z',
    items: [
      { name: 'Chicken Caesar Salad', quantity: 2 }
    ],
    total: 21.98
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  itemsList: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'right',
  },
});

export default OrderHistoryScreen;
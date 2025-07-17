import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import ToastAPI from '../services/ToastAPI';

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      // Initialize Toast API with your credentials
      const toastAPI = new ToastAPI('[restaurant-guid]', '[access-token]');
      const menu = await toastAPI.getMenu();
      setMenuItems(menu.menuItems || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu');
      // Fallback to mock data for development
      setMenuItems(mockMenuItems);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    Alert.alert('Added to Cart', `${item.name} added to cart`);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price?.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart', { cart })}
        >
          <Text style={styles.cartButtonText}>Cart ({cart.length})</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        style={styles.menuList}
      />
    </View>
  );
};

// Mock data for development
const mockMenuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Beef patty with lettuce, tomato, and cheese',
    price: 12.99
  },
  {
    id: 2,
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine with grilled chicken and caesar dressing',
    price: 10.99
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil',
    price: 14.99
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MenuScreen;
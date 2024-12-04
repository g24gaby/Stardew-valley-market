import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../cartcontext';

export default function MarketScreen() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  var contagem = 1

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://expert-funicular-xqgr9qqj59xfr64-3000.app.github.dev/produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Erro ao buscar produtos. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/compras')}>
        <Ionicons name="cart" size={24} color="black" />
        <Text style={styles.contagem}>{contagem.length}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Produtos Disponíveis</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.nome}</Text>
            <Text style={styles.productPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
            <Text style={styles.productDescription}>{item.descricao}</Text>
            <Button title="Adicionar ao Carrinho" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
  productCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productPrice: { fontSize: 16, color: '#4caf50' },
  productDescription: { fontSize: 14, color: '#666', marginBottom: 8 },
  cartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  cartCount: { marginLeft: 5, fontSize: 16, fontWeight: 'bold', color: 'black' },
});

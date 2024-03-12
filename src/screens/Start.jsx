// Start.js
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import AddTodo from './AddTodo';

const Start = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = (newTodo) => {
    setTodos([...todos, { title: newTodo, id: todos.length + 1 }]);
  };

  const getApi = async () => {
    setIsLoading(true);
    await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        console.log(res.data);
        setTodos(res.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      {todos.length > 0 && (
        <View style={styles.todosContainer}>
          <Button
            title="Add Todo"
            onPress={() => navigation.navigate('AddTodo', { addTodo })}
            style={styles.todosTitle}
          />
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 20,
                }}
                onPress={() =>
                  navigation.navigate('DetailData', {
                    itemTitle: item.body,
                    itemId: item.id,
                    itemUser: item.userId,
                  })
                }
              >
                <Text style={styles.todoItem}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todosContainer: {
    marginTop: 20,
  },
  todosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'lightblue',
    padding: '2%',
    borderRadius: 10,
  },
  todoItem: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});

export default Start;


import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { usePosts } from '../hooks/usePosts';

function Posts() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
}

export default Posts

const styles = StyleSheet.create({
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
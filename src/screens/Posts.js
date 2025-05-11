
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { usePosts } from '../hooks/usePosts';
import { useEffect } from 'react';

function Posts() {
    const { data, isLoading, error } = usePosts();

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text style={{
            color: 'red',
            textAlign: 'center',
            fontSize:20
        }}>Error: {error.message}</Text>;
    }

    // useEffect(() => {
    //     console.log("=== posts data ====", data)
    // }, [data])

    return (
        <FlatList
            data={data.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.postContainer}>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text>{item.price}</Text>
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
        backgroundColor: 'gray',
        marginHorizontal:5,
        marginVertical:10,
        borderRadius:10
    },
    postTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
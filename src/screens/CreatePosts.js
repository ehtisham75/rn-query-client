import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';
import { useCreatePost } from '../hooks/useCreatePost';

function CreatePosts() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { mutate, isPending, isError, isSuccess } = useCreatePost();

  const handleSubmit = () => {
    mutate({ title, body });
    if (isSuccess) {
      setTitle('');
      setBody('');
      return
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 8, padding: 8, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        style={{ marginBottom: 8, padding: 8, borderWidth: 1, height: 100 }}
      />

      {isPending &&
        <View style={styles.loaderBox}>
          <ActivityIndicator size={'small'} color={'red'} />
        </View>
      }

      <Button
        title={isPending ? 'Creating...' : 'Create Post'}
        onPress={handleSubmit}
        disabled={isPending}
      />
    </View>
  );
}

export default CreatePosts

const styles = StyleSheet.create({
  loaderBox: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
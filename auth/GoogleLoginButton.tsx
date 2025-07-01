// GoogleLoginButton.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { auth } from '../helpers/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '<твій_androidClientId>',
    iosClientId: '<твій_iosClientId>',
    expoClientId: '<твій_expoClientId>',
    webClientId: '<твій_webClientId>',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((res) => {
          console.log('Успішно авторизовано', res.user);
        })
        .catch((error) => {
          console.error('Помилка авторизації', error);
        });
    }
  }, [response]);

  return <Button title="Увійти через Google" onPress={() => promptAsync()} />;
}

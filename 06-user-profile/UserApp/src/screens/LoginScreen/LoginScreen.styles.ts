import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 40,
    gap: 5,
  },
  input: {
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 5,
  },
  textError: {
    color: '#c04657',
    fontWeight: 'bold',
    fontSize: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: '#333e48',
    alignItems: 'center',
  },
});
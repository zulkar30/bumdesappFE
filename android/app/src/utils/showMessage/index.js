import {showMessage as showToast} from 'react-native-flash-message';

export const showMessage = ({message, description, type}) => {
  showToast({
    message: message || '',
    description: description || '', // Tambahkan description jika ada
    type: type === 'success' ? 'success' : 'danger',
    backgroundColor: type === 'success' ? '#1ABC9C' : '#D9435E',
  });
};

import Clipboard from '@react-native-clipboard/clipboard';

export const copyToClipboard = (value: string): void => {
  Clipboard.setString(value);
};

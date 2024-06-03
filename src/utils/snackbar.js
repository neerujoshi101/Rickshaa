import Snackbar from 'react-native-snackbar';
import { Colors } from './AppConstant';
export default function Snack(msg) {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.black,
  });
}

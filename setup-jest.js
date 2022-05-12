// AsyncStorage
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// navigation
import 'react-native-gesture-handler/jestSetup';

// native animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// jest.mock('NativeAnimatedHelp');

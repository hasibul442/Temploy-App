# Redux Authentication Setup

## Overview
This app uses Redux for managing authentication state with public and private routes.

## Route Structure

### Public Routes (No authentication required)
- Welcome Screen
- Login Screen
- Signup Screen
- Forget Password Screen
- OTP Screen

### Private Routes (Authentication required)
- Home
- Orders
- Messages
- Offers
- Menu
- Profile

## How It Works

1. **On App Launch:**
   - Shows loading screen
   - Checks if token exists in AsyncStorage
   - If token exists → Shows Home (private routes)
   - If no token → Shows Welcome/Login (public routes)

2. **After Login:**
   - Token is saved via Redux `loginUser` action
   - `isAuthenticated` becomes `true`
   - App automatically redirects to Home

3. **After Logout:**
   - Token is removed via Redux `logoutUser` action
   - `isAuthenticated` becomes `false`
   - App automatically shows Login screen

## Usage

### To Logout (Add to Profile or Menu Screen)

```jsx
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/authSlice";

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};
```

Or use the pre-built `LogoutButton` component:

```jsx
import LogoutButton from "../../components/LogoutButton";

const ProfileScreen = () => {
  return (
    <View>
      <LogoutButton />
    </View>
  );
};
```

### To Access User Info

```jsx
import { useSelector } from "react-redux";

const MyComponent = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <View>
      <Text>{user?.name}</Text>
    </View>
  );
};
```

## Files Created/Modified

- `src/slices/authSlice.js` - Redux auth slice with actions
- `src/store/store.js` - Redux store configuration
- `src/components/LoadingScreen.jsx` - Loading screen while checking auth
- `src/components/LogoutButton.jsx` - Reusable logout button
- `App.jsx` - Wrapped with Redux Provider
- `src/components/navigation/Navigatior.jsx` - Conditional rendering based on auth state
- `src/app/Auth/LoginScreen.jsx` - Updated to use Redux for login

import { createSlice } from '@reduxjs/toolkit';

const initialState = (() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user?.user?.id;
    const storedStatus = localStorage.getItem(`subscribed_${userID}`);
    return storedStatus ? JSON.parse(storedStatus) : false;
  })();
  
  const subscribedSlice = createSlice({
    name: 'subscribed',
    initialState,
    reducers: {
      setSubscribed: (state, action) => {
        return action.payload;
      },
    },
  });
  
  export const { setSubscribed } = subscribedSlice.actions;
  
  export default subscribedSlice.reducer;
  

import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {userSlice} from './slices/userSlice';


export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;
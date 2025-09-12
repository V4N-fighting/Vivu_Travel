// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromApi, updateUserToApi } from '../../service/userService';
import { User } from '../../service/authService';



interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  data: null,
  status: 'idle',
};

// Thunk: load user
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id: string) => {
    const user = await getUserFromApi(id);
    return user;
  }
);

// Thunk: update user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: User) => {
    const updatedUser = await updateUserToApi(user);
    return updatedUser;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        alert("Lưu thay đổi thành công");
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

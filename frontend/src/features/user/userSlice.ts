// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromApi, updateUserToApi } from '../../service/userService';
import { User } from '../../service/authService';

interface UserState {
  data: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Khởi tạo state từ localStorage nếu có
const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  data: getInitialUser(),
  status: 'idle',
};

// Thunk: load user từ backend API
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id: string) => {
    const user = await getUserFromApi(id);
    return user;
  }
);

// Thunk: update user qua backend API
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
      state.status = 'idle';
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.status = 'succeeded';
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
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = { ...state.data, ...action.payload };
        alert("Lưu thay đổi thành công");
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;

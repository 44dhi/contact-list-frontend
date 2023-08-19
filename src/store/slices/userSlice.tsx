import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../utils/interfaces"

type Iprops = {
  user: User | null,
  loading: boolean
}

const initialState: Iprops = {
  user: null,
  loading: true
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUserForRedux: (state, action) => {
      state.user = action.payload;
      state.loading = false;  
    }
  }
})

export const {getUserForRedux} = userSlice.actions
export default userSlice.reducer
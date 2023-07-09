import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../utils/interfaces"

type Iprops = {
  user: User | null
}

const initialState: Iprops = {
  user: null
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    getUserForRedux: (state, action) => {
      state.user = action.payload
    }
  }
})

export const {getUserForRedux} = userSlice.actions
export default userSlice.reducer
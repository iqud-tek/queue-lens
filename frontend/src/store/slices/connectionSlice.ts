import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardTblItem {
  id: number | string;
  aliasName: string;
  host: string;
  port: number;
  database: string;
  status: "active" | "inactive";
}

interface connectionSliceRootState {
  selectedConnection: DashboardTblItem | null;
}

const initialState: connectionSliceRootState = {
  selectedConnection: null,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    addSelectedConnection: (state, action: PayloadAction<DashboardTblItem>) => {
      state.selectedConnection = action.payload;
    },
    removeSelectedConnection: (state) => {
      state.selectedConnection = null;
    },
  },
});

export const { addSelectedConnection, removeSelectedConnection } =
  connectionSlice.actions;
export const selectAllConnectionStates = (state: connectionSliceRootState) =>
  state.selectedConnection;
export default connectionSlice.reducer;

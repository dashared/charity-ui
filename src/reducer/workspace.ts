import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WorkspaceState = {
  rightPanelCollapsed: boolean;
  width: number;
};

const initialState: WorkspaceState = {
  rightPanelCollapsed: true,
  width: 360,
};

const workspace = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    toggleRightPanel(state): void {
      state.rightPanelCollapsed = !state.rightPanelCollapsed;
    },
    openRightPanel(state): void {
      state.rightPanelCollapsed = false;
    },
    closeRightPanel(state): void {
      state.rightPanelCollapsed = true;
    },
    setRightPanelCollapsed(state, action: PayloadAction<boolean>): void {
      state.rightPanelCollapsed = action.payload;
    },
  },
});

export const {
  toggleRightPanel,
  setRightPanelCollapsed,
  closeRightPanel,
  openRightPanel,
} = workspace.actions;

export default workspace.reducer;

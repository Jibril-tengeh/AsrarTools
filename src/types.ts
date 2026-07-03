export type ToolStatus = 'active' | 'maintenance' | 'disabled';

export interface AsrarTool {
  id: string;
  nameKey: string;
  descriptionKey: string;
  iconName: string;
  status: ToolStatus;
}

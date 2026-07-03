export type ToolStatus = 'active' | 'maintenance' | 'disabled';

export interface AsrarTool {
  id: string;
  categoryId: string;
  nameKey: string;
  descriptionKey: string;
  iconName: string;
  status: ToolStatus;
}

export interface ToolCategory {
  id: string;
  nameKey: string;
  descriptionKey: string;
  iconName: string;
}

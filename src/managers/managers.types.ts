export interface ManagersModelAttrs {
  fio: string;
  role: string;
  efficiency?: number;
  attachedClientsCount: number;
}

export interface CustomerToManagerModelAttrs {
  cityId: number;
  comment: string;
}

export interface NodeDetails {
  id: number;
  hostId: number;
  hostName: string;
  currentStatus: string;
  upgradeStatus: string;
  upgradeStartTime: string;
  upgradeEndTime: string;
  oldKernelVersion: string;
  newKernelVersion: string;
  skipUpgrade: number;
}

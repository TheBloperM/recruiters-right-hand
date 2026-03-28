export interface NavigationStep {
  label: string;
  path: string;
  isExport?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDisabled: (...args: any[]) => boolean;
}

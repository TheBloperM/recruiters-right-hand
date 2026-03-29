export interface NavigationStep {
  label: string;
  path: string | string[];
  isExport?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDisabled: (...args: any[]) => boolean;
}

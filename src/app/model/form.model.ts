export interface FormModel {
  label: string;
  controlName: string;
  type: string;
  require: boolean;
  value: any;
  options?: { key: string; value: string }[];
}

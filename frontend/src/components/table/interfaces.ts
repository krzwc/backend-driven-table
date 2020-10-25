export interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

export interface TableData extends Data {
  key: number;
}

export interface Columns {
  title: string;
  dataIndex: string;
  key: string;
}

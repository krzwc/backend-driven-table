import { Data, TableData, Columns } from './interfaces';

export const filterVisibleColumns = (columns: Columns[], visible: string[]): Columns[] =>
  columns.filter(column => visible.includes(column.dataIndex));

export const transformResponseBody = (data: Data[]): TableData[] =>
  data.map(dataItem => ({ ...dataItem, key: dataItem.id }));

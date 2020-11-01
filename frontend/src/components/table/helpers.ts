import { Columns } from './interfaces';

export const filterVisibleColumns = (columns: Columns[], visible: string[]): Columns[] =>
    columns.filter((column) => visible.includes(column.dataIndex));

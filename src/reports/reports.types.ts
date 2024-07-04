import { AcceptedData } from 'export-to-csv/output/lib/types';

export type TData = { [k: string]: AcceptedData; [k: number]: AcceptedData }[];

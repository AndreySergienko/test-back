import { Injectable } from '@nestjs/common';
import { mkConfig, generateCsv, asString } from 'export-to-csv';
import { writeFile } from 'fs';
import { TData } from './reports.types';

const csvConfig = mkConfig({ useKeysAsHeaders: true });

@Injectable()
export class ReportsService {
  getDocuments(data: TData) {
    const csv = generateCsv(csvConfig)(data);
    const filename = `${csvConfig.filename}.csv`;
    const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

    writeFile(filename, csvBuffer, (err) => {
      if (err) throw err;
      console.log('file saved: ', filename);
    });
  }
}

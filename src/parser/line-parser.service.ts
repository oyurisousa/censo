import { Injectable } from '@nestjs/common';

@Injectable()
export class LineParserService {
  parseLine(line: string): string[] {
    return line.split('|');
  }
}

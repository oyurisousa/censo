// upload.service.ts
import { Injectable } from '@nestjs/common';
import { LineParserService } from '../parser/line-parser.service';
import * as iconv from 'iconv-lite';
import { Registro00 } from '../registros/registro-00.model';

@Injectable()
export class UploadService {
  constructor(
    private readonly parser: LineParserService,
  ) {}

  processFile(file: Express.Multer.File) {
    const conteudo = iconv.decode(file.buffer, 'latin1');
    const lines = conteudo
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      const tipo = line.slice(0, 2);
      const campos = this.parser.parseLine(line);
      if (tipo === '00') {
        const registro = new Registro00(campos);
        const erros = registro.validar();
        console.log(`Erros no registro 00:`, erros);
      }
    }

    return { status: 'ok' };
  }
}
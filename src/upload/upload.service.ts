import { Injectable, StreamableFile } from '@nestjs/common';
import { LineParserService } from '../parser/line-parser.service';
import * as iconv from 'iconv-lite';
import { Registro00 } from '../registros/registro-00.model';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import { Registro10 } from 'src/registros/registro-10.model';

@Injectable()
export class UploadService {
  constructor(private readonly parser: LineParserService) {}

  async processFile(file: Express.Multer.File) {
    const conteudo = iconv.decode(file.buffer, 'latin1');
    const lines = conteudo
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const errosPorTipo: Record<string, any[]> = {};

    for (const [i, line] of lines.entries()) {
      const tipo = line.slice(0, 2);
      const campos = this.parser.parseLine(line);

      // Exemplo para registro 00, ajuste para outros tipos conforme necessário
      if (tipo === '00') {
        const esperado = 56;
        if (campos.length !== esperado) {
          errosPorTipo[tipo] = errosPorTipo[tipo] || [];
          errosPorTipo[tipo].push({
            linha: i + 1,
            campo: 'Todos',
            regra: `Quantidade de campos deve ser ${esperado}`,
            mensagem: `Foram encontrados ${campos.length} campos.`,
          });
          continue;
        }
        const registro = new Registro00(campos);
        const erros = registro.validar();
        for (const erro of erros) {
          errosPorTipo[tipo] = errosPorTipo[tipo] || [];
          errosPorTipo[tipo].push({
            linha: i + 1,
            campo: erro.campo,
            regra: erro.regra,
            mensagem: erro.mensagem,
          });
        }
      }
      if (tipo === '10') {
        const esperado = 79;
        if (campos.length !== esperado) {
          errosPorTipo[tipo] = errosPorTipo[tipo] || [];
          errosPorTipo[tipo].push({
            linha: i + 1,
            campo: 'Todos',
            regra: `Quantidade de campos deve ser ${esperado}`,
            mensagem: `Foram encontrados ${campos.length} campos.`,
          });
          continue;
        }
        const registro = new Registro10(campos);
        const erros = registro.validar();
        for (const erro of erros) {
          errosPorTipo[tipo] = errosPorTipo[tipo] || [];
          errosPorTipo[tipo].push({
            linha: i + 1,
            campo: erro.campo,
            regra: erro.regra,
            mensagem: erro.mensagem,
          });
        }
      }
      // Adicione outros tipos de registro aqui
    }

    if (Object.keys(errosPorTipo).length === 0) {
      return { status: 'ok' };
    }

    // Geração do PDF
    const doc = new PDFDocument({ margin: 30 });
    doc.fontSize(16).text('Relatório de Inconsistências', { align: 'center' });
    doc.moveDown();

    for (const tipo in errosPorTipo) {
      doc.fontSize(14).text(`Registro ${tipo}`, { underline: true });
      doc.moveDown(0.5);

      // Cabeçalho da tabela
      const tableTop = doc.y;
      const col1 = 30,
        col2 = 80,
        col3 = 200,
        col4 = 400;
      doc.fontSize(10).text('Linha', col1, tableTop);
      doc.text('Campo', col2, tableTop);
      doc.text('Regra', col3, tableTop);
      doc.text('Mensagem de erro', col4, tableTop);

      // Linha abaixo do cabeçalho
      doc
        .moveTo(col1, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      let y = tableTop + 20;
      for (const erro of errosPorTipo[tipo]) {
        // Calcula a altura máxima ocupada por cada célula da linha
        const linhaHeight = Math.max(
          doc.heightOfString(String(erro.linha), { width: col2 - col1 - 5 }),
          doc.heightOfString(String(erro.campo), { width: col3 - col2 - 5 }),
          doc.heightOfString(String(erro.regra), { width: col4 - col3 - 5 }),
          doc.heightOfString(String(erro.mensagem), { width: 550 - col4 - 10 }),
        );

        doc.text(String(erro.linha), col1, y, { width: col2 - col1 - 5 });
        doc.text(String(erro.campo), col2, y, { width: col3 - col2 - 5 });
        doc.text(String(erro.regra), col3, y, { width: col4 - col3 - 5 });
        doc.text(String(erro.mensagem), col4, y, { width: 550 - col4 - 10 });

        y += linhaHeight + 5;

        if (y > doc.page.height - 50) {
          doc.addPage();
          y = 40;
        }
      }
      doc.moveDown(2);
    }

    doc.end();

    const stream = new PassThrough();
    doc.pipe(stream);

    return new StreamableFile(stream, {
      type: 'application/pdf',
      disposition: 'attachment; filename="inconsistencias.pdf"',
    });
  }
}

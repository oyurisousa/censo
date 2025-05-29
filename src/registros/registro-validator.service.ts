import { Injectable } from '@nestjs/common';
import { Registro00 } from './registro-00.model';
import { VALIDATION_METADATA_KEY } from './decorators';

@Injectable()
export class RegistroValidatorService {
  validarRegistro00(campos: string[]): string[] {
    const entidade = new Registro00(campos);
    const erros: string[] = [];

    const metadados = Reflect.getMetadata(VALIDATION_METADATA_KEY, entidade) || [];

    for (const meta of metadados) {
      const valor = entidade[meta.propertyKey];

      if (
        meta.obrigatorio &&
        (!valor || valor.trim() === '') &&
        meta.obrigatorioCondicional?.(entidade)
      ) {
        erros.push(`${meta.nome} é obrigatório`);
      }

      if (
        meta.tamanhoFixo &&
        valor.length !== meta.tamanhoFixo &&
        meta.obrigatorioCondicional?.(entidade)
      ) {
        erros.push(
          `${meta.nome} deve ter exatamente ${meta.tamanhoFixo} caracteres`,
        );
      }

      if (meta.tamanhoMax && valor.length > meta.tamanhoMax) {
        erros.push(
          `${meta.nome} excede o tamanho máximo de ${meta.tamanhoMax}`,
        );
      }

      if (
        meta.regex &&
        !meta.regex.test(valor) &&
        (meta.obrigatorioCondicional?.(entidade) ? true : valor.trim() !== '')
      ) {
        erros.push(`${meta.nome} possui formato inválido`);
      }
    }

    return erros;
  }
}

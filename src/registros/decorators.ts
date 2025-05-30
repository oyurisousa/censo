// decorators.ts
import 'reflect-metadata';

export const VALIDATION_METADATA_KEY = 'validation:rules';

export interface ValidationRule {
  validate(value: any, obj: any): string | null;
}

export function Obrigatorio(message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    rules.push({
      validate(value: any) {
        if (!value || value.trim() === '') {
          return message || 'Campo obrigatório';
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function TamanhoFixo(tamanho: number, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (value && value.length !== tamanho) {
          return message || `Deve ter exatamente ${tamanho} caracteres`;
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function TamanhoMaximo(tamanho: number, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (value && value.length > tamanho) {
          return message || `Excede o tamanho máximo de ${tamanho} caracteres`;
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function RegexPadrao(regex: RegExp, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (value && !regex.test(value)) {
          return message || 'Formato inválido';
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function ObrigatorioCondicional(condition: (obj: any) => boolean, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any, obj: any) {
        if (condition(obj) && (!value || value.trim() === '')) {
          return message || 'Campo obrigatório nesta condição';
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function ValoresPermitidos(valores: string[], message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (value && !valores.includes(value)) {
          return message || `Valor não permitido. Valores permitidos: ${valores.join(', ')}`;
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Decorator para validação de data
// decorators.ts
export function DataValida(format: string, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (!value) return null;
        
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = regex.exec(value);
        
        if (!match) {
          return message || 'Formato de data inválido';
        }
        
        const [_, day, month, year] = match; // Agora seguro pois verificamos match
        
        // Verifica se os valores são números válidos
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        // Validações adicionais da data
        if (monthNum < 1 || monthNum > 12) {
          return message || 'Mês inválido';
        }
        
        // Verifica dias do mês
        const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
        if (dayNum < 1 || dayNum > daysInMonth) {
          return message || 'Dia inválido para o mês';
        }
        
        const date = new Date(yearNum, monthNum - 1, dayNum);
        
        // Verifica se a data é válida
        if (
          date.getFullYear() !== yearNum ||
          date.getMonth() + 1 !== monthNum ||
          date.getDate() !== dayNum
        ) {
          return message || 'Data inválida';
        }
        
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Decorator para CEP válido (simplificado - implementação real precisaria de serviço)
export function CEPValido(message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any, obj: any) {
        if (!value) return null;
        
        // Implementação real precisaria consultar serviço dos Correios
        // Esta é apenas uma validação básica de formato
        if (!/^[0-9]{8}$/.test(value)) {
          return message || 'CEP inválido';
        }
        
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Decorator para município válido (simplificado)
export function MunicipioValido(message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (!value) return null;
        
        // Implementação real precisaria consultar tabela de municípios
        // Esta é apenas uma validação básica de formato
        if (!/^[0-9]{7}$/.test(value)) {
          return message || 'Código de município inválido';
        }
        
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Decorator para distrito válido (simplificado)
export function DistritoValido(municipioProperty: string, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any, obj: any) {
        if (!value) return null;
        
        const municipio = obj[municipioProperty];
        // Implementação real precisaria verificar se o distrito pertence ao município
        // Esta é apenas uma validação básica
        
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Decorator para mínimo de caracteres (ignorando espaços)
export function MinimoCaracteres(min: number, message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (!value) return null;
        
        const count = value.replace(/\s/g, '').length;
        if (count < min) {
          return message || `Deve ter no mínimo ${min} caracteres (excluindo espaços)`;
        }
        
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

export function TelefoneValido(
  dddProperty: string,
  message?: string,
  outroTelefoneProperty?: string
) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any, obj: any) {
        if (!value) return null;
        
        // Validação básica
        if (!/^[0-9]{8,9}$/.test(value)) {
          return message || 'Telefone deve ter 8 ou 9 dígitos';
        }

        // Validação do DDD relacionado
        const ddd = obj[dddProperty];
        if (value && !ddd) {
          return 'DDD é obrigatório quando há telefone';
        }

        // Validação do formato
        if (value.length === 9 && !value.startsWith('9')) {
          return 'Telefone de 9 dígitos deve começar com 9';
        }

        if (value.length === 8 && value.startsWith('9')) {
          return 'Telefone de 8 dígitos não pode começar com 9';
        }

        // Verifica se é repetição
        if (new Set(value.split('')).size === 1) {
          return 'Telefone não pode ter todos dígitos iguais';
        }

        // Verifica se é igual ao outro telefone
        if (outroTelefoneProperty && value === obj[outroTelefoneProperty]) {
          return 'Os telefones não podem ser iguais';
        }

        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}

// Validação de e-mail
export function EmailValido(message?: string) {
  return function (target: any, propertyKey: string) {
    const rules: ValidationRule[] = Reflect.getMetadata(VALIDATION_METADATA_KEY, target, propertyKey) || [];
    
    rules.push({
      validate(value: any) {
        if (!value) return null;
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          return message || 'E-mail inválido';
        }
        return null;
      }
    });
    
    Reflect.defineMetadata(VALIDATION_METADATA_KEY, rules, target, propertyKey);
  };
}
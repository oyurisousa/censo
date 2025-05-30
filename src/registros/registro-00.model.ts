// registro-00.model.ts
import { 
  Obrigatorio, 
  TamanhoFixo, 
  RegexPadrao, 
  TamanhoMaximo,
  ObrigatorioCondicional,
  ValoresPermitidos,
  DataValida,
  CEPValido,
  MunicipioValido,
  DistritoValido,
  MinimoCaracteres,
  VALIDATION_METADATA_KEY,
  TelefoneValido,
  EmailValido
} from './decorators';

export class Registro00 {
  // Campo 1: Tipo de registro
  @Obrigatorio('Tipo de registro é obrigatório')
  @TamanhoFixo(2, 'Tipo de registro deve ter exatamente 2 caracteres')
  @ValoresPermitidos(['00'], 'O registro declarado não faz parte do escopo do educacenso')
  tipoRegistro: string;

  // Campo 2: Código de escola - Inep
  @Obrigatorio('Código de escola é obrigatório')
  @TamanhoFixo(8, 'Código de escola deve ter exatamente 8 caracteres')
  @RegexPadrao(/^[0-9]{8}$/, 'Apenas números podem ser informados')
  // @CodigoEscolaValido() - Implementar validação específica com serviço
  codigoEscola: string;

  // Campo 3: Situação de funcionamento
  @Obrigatorio('Situação de funcionamento é obrigatória')
  @TamanhoFixo(1, 'Situação de funcionamento deve ter exatamente 1 caractere')
  @ValoresPermitidos(['1', '2', '3'], 'Valor não permitido para situação de funcionamento')
  situacaoFuncionamento: string;

  // Campo 4: Data de início do ano letivo
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Data de início é obrigatória quando escola está em atividade'
  )
  @TamanhoFixo(10, 'Data de início deve ter exatamente 10 caracteres')
  @DataValida('DD/MM/YYYY', 'Formato de data inválido (DD/MM/YYYY)')
  // @PeriodoLetivoValido() - Implementar validação específica com data de referência
  dataInicio: string;

  // Campo 5: Data de término do ano letivo
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Data de término é obrigatória quando escola está em atividade'
  )
  @TamanhoFixo(10, 'Data de término deve ter exatamente 10 caracteres')
  @DataValida('DD/MM/YYYY', 'Formato de data inválido (DD/MM/YYYY)')
  // @PeriodoLetivoValido() - Implementar validação específica com data de referência
  dataFim: string;

  // Campo 6: Nome da escola
  @Obrigatorio('Nome da escola é obrigatório')
  @TamanhoMaximo(100, 'Nome da escola não pode ter mais de 100 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– ]+$/i, 'Caracteres não permitidos no nome da escola')
  @MinimoCaracteres(4, 'Nome da escola deve ter no mínimo 4 caracteres (excluindo espaços)')
  nomeEscola: string;

  // Campo 7: CEP
  @Obrigatorio('CEP é obrigatório')
  @TamanhoFixo(8, 'CEP deve ter exatamente 8 caracteres')
  @RegexPadrao(/^[0-9]{8}$/, 'Apenas números podem ser informados no CEP')
  @CEPValido('CEP inválido ou não encontrado na base dos Correios')
  cep: string;

  // Campo 8: Município
  @Obrigatorio('Município é obrigatório')
  @TamanhoFixo(7, 'Código do município deve ter exatamente 7 caracteres')
  @RegexPadrao(/^[0-9]{7}$/, 'Apenas números podem ser informados no código do município')
  @MunicipioValido('Código do município inválido')
  municipio: string;

  // Campo 9: Distrito
  @Obrigatorio('Distrito é obrigatório')
  @TamanhoMaximo(2, 'Código do distrito não pode ter mais de 2 caracteres')
  @DistritoValido('municipio', 'Código do distrito inválido ou não corresponde ao município informado')
  distrito: string;

  // Campo 10: Endereço
  @Obrigatorio('Endereço é obrigatório')
  @TamanhoMaximo(100, 'Endereço não pode ter mais de 100 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]+$/i, 'Caracteres não permitidos no endereço')
  endereco: string;


  // Campo 11: Número
  @TamanhoMaximo(10, 'Número não pode ter mais de 10 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no número')
  numero: string;

  // Campo 12: Complemento
  @TamanhoMaximo(20, 'Complemento não pode ter mais de 20 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no complemento')
  complemento: string;

  // Campo 13: Bairro
  @TamanhoMaximo(50, 'Bairro não pode ter mais de 50 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no bairro')
  bairro: string;

  // Campo 14: DDD
  @ObrigatorioCondicional(
    (e: Registro00) => !!e.telefone || !!e.outroTelefone,
    'DDD é obrigatório quando há telefone cadastrado'
  )
  @TamanhoFixo(2, 'DDD deve ter exatamente 2 caracteres')
  @RegexPadrao(/^[0-9]{2}$/, 'DDD deve conter apenas números')
  // @DDDValido('municipio') - Implementar validação contra tabela de DDD
  ddd: string;

  // Campo 15: Telefone
  @TelefoneValido('ddd', 'Telefone inválido')
  telefone: string;

  // Campo 16: Outro telefone
  @TelefoneValido('ddd', 'Outro telefone inválido', 'telefone')
  outroTelefone: string;

  // Campo 17: E-mail
  @TamanhoMaximo(100, 'E-mail não pode ter mais de 100 caracteres')
  @EmailValido('E-mail inválido')
  email: string;

  // Campo 18: Órgão regional
  @TamanhoFixo(5, 'Código do órgão deve ter 5 caracteres')
  // @OrgaoRegionalValido('municipio') - Implementar validação contra tabela
  orgaoRegional: string;

  // Campo 19: Localização/Zona
  @Obrigatorio('Localização/Zona é obrigatória')
  @TamanhoFixo(1, 'Localização deve ter 1 caractere')
  @ValoresPermitidos(['1', '2'], 'Zona inválida (1-Urbana, 2-Rural)')
  localizacaoZona: string;

  // Campo 20: Localização diferenciada
  @Obrigatorio('Localização diferenciada é obrigatória')
  @TamanhoFixo(1, 'Localização diferenciada deve ter 1 caractere')
  @ValoresPermitidos(['1', '2', '3', '7', '8'], 'Valor inválido para localização diferenciada')
  localizacaoDiferenciada: string;

  // Campo 21: Dependência administrativa
  @Obrigatorio('Dependência administrativa é obrigatória')
  @TamanhoFixo(1, 'Dependência administrativa deve ter 1 caractere')
  @ValoresPermitidos(['1', '2', '3', '4'], 'Valor inválido para dependência administrativa')
  dependenciaAdministrativa: string;

  // Campo 22: Secretaria de Educação/Ministério da Educação
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaEducacao: string;

  // Campo 23: Secretaria de Segurança Pública/Forças Armadas/Militar
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaSeguranca: string;

  // Campo 24: Secretaria da Saúde/Ministério da Saúde
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaSaude: string;

  // Campo 25: Outro órgão da administração pública
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  outroOrgaoPublico: string;

  // Campo 26: Empresa/grupos empresariais (privada)
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraEmpresa: string;

  // Campo 27: Sindicatos/associações/cooperativas (privada)
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSindicatos: string;

  // Campo 28: ONG (privada)
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraOng: string;

  // Campo 29: Instituição sem fins lucrativos (privada)
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSemFinsLucrativos: string;

  // Campo 30: Sistema S (privada)
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSistemaS: string;

  constructor(campos: string[]) {
    this.tipoRegistro = campos[0]?.trim() ?? '';
    this.codigoEscola = campos[1]?.trim() ?? '';
    this.situacaoFuncionamento = campos[2]?.trim() ?? '';
    this.dataInicio = campos[3]?.trim() ?? '';
    this.dataFim = campos[4]?.trim() ?? '';
    this.nomeEscola = campos[5]?.trim() ?? '';
    this.cep = campos[6]?.trim() ?? '';
    this.municipio = campos[7]?.trim() ?? '';
    this.distrito = campos[8]?.trim() ?? '';
    this.endereco = campos[9]?.trim() ?? '';
     this.numero = campos[10]?.trim() ?? '';
    this.complemento = campos[11]?.trim() ?? '';
    this.bairro = campos[12]?.trim() ?? '';
    this.ddd = campos[13]?.trim() ?? '';
    this.telefone = campos[14]?.trim() ?? '';
    this.outroTelefone = campos[15]?.trim() ?? '';
    this.email = campos[16]?.trim() ?? '';
    this.orgaoRegional = campos[17]?.trim() ?? '';
    this.localizacaoZona = campos[18]?.trim() ?? '';
    this.localizacaoDiferenciada = campos[19]?.trim() ?? '';
    this.dependenciaAdministrativa = campos[20]?.trim() ?? '';
    this.secretariaEducacao = campos[21]?.trim() ?? '';
    this.secretariaSeguranca = campos[22]?.trim() ?? '';
    this.secretariaSaude = campos[23]?.trim() ?? '';
    this.outroOrgaoPublico = campos[24]?.trim() ?? '';
    this.mantenedoraEmpresa = campos[25]?.trim() ?? '';
    this.mantenedoraSindicatos = campos[26]?.trim() ?? '';
    this.mantenedoraOng = campos[27]?.trim() ?? '';
    this.mantenedoraSemFinsLucrativos = campos[28]?.trim() ?? '';
    this.mantenedoraSistemaS = campos[29]?.trim() ?? '';
  }

  validar(): string[] {
    const erros: string[] = [];
    const propriedades = Object.keys(this) as (keyof this)[];

    for (const propriedade of propriedades) {
      const rules = Reflect.getMetadata(VALIDATION_METADATA_KEY, this, propriedade as string) || [];
      
      for (const rule of rules) {
        const erro = rule.validate(this[propriedade], this);
        if (erro) {
          erros.push(`${String(propriedade)}: ${erro}`);
        }
      }
    }

    return erros;
  }
}
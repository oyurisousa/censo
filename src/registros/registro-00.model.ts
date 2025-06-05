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
  EmailValido,
  NOME_CAMPO_METADATA_KEY,
  NomeCampo
} from './decorators';

export class Registro00 {
  // Campo 1: Tipo de registro
  @NomeCampo('001 - Tipo de registro')
  @Obrigatorio('Tipo de registro é obrigatório')
  @TamanhoFixo(2, 'Tipo de registro deve ter exatamente 2 caracteres')
  @ValoresPermitidos(['00'], 'O registro declarado não faz parte do escopo do educacenso')
  tipoRegistro: string;

  // Campo 2: Código de escola - Inep
  @NomeCampo('002 - Código de escola')
  @Obrigatorio('Código de escola é obrigatório')
  @TamanhoFixo(8, 'Código de escola deve ter exatamente 8 caracteres')
  @RegexPadrao(/^[0-9]{8}$/, 'Apenas números podem ser informados')
  codigoEscola: string;

  // Campo 3: Situação de funcionamento
  @NomeCampo('003 - Situação de funcionamento')
  @Obrigatorio('')
  @TamanhoFixo(1, 'Situação de funcionamento deve ter exatamente 1 caractere')
  @ValoresPermitidos(['1', '2', '3'], 'Valor não permitido para situação de funcionamento')
  situacaoFuncionamento: string;

  // Campo 4: Data de início do ano letivo
  @NomeCampo('004 - Data de início do ano letivo')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Data de início é obrigatória quando escola está em atividade'
  )
  @TamanhoFixo(10, 'Data de início deve ter exatamente 10 caracteres')
  @DataValida('DD/MM/YYYY', 'Formato de data inválido (DD/MM/YYYY)')
  // @PeriodoLetivoValido() - Implementar validação específica com data de referência(variavel de ambiente? body? db?)
  dataInicio: string;

  // Campo 5: Data de término do ano letivo
  @NomeCampo('005 - Data de término do ano letivo')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Data de término é obrigatória quando escola está em atividade'
  )
  @TamanhoFixo(10, 'Data de término deve ter exatamente 10 caracteres')
  @DataValida('DD/MM/YYYY', 'Formato de data inválido (DD/MM/YYYY)')
  // @PeriodoLetivoValido() - Implementar validação específica com data de referência
  dataFim: string;

  // Campo 6: Nome da escola
  @NomeCampo('006 - Nome da escola')
  @Obrigatorio('Nome da escola é obrigatório')
  @TamanhoMaximo(100, 'Nome da escola não pode ter mais de 100 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– ]+$/i, 'Caracteres não permitidos no nome da escola')
  @MinimoCaracteres(4, 'Nome da escola deve ter no mínimo 4 caracteres (excluindo espaços)')
  nomeEscola: string;

  // Campo 7: CEP
  @NomeCampo('007 - CEP')
  @Obrigatorio('CEP é obrigatório')
  @TamanhoFixo(8, 'CEP deve ter exatamente 8 caracteres')
  @RegexPadrao(/^[0-9]{8}$/, 'Apenas números podem ser informados no CEP')
  @CEPValido('CEP inválido ou não encontrado na base dos Correios')
  cep: string;

  // Campo 8: Município
  @NomeCampo('008 - Município')
  @Obrigatorio('Município é obrigatório')
  @TamanhoFixo(7, 'Código do município deve ter exatamente 7 caracteres')
  @RegexPadrao(/^[0-9]{7}$/, 'Apenas números podem ser informados no código do município')
  @MunicipioValido('Código do município inválido')
  municipio: string;

  // Campo 9: Distrito
  @NomeCampo('009 - Distrito')
  @Obrigatorio('Distrito é obrigatório')
  @TamanhoMaximo(2, 'Código do distrito não pode ter mais de 2 caracteres')
  @DistritoValido('municipio', 'Código do distrito inválido ou não corresponde ao município informado')
  distrito: string;

  // Campo 10: Endereço
  @NomeCampo('010 - Endereço')
  @Obrigatorio('Endereço é obrigatório')
  @TamanhoMaximo(100, 'Endereço não pode ter mais de 100 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]+$/i, 'Caracteres não permitidos no endereço')
  endereco: string;


  // Campo 11: Número
  @NomeCampo('011 - Número')
  @TamanhoMaximo(10, 'Número não pode ter mais de 10 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no número')
  numero: string;

  // Campo 12: Complemento
  @NomeCampo('012 - Complemento')
  @TamanhoMaximo(20, 'Complemento não pode ter mais de 20 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no complemento')
  complemento: string;

  // Campo 13: Bairro
  @NomeCampo('013 - Bairro')
  @TamanhoMaximo(50, 'Bairro não pode ter mais de 50 caracteres')
  @RegexPadrao(/^[A-Z0-9ªº– /., ]*$/i, 'Caracteres não permitidos no bairro')
  bairro: string;

  // Campo 14: DDD
  @NomeCampo('014 - DDD')
  @ObrigatorioCondicional(
    (e: Registro00) => !!e.telefone || !!e.outroTelefone,
    'DDD é obrigatório quando há telefone cadastrado'
  )
  @TamanhoFixo(2, 'DDD deve ter exatamente 2 caracteres')
  @RegexPadrao(/^[0-9]{2}$/, 'DDD deve conter apenas números')
  // @DDDValido('municipio') - Implementar validação contra tabela de DDD
  ddd: string;

  // Campo 15: Telefone
  @NomeCampo('015 - Telefone')
  @TelefoneValido('ddd', 'Telefone inválido')
  telefone: string;

  // Campo 16: Outro telefone
  @NomeCampo('016 - Outro telefone')
  @TelefoneValido('ddd', 'Outro telefone inválido', 'telefone')
  outroTelefone: string;

  // Campo 17: E-mail
  @NomeCampo('017 - E-mail')
  @TamanhoMaximo(100, 'E-mail não pode ter mais de 100 caracteres')
  @EmailValido('E-mail inválido')
  email: string;

  // Campo 18: Órgão regional
  @NomeCampo('018 - Órgão regional')
  @TamanhoFixo(5, 'Código do órgão deve ter 5 caracteres')
  // @OrgaoRegionalValido('municipio') - Implementar validação contra tabela
  orgaoRegional: string;

  // Campo 19: Localização/Zona
  @NomeCampo('019 - Localização/Zona')
  @Obrigatorio('Localização/Zona é obrigatória')
  @TamanhoFixo(1, 'Localização deve ter 1 caractere')
  @ValoresPermitidos(['1', '2'], 'Zona inválida (1-Urbana, 2-Rural)')
  localizacaoZona: string;

  // Campo 20: Localização diferenciada
  @NomeCampo('020 - Localização diferenciada')
  @Obrigatorio('Localização diferenciada é obrigatória')
  @TamanhoFixo(1, 'Localização diferenciada deve ter 1 caractere')
  @ValoresPermitidos(['1', '2', '3', '7', '8'], 'Valor inválido para localização diferenciada')
  localizacaoDiferenciada: string;

  // Campo 21: Dependência administrativa
  @NomeCampo('021 - Dependência administrativa')
  @Obrigatorio('Dependência administrativa é obrigatória')
  @TamanhoFixo(1, 'Dependência administrativa deve ter 1 caractere')
  @ValoresPermitidos(['1', '2', '3', '4'], 'Valor inválido para dependência administrativa')
  dependenciaAdministrativa: string;

  // Campo 22: Secretaria de Educação/Ministério da Educação
  @NomeCampo('022 - Secretaria de Educação/Ministério da Educação')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaEducacao: string;

  // Campo 23: Secretaria de Segurança Pública/Forças Armadas/Militar
  @NomeCampo('023 - Secretaria de Segurança Pública/Forças Armadas/Militar')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaSeguranca: string;
  
  // Campo 24: Secretaria da Saúde/Ministério da Saúde
  @NomeCampo('024 - Secretaria da Saúde/Ministério da Saúde')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  secretariaSaude: string;

  // Campo 25: Outro órgão da administração pública
  @NomeCampo('025 - Outro órgão da administração pública')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2', '3'].includes(e.dependenciaAdministrativa),
    'Campo obrigatório para escolas públicas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  outroOrgaoPublico: string;

  // Campo 26: Empresa/grupos empresariais (privada)
  @NomeCampo('026 - Empresa/grupos empresariais (privada)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraEmpresa: string;

  // Campo 27: Sindicatos/associações/cooperativas (privada)
  @NomeCampo('027 - Sindicatos/associações/cooperativas (privada)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSindicatos: string;

  // Campo 28: ONG (privada)
  @NomeCampo('028 - ONG (privada)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraOng: string;

  // Campo 29: Instituição sem fins lucrativos (privada)
  @NomeCampo('029 - Instituição sem fins lucrativos (privada)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSemFinsLucrativos: string;

  // Campo 30: Sistema S (privada)
  @NomeCampo('030 - Sistema S (privada)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  mantenedoraSistemaS: string;

  // Campo 31: Organização da Sociedade Civil de Interesse Público (Oscip)
  @NomeCampo('031 - Organização da Sociedade Civil de Interesse Público (Oscip)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1' && e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  oscip: string;

  // Campo 32: Categoria da escola privada
  @NomeCampo('032 - Categoria da escola privada')
  @ObrigatorioCondicional(
    (e: Registro00) => e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escolas privadas'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['1', '2', '3', '4'], 'Valor inválido (1-particular, 2-comunitária, 3-confessional, 4-filantrópica)')
  categoriaPrivada: string;

  // Campo 33: Secretaria estadual (parceria/convênio)
  @NomeCampo('033 - Secretaria estadual (parceria/convênio)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Campo obrigatório para escolas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  parceriaSecretariaEstadual: string;

  // Campo 34: Secretaria municipal (parceria/convênio)
  @NomeCampo('034 -   Secretaria municipal (parceria/convênio)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Campo obrigatório para escolas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  parceriaSecretariaMunicipal: string;

  // Campo 35: Não possui parceria ou convênio
  @NomeCampo('035 - Não possui parceria ou convênio')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Campo obrigatório para escolas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  parceriaNaoPossui: string;

  // Campo 36: Termo de colaboração
  @NomeCampo('036 - Termo de colaboração')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoColaboracao: string;

  // Campo 37: Termo de fomento
  @NomeCampo('037 - Termo de fomento')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoFomento: string;

  // Campo 38: Acordo de cooperação
  @NomeCampo('038 - Acordo de cooperação')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  acordoCooperacao: string;

  // Campo 39: Contrato de prestação de serviço
  @NomeCampo('039 - Contrato de prestação de serviço')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  contratoPrestacaoServico: string;

  // Campo 40: Termo de cooperação técnica e financeira
  @NomeCampo('040 - Termo de cooperação técnica e financeira')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoCooperacaoTecnicaFinanceira: string;

  // Campo 41: Contrato de consórcio público/Convênio de cooperação
  @NomeCampo('041 - Contrato de consórcio público/Convênio de cooperação')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaEstadual === '1',
    'Campo obrigatório quando parceria com Secretaria Estadual'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  contratoConsorcioPublico: string;

  // Campo 42: Termo de colaboração (Secretaria Municipal)
  @NomeCampo('042 - Termo de colaboração (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoColaboracaoMunicipal: string;

  // Campo 43: Termo de fomento (Secretaria Municipal)
  @NomeCampo('043 - Termo de fomento (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoFomentoMunicipal: string;

  // Campo 44: Acordo de cooperação (Secretaria Municipal)
  @NomeCampo('044 - Acordo de cooperação (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  acordoCooperacaoMunicipal: string;

  // Campo 45: Contrato de prestação de serviço (Secretaria Municipal)
  @NomeCampo('045 - Contrato de prestação de serviço (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  contratoPrestacaoServicoMunicipal: string;

  // Campo 46: Termo de cooperação técnica e financeira (Secretaria Municipal)
  @NomeCampo('046 - Termo de cooperação técnica e financeira (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  termoCooperacaoTecnicaFinanceiraMunicipal: string;

  // Campo 47: Contrato de consórcio público/Convênio de cooperação (Secretaria Municipal)
  @NomeCampo('047 - Contrato de consórcio público/Convênio de cooperação (Secretaria Municipal)')
  @ObrigatorioCondicional(
    (e: Registro00) => e.parceriaSecretariaMunicipal === '1',
    'Campo obrigatório quando parceria com Secretaria Municipal'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  contratoConsorcioPublicoMunicipal: string;

  // Campo 48: CNPJ da mantenedora principal da escola privada
  @NomeCampo('048 - CNPJ da mantenedora principal da escola privada')
  @ObrigatorioCondicional(
    (e: Registro00) =>
      e.mantenedoraSemFinsLucrativos === '1' &&
      e.regulamentacaoConselho === '1' &&
      e.situacaoFuncionamento === '1' &&
      e.dependenciaAdministrativa === '4',
    'Campo obrigatório para escola privada sem fins lucrativos, regulamentada e em atividade'
  )
  @TamanhoFixo(14, 'Deve ter 14 caracteres')
  // Adicione validação de números e CNPJ válido no método validar()
  cnpjMantenedora: string;

  // Campo 49: Número do CNPJ da escola privada
  @NomeCampo('049 - Número do CNPJ da escola privada')
  @TamanhoFixo(14, 'Deve ter 14 caracteres')
  // Adicione validação de números e CNPJ válido no método validar()
  cnpjEscolaPrivada: string;

  // Campo 50: Regulamentação/autorização no conselho ou órgão municipal, estadual ou federal de educação
  @NomeCampo('050 - Regulamentação/autorização no conselho ou órgão municipal, estadual ou federal de educação')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Campo obrigatório para escolas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1', '2'], 'Valor inválido (0-Não, 1-Sim, 2-Em tramitação)')
  regulamentacaoConselho: string;


   // Campo 51: Federal (esfera administrativa do conselho)
  @NomeCampo('051 - Federal (esfera administrativa do conselho)') 
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  federalConselho: string;

  // Campo 52: Estadual (esfera administrativa do conselho)
  @NomeCampo('052 - Estadual (esfera administrativa do conselho)')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2'].includes(e.regulamentacaoConselho),
    'Campo obrigatório quando regulamentação/autorização for Sim ou Em tramitação'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  estadualConselho: string;

  // Campo 53: Municipal (esfera administrativa do conselho)
  @NomeCampo('053 - Municipal (esfera administrativa do conselho)')
  @ObrigatorioCondicional(
    (e: Registro00) => ['1', '2'].includes(e.regulamentacaoConselho),
    'Campo obrigatório quando regulamentação/autorização for Sim ou Em tramitação'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1'], 'Valor inválido (0-Não, 1-Sim)')
  municipalConselho: string;

  // Campo 54: Unidade vinculada à escola de educação básica ou unidade ofertante de educação superior
  @NomeCampo('054 - Unidade vinculada à escola de educação básica ou unidade ofertante de educação superior')
  @ObrigatorioCondicional(
    (e: Registro00) => e.situacaoFuncionamento === '1',
    'Campo obrigatório para escolas em atividade'
  )
  @TamanhoFixo(1, 'Deve ter 1 caractere')
  @ValoresPermitidos(['0', '1', '2'], 'Valor inválido (0-Sem vínculo, 1-Vinculada a escola básica, 2-Ofertante de ensino superior)')
  unidadeVinculada: string;

  // Campo 55: Código da Escola Sede
  @NomeCampo('055 - Código da Escola Sede')
  @ObrigatorioCondicional(
    (e: Registro00) => e.unidadeVinculada === '1',
    'Campo obrigatório quando unidade vinculada a escola de educação básica'
  )
  @TamanhoFixo(8, 'Deve ter 8 caracteres')
  @RegexPadrao(/^[0-9]{8}$/, 'Apenas números podem ser informados')
  codigoEscolaSede: string;

  // Campo 56: Código da IES
  @NomeCampo('056 - Código da IES')
  @ObrigatorioCondicional(
    (e: Registro00) => e.unidadeVinculada === '2',
    'Campo obrigatório quando unidade ofertante de ensino superior'
  )
  @RegexPadrao(/^[0-9]+$/, 'Apenas números podem ser informados')
  codigoIES: string;

  
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
    this.oscip = campos[30]?.trim() ?? '';
    this.categoriaPrivada = campos[31]?.trim() ?? '';
    this.parceriaSecretariaEstadual = campos[32]?.trim() ?? '';
    this.parceriaSecretariaMunicipal = campos[33]?.trim() ?? '';
    this.parceriaNaoPossui = campos[34]?.trim() ?? '';
    this.termoColaboracao = campos[35]?.trim() ?? '';
    this.termoFomento = campos[36]?.trim() ?? '';
    this.acordoCooperacao = campos[37]?.trim() ?? '';
    this.contratoPrestacaoServico = campos[38]?.trim() ?? '';
    this.termoCooperacaoTecnicaFinanceira = campos[39]?.trim() ?? '';
    this.contratoConsorcioPublico = campos[40]?.trim() ?? '';
    this.termoColaboracaoMunicipal = campos[41]?.trim() ?? '';
    this.termoFomentoMunicipal = campos[42]?.trim() ?? '';
    this.acordoCooperacaoMunicipal = campos[43]?.trim() ?? '';
    this.contratoPrestacaoServicoMunicipal = campos[44]?.trim() ?? '';
    this.termoCooperacaoTecnicaFinanceiraMunicipal = campos[45]?.trim() ?? '';
    this.contratoConsorcioPublicoMunicipal = campos[46]?.trim() ?? '';
    this.cnpjMantenedora = campos[47]?.trim() ?? '';
    this.cnpjEscolaPrivada = campos[48]?.trim() ?? '';
    this.regulamentacaoConselho = campos[49]?.trim() ?? '';
    this.federalConselho = campos[50]?.trim() ?? '';
    this.estadualConselho = campos[51]?.trim() ?? '';
    this.municipalConselho = campos[52]?.trim() ?? '';
    this.unidadeVinculada = campos[53]?.trim() ?? '';
    this.codigoEscolaSede = campos[54]?.trim() ?? '';
    this.codigoIES = campos[55]?.trim() ?? '';
  }

  validar(): { campo: string; regra: string; mensagem: string }[] {
  const erros: { campo: string; regra: string; mensagem: string }[] = [];
  const propriedades = Object.keys(this) as (keyof this)[];

  for (const propriedade of propriedades) {
    const rules = Reflect.getMetadata(VALIDATION_METADATA_KEY, this, propriedade as string) || [];
    const nomeCampo = Reflect.getMetadata(NOME_CAMPO_METADATA_KEY, this, propriedade as string) || String(propriedade);
    for (const rule of rules) {
      const erro = rule.validate(this[propriedade], this);
      if (erro) {
        erros.push({
          campo: nomeCampo,
          regra: rule?.mensagemPadrao || 'Regra de validação',
          mensagem: erro,
        });
      }
    }
  }

  return erros;
}
}
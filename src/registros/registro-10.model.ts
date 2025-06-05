import {
  Obrigatorio,
  ObrigatorioCondicional,
  TamanhoFixo,
  RegexPadrao,
  ValoresPermitidos,
  NomeCampo,
  NaoPreencherSe,
  VALIDATION_METADATA_KEY,
  NOME_CAMPO_METADATA_KEY,
} from './decorators';

export class Registro10 {
  @NomeCampo('001 - Tipo de registro')
  @Obrigatorio()
  @TamanhoFixo(2)
  @ValoresPermitidos(['10'])
  tipoRegistro: string;

  @NomeCampo('002 - Código de escola - Inep')
  @Obrigatorio()
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoEscola: string;

  // 3 a 8: Local de funcionamento da escola (pelo menos um deve ser 1)
  @NomeCampo('003 - Prédio escolar')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  predioEscolar: string;

  @NomeCampo('004 - Sala(s) em outra escola')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  salaOutraEscola: string;

  @NomeCampo('005 - Galpão/rancho/paiol/barracão')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  galpaoRancho: string;

  @NomeCampo('006 - Unidade de atendimento Socioeducativa')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  unidadeSocioeducativa: string;

  @NomeCampo('007 - Unidade Prisional')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  unidadePrisional: string;

  @NomeCampo('008 - Outros')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  outros: string;

  @NomeCampo('009 - Forma de ocupação do prédio')
  @ObrigatorioCondicional((e: Registro10) => e.predioEscolar === '1')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioEscolar !== '1' ||
      e.predioEscolar === undefined ||
      e.predioEscolar.trim() === '',
  )
  @TamanhoFixo(1)
  @ValoresPermitidos(['1', '2', '3'])
  formaOcupacaoPredio: string;

  @NomeCampo('010 - Prédio escolar compartilhado com outra escola')
  @ObrigatorioCondicional((e: Registro10) => e.predioEscolar === '1')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioEscolar !== '1' ||
      e.predioEscolar === undefined ||
      e.predioEscolar.trim() === '',
  )
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  predioCompartilhado: string;

  @NomeCampo('011 - Código da escola com a qual compartilha (1)')
  @ObrigatorioCondicional((e: Registro10) => e.predioCompartilhado === '1')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha1: string;

  @NomeCampo('012 - Código da escola com a qual compartilha (2)')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha2: string;

  @NomeCampo('013 - Código da escola com a qual compartilha (3)')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha3: string;

  @NomeCampo('014 - Código da escola com a qual compartilha (4)')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha4: string;

  @NomeCampo('015 - Código da escola com a qual compartilha (5)')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha5: string;

  @NomeCampo('016 - Código da escola com a qual compartilha (6)')
  @NaoPreencherSe(
    (e: Registro10) =>
      e.predioCompartilhado !== '1' ||
      e.predioCompartilhado === undefined ||
      e.predioCompartilhado.trim() === '',
  )
  @TamanhoFixo(8)
  @RegexPadrao(/^[0-9]{8}$/)
  codigoCompartilha6: string;

  @NomeCampo('017 - Fornece água potável para o consumo humano')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  aguaPotavel: string;

  @NomeCampo('018 - Rede pública')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.aguaNaoHa === '1')
  aguaRedePublica: string;

  @NomeCampo('019 - Poço artesiano')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.aguaNaoHa === '1')
  aguaPocoArtesiano: string;

  @NomeCampo('020 - Cacimba/cisterna/poço')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.aguaNaoHa === '1')
  aguaCacimba: string;

  @NomeCampo('021 - Fonte/rio/igarapé/riacho/córrego')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.aguaNaoHa === '1')
  aguaFonteRio: string;

  @NomeCampo('022 - Carro-pipa')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.aguaNaoHa === '1')
  aguaCarroPipa: string;

  @NomeCampo('023 - Não há abastecimento de água')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  aguaNaoHa: string;

  @NomeCampo('024 - Rede pública (energia elétrica)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.energiaNaoHa === '1')
  energiaRedePublica: string;

  @NomeCampo('025 - Gerador movido a combustível fóssil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.energiaNaoHa === '1')
  energiaGeradorFossil: string;

  @NomeCampo('026 - Fontes de energia renováveis ou alternativas')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.energiaNaoHa === '1')
  energiaRenovavel: string;

  @NomeCampo('027 - Não há energia elétrica')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  energiaNaoHa: string;

  @NomeCampo('028 - Rede pública (esgoto)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.esgotoNaoHa === '1')
  esgotoRedePublica: string;

  @NomeCampo('029 - Fossa séptica')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.esgotoNaoHa === '1')
  esgotoFossaSeptica: string;

  @NomeCampo('030 - Fossa rudimentar/comum')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.esgotoNaoHa === '1')
  esgotoFossaRudimentar: string;

  @NomeCampo('031 - Não há esgotamento sanitário')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  esgotoNaoHa: string;

  @NomeCampo('032 - Serviço de coleta')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  lixoColeta: string;

  @NomeCampo('033 - Queima')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  lixoQueima: string;

  @NomeCampo('034 - Enterra')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  lixoEnterra: string;

  @NomeCampo('035 - Destinação final licenciada')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  lixoDestinoLicenciado: string;

  @NomeCampo('036 - Descarta em outra área')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  lixoOutraArea: string;

  @NomeCampo('037 - Separação do lixo/resíduos')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.lixoNaoFazTratamento === '1')
  lixoSeparacao: string;

  @NomeCampo('038 - Reaproveitamento/reutilização')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @ObrigatorioCondicional((e: Registro10) => e.lixoSeparacao.trim() !== '')
  @NaoPreencherSe(
    (e: Registro10) =>
      !e.lixoSeparacao ||
      e.lixoSeparacao.trim() === '' ||
      e.lixoNaoFazTratamento === '1',
  )
  lixoReaproveitamento: string;

  @NomeCampo('039 - Reciclagem')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @ObrigatorioCondicional((e: Registro10) => e.lixoSeparacao.trim() !== '')
  @NaoPreencherSe(
    (e: Registro10) =>
      !e.lixoSeparacao ||
      e.lixoSeparacao.trim() === '' ||
      e.lixoNaoFazTratamento === '1',
  )
  lixoReciclagem: string;

  @NomeCampo('040 - Não faz tratamento')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @ObrigatorioCondicional((e: Registro10) => e.lixoSeparacao.trim() !== '')
  @NaoPreencherSe(
    (e: Registro10) => !e.lixoSeparacao || e.lixoSeparacao.trim() === '',
  )
  lixoNaoFazTratamento: string;

  // ...campos anteriores...

  @NomeCampo('041 - Almoxarifado')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaAlmoxarifado: string;

  @NomeCampo('042 - Área de vegetação ou gramado')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaVegetacao: string;

  @NomeCampo('043 - Auditório')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaAuditorio: string;

  @NomeCampo('044 - Banheiro')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBanheiro: string;

  @NomeCampo(
    '045 - Banheiro acessível adequado ao uso de pessoas com deficiência ou mobilidade reduzida',
  )
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBanheiroAcessivel: string;

  @NomeCampo('046 - Banheiro adequado à educação infantil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBanheiroInfantil: string;

  @NomeCampo('047 - Banheiro exclusivo para os funcionários')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBanheiroFuncionario: string;

  @NomeCampo('048 - Banheiro ou vestiário com chuveiro')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBanheiroChuveiro: string;

  @NomeCampo('049 - Biblioteca')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaBiblioteca: string;

  @NomeCampo('050 - Cozinha')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaCozinha: string;

  @NomeCampo('051 - Despensa')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaDespensa: string;

  @NomeCampo('052 - Dormitório de aluno(a)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaDormitorioAluno: string;

  @NomeCampo('053 - Dormitório de professor(a)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaDormitorioProfessor: string;

  @NomeCampo('054 - Laboratório de ciências')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaLabCiencias: string;

  @NomeCampo('055 - Laboratório de informática')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaLabInformatica: string;

  @NomeCampo('056 - Laboratório específico para a educação profissional')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaLabProfissional: string;

  @NomeCampo('057 - Parque infantil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaParqueInfantil: string;

  @NomeCampo('058 - Pátio coberto')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaPatioCoberto: string;

  @NomeCampo('059 - Pátio descoberto')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaPatioDescoberto: string;

  @NomeCampo('060 - Piscina')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaPiscina: string;

  @NomeCampo('061 - Quadra de esportes coberta')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaQuadraCoberta: string;

  @NomeCampo('062 - Quadra de esportes descoberta')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaQuadraDescoberta: string;

  @NomeCampo('063 - Refeitório')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaRefeitorio: string;

  @NomeCampo('064 - Sala de repouso para aluno(a)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaRepouso: string;

  @NomeCampo('065 - Sala/ateliê de artes')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaArtes: string;

  @NomeCampo('066 - Sala de música/coral')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaMusica: string;

  @NomeCampo('067 - Sala/estúdio de dança')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaDanca: string;

  @NomeCampo('068 - Sala multiuso (música, dança e artes)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaMultiuso: string;

  @NomeCampo('069 - Terreirão')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaTerreirao: string;

  @NomeCampo('070 - Viveiro/criação de animais')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaViveiro: string;

  @NomeCampo('071 - Sala de diretoria')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaDiretoria: string;

  @NomeCampo('072 - Sala de leitura')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaLeitura: string;

  @NomeCampo('073 - Sala de professores')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaProfessores: string;

  @NomeCampo(
    '074 - Sala de recursos multifuncionais para atendimento educacional especializado (AEE)',
  )
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaAEE: string;

  @NomeCampo('075 - Sala de secretaria')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaSecretaria: string;

  @NomeCampo('076 - Salas de oficinas da educação profissional')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaSalaOficinas: string;

  @NomeCampo('077 - Estúdio de gravação e edição')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaEstudio: string;

  @NomeCampo('078 - Área de horta, plantio e/ou produção agrícola')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.dependenciaNenhuma === '1')
  dependenciaHorta: string;

  @NomeCampo('079 - Nenhuma das dependências relacionadas')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  dependenciaNenhuma: string;

  constructor(campos: string[]) {
    this.tipoRegistro = campos[0]?.trim() ?? '';
    this.codigoEscola = campos[1]?.trim() ?? '';
    this.predioEscolar = campos[2]?.trim() ?? '';
    this.salaOutraEscola = campos[3]?.trim() ?? '';
    this.galpaoRancho = campos[4]?.trim() ?? '';
    this.unidadeSocioeducativa = campos[5]?.trim() ?? '';
    this.unidadePrisional = campos[6]?.trim() ?? '';
    this.outros = campos[7]?.trim() ?? '';
    this.formaOcupacaoPredio = campos[8]?.trim() ?? '';
    this.predioCompartilhado = campos[9]?.trim() ?? '';
    this.codigoCompartilha1 = campos[10]?.trim() ?? '';
    this.codigoCompartilha2 = campos[11]?.trim() ?? '';
    this.codigoCompartilha3 = campos[12]?.trim() ?? '';
    this.codigoCompartilha4 = campos[13]?.trim() ?? '';
    this.codigoCompartilha5 = campos[14]?.trim() ?? '';
    this.codigoCompartilha6 = campos[15]?.trim() ?? '';
    this.aguaPotavel = campos[16]?.trim() ?? '';
    this.aguaRedePublica = campos[17]?.trim() ?? '';
    this.aguaPocoArtesiano = campos[18]?.trim() ?? '';
    this.aguaCacimba = campos[19]?.trim() ?? '';
    this.aguaFonteRio = campos[20]?.trim() ?? '';
    this.aguaCarroPipa = campos[21]?.trim() ?? '';
    this.aguaNaoHa = campos[22]?.trim() ?? '';
    this.energiaRedePublica = campos[23]?.trim() ?? '';
    this.energiaGeradorFossil = campos[24]?.trim() ?? '';
    this.energiaRenovavel = campos[25]?.trim() ?? '';
    this.energiaNaoHa = campos[26]?.trim() ?? '';
    this.esgotoRedePublica = campos[27]?.trim() ?? '';
    this.esgotoFossaSeptica = campos[28]?.trim() ?? '';
    this.esgotoFossaRudimentar = campos[29]?.trim() ?? '';
    this.esgotoNaoHa = campos[30]?.trim() ?? '';
    this.lixoColeta = campos[31]?.trim() ?? '';
    this.lixoQueima = campos[32]?.trim() ?? '';
    this.lixoEnterra = campos[33]?.trim() ?? '';
    this.lixoDestinoLicenciado = campos[34]?.trim() ?? '';
    this.lixoOutraArea = campos[35]?.trim() ?? '';
    this.lixoSeparacao = campos[36]?.trim() ?? '';
    this.lixoReaproveitamento = campos[37]?.trim() ?? '';
    this.lixoReciclagem = campos[38]?.trim() ?? '';
    this.lixoNaoFazTratamento = campos[39]?.trim() ?? '';
    this.dependenciaAlmoxarifado = campos[40]?.trim() ?? '';
    this.dependenciaVegetacao = campos[41]?.trim() ?? '';
    this.dependenciaAuditorio = campos[42]?.trim() ?? '';
    this.dependenciaBanheiro = campos[43]?.trim() ?? '';
    this.dependenciaBanheiroAcessivel = campos[44]?.trim() ?? '';
    this.dependenciaBanheiroInfantil = campos[45]?.trim() ?? '';
    this.dependenciaBanheiroFuncionario = campos[46]?.trim() ?? '';
    this.dependenciaBanheiroChuveiro = campos[47]?.trim() ?? '';
    this.dependenciaBiblioteca = campos[48]?.trim() ?? '';
    this.dependenciaCozinha = campos[49]?.trim() ?? '';
    this.dependenciaDespensa = campos[50]?.trim() ?? '';
    this.dependenciaDormitorioAluno = campos[51]?.trim() ?? '';
    this.dependenciaDormitorioProfessor = campos[52]?.trim() ?? '';
    this.dependenciaLabCiencias = campos[53]?.trim() ?? '';
    this.dependenciaLabInformatica = campos[54]?.trim() ?? '';
    this.dependenciaLabProfissional = campos[55]?.trim() ?? '';
    this.dependenciaParqueInfantil = campos[56]?.trim() ?? '';
    this.dependenciaPatioCoberto = campos[57]?.trim() ?? '';
    this.dependenciaPatioDescoberto = campos[58]?.trim() ?? '';
    this.dependenciaPiscina = campos[59]?.trim() ?? '';
    this.dependenciaQuadraCoberta = campos[60]?.trim() ?? '';
    this.dependenciaQuadraDescoberta = campos[61]?.trim() ?? '';
    this.dependenciaRefeitorio = campos[62]?.trim() ?? '';
    this.dependenciaSalaRepouso = campos[63]?.trim() ?? '';
    this.dependenciaSalaArtes = campos[64]?.trim() ?? '';
    this.dependenciaSalaMusica = campos[65]?.trim() ?? '';
    this.dependenciaSalaDanca = campos[66]?.trim() ?? '';
    this.dependenciaSalaMultiuso = campos[67]?.trim() ?? '';
    this.dependenciaTerreirao = campos[68]?.trim() ?? '';
    this.dependenciaViveiro = campos[69]?.trim() ?? '';
    this.dependenciaSalaDiretoria = campos[70]?.trim() ?? '';
    this.dependenciaSalaLeitura = campos[71]?.trim() ?? '';
    this.dependenciaSalaProfessores = campos[72]?.trim() ?? '';
    this.dependenciaSalaAEE = campos[73]?.trim() ?? '';
    this.dependenciaSalaSecretaria = campos[74]?.trim() ?? '';
    this.dependenciaSalaOficinas = campos[75]?.trim() ?? '';
    this.dependenciaEstudio = campos[76]?.trim() ?? '';
    this.dependenciaHorta = campos[77]?.trim() ?? '';
    this.dependenciaNenhuma = campos[78]?.trim() ?? '';
  }

  validar(): { campo: string; regra: string; mensagem: string }[] {
    const erros: { campo: string; regra: string; mensagem: string }[] = [];
    const propriedades = Object.keys(this) as (keyof this)[];
    for (const propriedade of propriedades) {
      const rules =
        Reflect.getMetadata(
          VALIDATION_METADATA_KEY,
          this,
          propriedade as string,
        ) || [];
      const nomeCampo =
        Reflect.getMetadata(
          NOME_CAMPO_METADATA_KEY,
          this,
          propriedade as string,
        ) || String(propriedade);
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

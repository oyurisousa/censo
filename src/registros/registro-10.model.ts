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
  TamanhoMaximo,
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

  @NomeCampo('080 - Corrimão e guarda-corpos')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessCorrimao: string;

  @NomeCampo('081 - Elevador')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessElevador: string;

  @NomeCampo('082 - Pisos táteis')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessPisoTatil: string;

  @NomeCampo('083 - Portas com vão livre de no mínimo 80 cm')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessPorta80cm: string;

  @NomeCampo('084 - Rampas')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessRampa: string;

  @NomeCampo('085 - Sinalização/alarme luminoso')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessSinalLuminoso: string;

  @NomeCampo('086 - Sinalização sonora')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessSinalSonora: string;

  @NomeCampo('087 - Sinalização tátil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessSinalTatil: string;

  @NomeCampo('088 - Sinalização visual (piso/paredes)')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.acessNenhum === '1')
  acessSinalVisual: string;

  @NomeCampo('089 - Nenhum dos recursos de acessibilidade listados')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  acessNenhum: string;

  @NomeCampo(
    '090 - Qtde. salas de aula utilizadas pela escola dentro do prédio escolar',
  )
  @ObrigatorioCondicional((e: Registro10) => e.predioEscolar === '1')
  @NaoPreencherSe((e: Registro10) => e.predioEscolar !== '1')
  @RegexPadrao(/^(?!0+$)[0-9]{0,4}$/)
  qtdeSalasDentro: string;

  @NomeCampo(
    '091 - Qtde. salas de aula utilizadas pela escola fora do prédio escolar',
  )
  @ObrigatorioCondicional((e: Registro10) => e.predioEscolar === '0')
  @RegexPadrao(/^(?!0+$)[0-9]{0,4}$/)
  qtdeSalasFora: string;

  @NomeCampo('092 - Qtde. salas de aula climatizadas')
  @NaoPreencherSe((e: Registro10) => !e.qtdeSalasDentro && !e.qtdeSalasFora)
  @RegexPadrao(/^(?!0+$)[0-9]{0,4}$/)
  qtdeSalasClimatizadas: string;

  @NomeCampo('093 - Qtde. salas de aula com acessibilidade')
  @NaoPreencherSe((e: Registro10) => !e.qtdeSalasDentro && !e.qtdeSalasFora)
  @RegexPadrao(/^(?!0+$)[0-9]{0,4}$/)
  qtdeSalasAcessiveis: string;

  @NomeCampo('094 - Qtde. salas de aula com Cantinho da Leitura')
  @NaoPreencherSe((e: Registro10) => !e.qtdeSalasDentro && !e.qtdeSalasFora)
  @RegexPadrao(/^(?!0+$)[0-9]{0,4}$/)
  qtdeSalasCantinhoLeitura: string;

  @NomeCampo('095 - Antena parabólica')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipAntena: string;

  @NomeCampo('096 - Computadores')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipComputador: string;

  @NomeCampo('097 - Copiadora')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipCopiadora: string;

  @NomeCampo('098 - Impressora')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipImpressora: string;

  @NomeCampo('099 - Impressora Multifuncional')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipImpressoraMulti: string;

  @NomeCampo('100 - Scanner')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.equipNenhum === '1')
  equipScanner: string;

  @NomeCampo('101 - Nenhum dos equipamentos listados')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  equipNenhum: string;

  @NomeCampo('102 - Aparelho de DVD/Blu-ray')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  equipDVD: string;

  @NomeCampo('103 - Aparelho de som')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  equipSom: string;

  @NomeCampo('104 - Aparelho de Televisão')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  equipTV: string;

  @NomeCampo('105 - Lousa digital')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  equipLousaDigital: string;

  @NomeCampo('106 - Projetor Multimídia (Data show)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  equipProjetor: string;

  // 107 a 109: Quantidade de computadores em uso pelos alunos
  @NomeCampo('107 - Computadores de mesa (desktop)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  qtdeCompMesa: string;

  @NomeCampo('108 - Computadores portáteis')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  qtdeCompPortatil: string;

  @NomeCampo('109 - Tablets')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  qtdeTablets: string;

  // 110 a 114: Acesso à internet
  @NomeCampo('110 - Para uso administrativo')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.internetNenhum === '1')
  internetAdm: string;

  @NomeCampo('111 - Para uso no processo de ensino e aprendizagem')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.internetNenhum === '1')
  internetEnsino: string;

  @NomeCampo('112 - Para uso dos aluno(a)s')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.internetNenhum === '1')
  internetAlunos: string;

  @NomeCampo('113 - Para uso da comunidade')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.internetNenhum === '1')
  internetComunidade: string;

  @NomeCampo('114 - Não possui acesso à internet')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  internetNenhum: string;

  // 115 a 116: Equipamentos que os alunos usam para acessar a internet da escola
  @NomeCampo('115 - Computadores de mesa, portáteis e tablets da escola')
  @ObrigatorioCondicional((e: Registro10) => e.internetAlunos === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  equipAcessoEscola: string;

  @NomeCampo('116 - Dispositivos pessoais')
  @ObrigatorioCondicional((e: Registro10) => e.internetAlunos === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  equipAcessoPessoal: string;

  // 117: Internet banda larga
  @NomeCampo('117 - Internet banda larga')
  @ObrigatorioCondicional((e: Registro10) => e.internetNenhum === '0')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.internetNenhum === '1')
  internetBandaLarga: string;

  // 118 a 120: Rede local de interligação de computadores
  @NomeCampo('118 - A cabo')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe(
    (e: Registro10) =>
      e.equipComputador === '0' &&
      !e.qtdeCompMesa &&
      !e.qtdeCompPortatil &&
      !e.qtdeTablets,
  )
  @NaoPreencherSe((e: Registro10) => e.redeNenhuma === '1')
  redeCabo: string;

  @NomeCampo('119 - Wireless')
  @ObrigatorioCondicional(
  (e: Registro10) => !!e.redeCabo && e.redeCabo.trim() !== ''
)
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => !e.redeCabo || e.redeNenhuma === '1')
  redeWireless: string;

  @NomeCampo('120 - Não há rede local interligando computadores')
  @ObrigatorioCondicional(
    (e: Registro10) => !!e.redeCabo && e.redeCabo.trim() !== '',
  )
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => !e.redeCabo)
  redeNenhuma: string;

  // 121 a 139: Profissionais
  @NomeCampo(
    '121 - Agrônomos(as), horticultores(as), técnicos ou monitores(as) responsáveis pela gestão da área de horta, plantio e/ou produção agrícola',
  )
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profAgronomo: string;

  @NomeCampo(
    '122 - Auxiliares de secretaria ou auxiliares administrativos, atendentes',
  )
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profAuxiliarSecretaria: string;

  @NomeCampo(
    '123 - Profissionais de serviços gerais (limpeza, conservação, etc.)',
  )
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profServicosGerais: string;

  @NomeCampo('124 - Bibliotecário(a)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profBibliotecario: string;

  @NomeCampo('125 - Profissionais de saúde (médico, enfermeiro, etc.)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profSaude: string;

  @NomeCampo('126 - Coordenador(a) de turno')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profCoordenadorTurno: string;

  @NomeCampo('127 - Fonoaudiólogo(a)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profFonoaudiologo: string;

  @NomeCampo('128 - Nutricionista')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profNutricionista: string;

  @NomeCampo('129 - Psicólogo(a)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profPsicologo: string;

  @NomeCampo('130 - Profissionais de cozinha')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profCozinha: string;

  @NomeCampo('131 - Apoio pedagógico')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profApoioPedagogico: string;

  @NomeCampo('132 - Secretário(a)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profSecretario: string;

  @NomeCampo('133 - Segurança')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profSeguranca: string;

  @NomeCampo('134 - Técnico de laboratório')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profTecnicoLaboratorio: string;

  @NomeCampo('135 - Vice-diretor(a)')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profViceDiretor: string;

  @NomeCampo('136 - Assistente social')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profAssistenteSocial: string;

  @NomeCampo('137 - Intérprete de Libras')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profLibras: string;

  @NomeCampo('138 - Professor(a) de Braille')
  @TamanhoMaximo(4)
  @RegexPadrao(/^(?!0+$)[0-9]*$/)
  @NaoPreencherSe((e: Registro10) => e.profNenhum === '1')
  profBraille: string;

  @NomeCampo('139 - Não há funcionários para as funções listadas')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  profNenhum: string;

  // 140: Alimentação escolar
  @NomeCampo('140 - Alimentação escolar para os aluno(a)s')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  alimentacaoEscolar: string;

  // 141 a 157: Instrumentos e materiais socioculturais e/ou pedagógicos
  @NomeCampo('141 - Acervo multimídia')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoAcervoMultimidia: string;

  @NomeCampo('142 - Brinquedos para educação infantil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoBrinquedos: string;

  @NomeCampo('143 - Conjunto de materiais científicos')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoMateriaisCientificos: string;

  @NomeCampo('144 - Equipamento para amplificação e difusão de som/áudio')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoSom: string;

  @NomeCampo('145 - Equipamentos e instrumentos para atividades em área de horta, plantio e/ou produção agrícola')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoHorta: string;

  @NomeCampo('146 - Instrumentos musicais para conjunto, banda/fanfarra e/ou aulas de música')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoMusicais: string;

  @NomeCampo('147 - Jogos educativos')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoJogos: string;

  @NomeCampo('148 - Materiais para atividades culturais e artísticas')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoCulturais: string;

  @NomeCampo('149 - Materiais para educação profissional')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoProfissional: string;

  @NomeCampo('150 - Materiais para prática desportiva e recreação')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoDesportiva: string;

  @NomeCampo('151 - Materiais pedagógicos para a educação bilíngue de surdos')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoBilingueSurdos: string;

  @NomeCampo('152 - Materiais pedagógicos para a educação escolar indígena')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoIndigena: string;

  @NomeCampo('153 - Materiais pedagógicos para a educação das relações étnicos raciais')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoEtnicoRacial: string;

  @NomeCampo('154 - Materiais pedagógicos para a educação do campo')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoCampo: string;

  @NomeCampo('155 - Materiais pedagógicos para a educação escolar quilombola')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoQuilombola: string;

  @NomeCampo('156 - Materiais pedagógicos para a educação especial')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.instrumentoNenhum === '1')
  instrumentoEspecial: string;

  @NomeCampo('157 - Nenhum dos instrumentos listados')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  instrumentoNenhum: string;

  // 158: Escola indígena
  @NomeCampo('158 - Escola indígena')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  escolaIndigena: string;

  // 159: Língua indígena
  @NomeCampo('159 - Língua indígena')
  @ObrigatorioCondicional((e: Registro10) => e.escolaIndigena === '1')
  @NaoPreencherSe((e: Registro10) => e.escolaIndigena !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  linguaIndigena: string;

  // 160: Língua portuguesa
  @NomeCampo('160 - Língua portuguesa')
  @ObrigatorioCondicional((e: Registro10) => e.escolaIndigena === '1')
  @NaoPreencherSe((e: Registro10) => e.escolaIndigena !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  linguaPortuguesa: string;

  // 161: Código da língua indígena 1
  @NomeCampo('161 - Código da língua indígena 1')
  @ObrigatorioCondicional((e: Registro10) => e.linguaIndigena === '1')
  @NaoPreencherSe((e: Registro10) => e.linguaIndigena !== '1')
  @TamanhoMaximo(5)
  @RegexPadrao(/^[0-9]*$/)
  codigoLinguaIndigena1: string;

  // 162: Código da língua indígena 2
  @NomeCampo('162 - Código da língua indígena 2')
  @ObrigatorioCondicional((e: Registro10) => !!e.codigoLinguaIndigena1)
  @NaoPreencherSe((e: Registro10) => !e.codigoLinguaIndigena1)
  @TamanhoMaximo(5)
  @RegexPadrao(/^[0-9]*$/)
  codigoLinguaIndigena2: string;

  // 163: Código da língua indígena 3
  @NomeCampo('163 - Código da língua indígena 3')
  @ObrigatorioCondicional((e: Registro10) => !!e.codigoLinguaIndigena2)
  @NaoPreencherSe((e: Registro10) => !e.codigoLinguaIndigena2)
  @TamanhoMaximo(5)
  @RegexPadrao(/^[0-9]*$/)
  codigoLinguaIndigena3: string;

  // 164: Exame de seleção
  @NomeCampo('164 - Exame de seleção para ingresso')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  exameSelecao: string;

  // 165 a 170: Reserva de vagas por cotas
  @NomeCampo('165 - Autodeclarado preto, pardo ou indígena (PPI)')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaPPI: string;

  @NomeCampo('166 - Condição de renda')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaRenda: string;

  @NomeCampo('167 - Oriundo de escola pública')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaEscolaPublica: string;

  @NomeCampo('168 - Pessoa com deficiência (PCD)')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaPCD: string;

  @NomeCampo('169 - Outros grupos que não os listados')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaOutros: string;

  @NomeCampo('170 - Sem reservas de vagas para sistema de cotas (ampla concorrência)')
  @ObrigatorioCondicional((e: Registro10) => e.exameSelecao === '1')
  @NaoPreencherSe((e: Registro10) => e.exameSelecao !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  cotaNenhuma: string;

  // 171: Site, blog ou página em redes sociais
  @NomeCampo('171 - Possui site, blog ou página em redes sociais')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  possuiSite: string;

  // 172: Compartilha espaços para integração escola-comunidade
  @NomeCampo('172 - Compartilha espaços para integração escola-comunidade')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  compartilhaEspacos: string;

  // 173: Usa espaços e equipamentos do entorno escolar
  @NomeCampo('173 - Usa espaços e equipamentos do entorno escolar')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  usaEspacosEntorno: string;

  // 174 a 179: Órgãos colegiados
  @NomeCampo('174 - Associação de Pais')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.colegiadoNenhum === '1')
  colegiadoPais: string;

  @NomeCampo('175 - Associação de pais e mestres')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.colegiadoNenhum === '1')
  colegiadoPaisMestres: string;

  @NomeCampo('176 - Conselho escolar')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.colegiadoNenhum === '1')
  colegiadoConselho: string;

  @NomeCampo('177 - Grêmio estudantil')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.colegiadoNenhum === '1')
  colegiadoGremio: string;

  @NomeCampo('178 - Outros')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  @NaoPreencherSe((e: Registro10) => e.colegiadoNenhum === '1')
  colegiadoOutros: string;

  @NomeCampo('179 - Não há órgãos colegiados em funcionamento')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  colegiadoNenhum: string;

  // 180: Projeto político pedagógico atualizado
  @NomeCampo('180 - Projeto político pedagógico atualizado')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1', '2'])
  pppAtualizado: string;

  // 181: Educação ambiental
  @NomeCampo('181 - Desenvolve ações de educação ambiental')
  @Obrigatorio()
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  educacaoAmbiental: string;

  // 182 a 187: Formas de desenvolvimento da educação ambiental
  @NomeCampo('182 - Como conteúdo dos componentes/campos de experiências presentes no currículo')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1' || e.ambientalNenhuma === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalCurriculo: string;

  @NomeCampo('183 - Como um componente curricular especial, específico, flexível ou eletivo')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1' || e.ambientalNenhuma === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalComponente: string;

  @NomeCampo('184 - Como um eixo estruturante do currículo')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1' || e.ambientalNenhuma === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalEixo: string;

  @NomeCampo('185 - Em eventos')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1' || e.ambientalNenhuma === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalEventos: string;

  @NomeCampo('186 - Em projetos transversais ou interdisciplinares')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1' || e.ambientalNenhuma === '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalProjetos: string;

  @NomeCampo('187 - Nenhuma das opções listadas')
  @ObrigatorioCondicional((e: Registro10) => e.educacaoAmbiental === '1')
  @NaoPreencherSe((e: Registro10) => e.educacaoAmbiental !== '1')
  @TamanhoFixo(1)
  @ValoresPermitidos(['0', '1'])
  ambientalNenhuma: string;

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
    this.acessCorrimao = campos[79]?.trim() ?? '';
    this.acessElevador = campos[80]?.trim() ?? '';
    this.acessPisoTatil = campos[81]?.trim() ?? '';
    this.acessPorta80cm = campos[82]?.trim() ?? '';
    this.acessRampa = campos[83]?.trim() ?? '';
    this.acessSinalLuminoso = campos[84]?.trim() ?? '';
    this.acessSinalSonora = campos[85]?.trim() ?? '';
    this.acessSinalTatil = campos[86]?.trim() ?? '';
    this.acessSinalVisual = campos[87]?.trim() ?? '';
    this.acessNenhum = campos[88]?.trim() ?? '';
    this.qtdeSalasDentro = campos[89]?.trim() ?? '';
    this.qtdeSalasFora = campos[90]?.trim() ?? '';
    this.qtdeSalasClimatizadas = campos[91]?.trim() ?? '';
    this.qtdeSalasAcessiveis = campos[92]?.trim() ?? '';
    this.qtdeSalasCantinhoLeitura = campos[93]?.trim() ?? '';
    this.equipAntena = campos[94]?.trim() ?? '';
    this.equipComputador = campos[95]?.trim() ?? '';
    this.equipCopiadora = campos[96]?.trim() ?? '';
    this.equipImpressora = campos[97]?.trim() ?? '';
    this.equipImpressoraMulti = campos[98]?.trim() ?? '';
    this.equipScanner = campos[99]?.trim() ?? '';
    this.equipNenhum = campos[100]?.trim() ?? '';
    this.equipDVD = campos[101]?.trim() ?? '';
    this.equipSom = campos[102]?.trim() ?? '';
    this.equipTV = campos[103]?.trim() ?? '';
    this.equipLousaDigital = campos[104]?.trim() ?? '';
    this.equipProjetor = campos[105]?.trim() ?? '';
    this.qtdeCompMesa = campos[106]?.trim() ?? '';
    this.qtdeCompPortatil = campos[107]?.trim() ?? '';
    this.qtdeTablets = campos[108]?.trim() ?? '';
    this.internetAdm = campos[109]?.trim() ?? '';
    this.internetEnsino = campos[110]?.trim() ?? '';
    this.internetAlunos = campos[111]?.trim() ?? '';
    this.internetComunidade = campos[112]?.trim() ?? '';
    this.internetNenhum = campos[113]?.trim() ?? '';
    this.equipAcessoEscola = campos[114]?.trim() ?? '';
    this.equipAcessoPessoal = campos[115]?.trim() ?? '';
    this.internetBandaLarga = campos[116]?.trim() ?? '';
    this.redeCabo = campos[117]?.trim() ?? '';
    this.redeWireless = campos[118]?.trim() ?? '';
    this.redeNenhuma = campos[119]?.trim() ?? '';
    this.profAgronomo = campos[120]?.trim() ?? '';
    this.profAuxiliarSecretaria = campos[121]?.trim() ?? '';
    this.profServicosGerais = campos[122]?.trim() ?? '';
    this.profBibliotecario = campos[123]?.trim() ?? '';
    this.profSaude = campos[124]?.trim() ?? '';
    this.profCoordenadorTurno = campos[125]?.trim() ?? '';
    this.profFonoaudiologo = campos[126]?.trim() ?? '';
    this.profNutricionista = campos[127]?.trim() ?? '';
    this.profPsicologo = campos[128]?.trim() ?? '';
    this.profCozinha = campos[129]?.trim() ?? '';
    this.profApoioPedagogico = campos[130]?.trim() ?? '';
    this.profSecretario = campos[131]?.trim() ?? '';
    this.profSeguranca = campos[132]?.trim() ?? '';
    this.profTecnicoLaboratorio = campos[133]?.trim() ?? '';
    this.profViceDiretor = campos[134]?.trim() ?? '';
    this.profAssistenteSocial = campos[135]?.trim() ?? '';
    this.profLibras = campos[136]?.trim() ?? '';
    this.profBraille = campos[137]?.trim() ?? '';
    this.profNenhum = campos[138]?.trim() ?? '';
    this.alimentacaoEscolar = campos[139]?.trim() ?? '';
    this.instrumentoAcervoMultimidia = campos[140]?.trim() ?? '';
    this.instrumentoBrinquedos = campos[141]?.trim() ?? '';
    this.instrumentoMateriaisCientificos = campos[142]?.trim() ?? '';
    this.instrumentoSom = campos[143]?.trim() ?? '';
    this.instrumentoHorta = campos[144]?.trim() ?? '';
    this.instrumentoMusicais = campos[145]?.trim() ?? '';
    this.instrumentoJogos = campos[146]?.trim() ?? '';
    this.instrumentoCulturais = campos[147]?.trim() ?? '';
    this.instrumentoProfissional = campos[148]?.trim() ?? '';
    this.instrumentoDesportiva = campos[149]?.trim() ?? '';
    this.instrumentoBilingueSurdos = campos[150]?.trim() ?? '';
    this.instrumentoIndigena = campos[151]?.trim() ?? '';
    this.instrumentoEtnicoRacial = campos[152]?.trim() ?? '';
    this.instrumentoCampo = campos[153]?.trim() ?? '';
    this.instrumentoQuilombola = campos[154]?.trim() ?? '';
    this.instrumentoEspecial = campos[155]?.trim() ?? '';
    this.instrumentoNenhum = campos[156]?.trim() ?? '';
    this.escolaIndigena = campos[157]?.trim() ?? '';
    this.linguaIndigena = campos[158]?.trim() ?? '';
    this.linguaPortuguesa = campos[159]?.trim() ?? '';
    this.codigoLinguaIndigena1 = campos[160]?.trim() ?? '';
    this.codigoLinguaIndigena2 = campos[161]?.trim() ?? '';
    this.codigoLinguaIndigena3 = campos[162]?.trim() ?? '';
    this.exameSelecao = campos[163]?.trim() ?? '';
    this.cotaPPI = campos[164]?.trim() ?? '';
    this.cotaRenda = campos[165]?.trim() ?? '';
    this.cotaEscolaPublica = campos[166]?.trim() ?? '';
    this.cotaPCD = campos[167]?.trim() ?? '';
    this.cotaOutros = campos[168]?.trim() ?? '';
    this.cotaNenhuma = campos[169]?.trim() ?? '';
    this.possuiSite = campos[170]?.trim() ?? '';
    this.compartilhaEspacos = campos[171]?.trim() ?? '';
    this.usaEspacosEntorno = campos[172]?.trim() ?? '';
    this.colegiadoPais = campos[173]?.trim() ?? '';
    this.colegiadoPaisMestres = campos[174]?.trim() ?? '';
    this.colegiadoConselho = campos[175]?.trim() ?? '';
    this.colegiadoGremio = campos[176]?.trim() ?? '';
    this.colegiadoOutros = campos[177]?.trim() ?? '';
    this.colegiadoNenhum = campos[178]?.trim() ?? '';
    this.pppAtualizado = campos[179]?.trim() ?? '';
    this.educacaoAmbiental = campos[180]?.trim() ?? '';
    this.ambientalCurriculo = campos[181]?.trim() ?? '';
    this.ambientalComponente = campos[182]?.trim() ?? '';
    this.ambientalEixo = campos[183]?.trim() ?? '';
    this.ambientalEventos = campos[184]?.trim() ?? '';
    this.ambientalProjetos = campos[185]?.trim() ?? '';
    this.ambientalNenhuma = campos[186]?.trim() ?? '';
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
    // Cross-field validation for accessibility (80–89)
    const acessFields = [
      this.acessCorrimao,
      this.acessElevador,
      this.acessPisoTatil,
      this.acessPorta80cm,
      this.acessRampa,
      this.acessSinalLuminoso,
      this.acessSinalSonora,
      this.acessSinalTatil,
      this.acessSinalVisual,
    ];
    if (this.acessNenhum !== '1' && !acessFields.some((v) => v === '1')) {
      erros.push({
        campo: 'Recursos de acessibilidade (80–89)',
        regra: 'Pelo menos um dos campos 80 a 89 deve ser 1 se 89 não for 1',
        mensagem:
          'Pelo menos um dos campos de 80 a 89 deve ser preenchido com 1 (Sim), ou o campo 89 deve ser 1.',
      });
    }
    if (this.acessNenhum === '1' && acessFields.some((v) => v === '1')) {
      erros.push({
        campo: 'Recursos de acessibilidade (80–89)',
        regra: 'Não pode haver 1 em 80–88 se 89 for 1',
        mensagem:
          'Nenhum dos campos de 80 a 88 pode ser preenchido com 1 (Sim) quando o campo 89 for 1 (Sim).',
      });
    }
    // Cross-field validation for equipment (95–101)
    const equipFields = [
      this.equipAntena,
      this.equipComputador,
      this.equipCopiadora,
      this.equipImpressora,
      this.equipImpressoraMulti,
      this.equipScanner,
    ];
    if (this.equipNenhum !== '1' && equipFields.every((v) => v === '0')) {
      erros.push({
        campo: 'Equipamentos (95–101)',
        regra: 'Pelo menos um dos campos 95 a 101 deve ser 1',
        mensagem:
          'Pelo menos um dos campos de 95 a 101 deve ser preenchido com 1 (Sim), ou o campo 101 deve ser 1.',
      });
    }
    if (this.equipNenhum === '1' && equipFields.some((v) => v === '1')) {
      erros.push({
        campo: 'Equipamentos (95–101)',
        regra: 'Não pode haver 1 em 95–100 se 101 for 1',
        mensagem:
          'Nenhum dos campos de 95 a 100 pode ser preenchido com 1 (Sim) quando o campo 101 for 1 (Sim).',
      });
    }
    // Cross-field validation for 90–94
    const toInt = (v: string) =>
      v && /^[0-9]+$/.test(v) ? parseInt(v, 10) : 0;
    const salasDentro = toInt(this.qtdeSalasDentro);
    const salasFora = toInt(this.qtdeSalasFora);
    const salasClimatizadas = toInt(this.qtdeSalasClimatizadas);
    const salasAcessiveis = toInt(this.qtdeSalasAcessiveis);
    const salasCantinho = toInt(this.qtdeSalasCantinhoLeitura);
    const somaSalas = salasDentro + salasFora;
    if (this.qtdeSalasClimatizadas && salasClimatizadas > somaSalas) {
      erros.push({
        campo: 'Qtde. salas de aula climatizadas',
        regra: 'Não pode ser maior que a soma das salas dentro e fora',
        mensagem:
          'O número de salas climatizadas não pode ser maior que a soma das salas dentro e fora do prédio escolar.',
      });
    }
    if (this.qtdeSalasAcessiveis && salasAcessiveis > somaSalas) {
      erros.push({
        campo: 'Qtde. salas de aula com acessibilidade',
        regra: 'Não pode ser maior que a soma das salas dentro e fora',
        mensagem:
          'O número de salas acessíveis não pode ser maior que a soma das salas dentro e fora do prédio escolar.',
      });
    }
    if (
      this.qtdeSalasAcessiveis &&
      this.qtdeSalasClimatizadas &&
      salasAcessiveis + salasClimatizadas > 2 * somaSalas
    ) {
      erros.push({
        campo: 'Qtde. salas de aula com acessibilidade + climatizadas',
        regra: 'Soma não pode ser maior que o dobro da soma das salas',
        mensagem:
          'A soma das salas acessíveis e climatizadas não pode ser maior que o dobro da soma das salas dentro e fora do prédio escolar.',
      });
    }
    if (this.qtdeSalasCantinhoLeitura && salasCantinho > somaSalas) {
      erros.push({
        campo: 'Qtde. salas de aula com Cantinho da Leitura',
        regra: 'Não pode ser maior que a soma das salas dentro e fora',
        mensagem:
          'O número de salas com Cantinho da Leitura não pode ser maior que a soma das salas dentro e fora do prédio escolar.',
      });
    }
    return erros;
  }
}

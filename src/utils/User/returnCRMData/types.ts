export interface IResponseData {
  cidade?: unknown
  crm: number
  email: string
  endereco: string
  especialidades: {
    descricao: string
    item: number
    grupo: number
    numeroRequerimento: number
    areaAtuacao: unknown[]
  }[]
  indexInicioPagina: number
  mensagemStatus?: unknown
  nome: string
  nomeLimpo: string
  nomeSocial?: unknown
  reCaptcha?: unknown
  sequencia: number
  situacao: string
  tamanhoPagina: number
  telefone: string
}

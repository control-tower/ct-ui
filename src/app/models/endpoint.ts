export interface IEndpoint {
  _id: string
  authenticated: boolean
  binary: boolean
  method: string
  path: string
  pathKeys: string[]
  pathRegex: any
  version: number
  endpoints?: [{
    method: string
    path: string
    url: string,
    filters?: any
  }]
}
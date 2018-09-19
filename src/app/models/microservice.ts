export interface IMicroservice {
  _id: string
  name: string
  pathInfo: string
  pathLive: string
  status: string
  tags: string[]
  token: string
  updatedAt: string
  url: string
  version: number
  swagger: string
  infoStatus?: {
    error: string
    lastCheck: string
    numRetries: number
  }
  endpoints?: [{
    method: string
    path: string
    redirect: any
  }]
}
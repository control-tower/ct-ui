export interface IPlugin {
  _id: string
  active: boolean
  description: string
  mainFile: string
  name: string
  config?: any
}
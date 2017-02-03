export interface IApplication {
  _id: string
  name: string
  slug: string
  allowedApplications: string[]
  allowedDomains: string[]
  owner: {
    _id: string
    email: string
  }
  role?: string
  users?: any
}

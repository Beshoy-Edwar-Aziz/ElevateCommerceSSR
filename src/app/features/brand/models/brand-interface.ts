export interface brandInterface {
  results: number
  metadata: Metadata
  data: Data[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  prevPage: number
}

export interface Data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

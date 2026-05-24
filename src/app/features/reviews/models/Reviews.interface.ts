export interface ReviewsInterface {
  _id: string
  review: string
  rating: number
  product: string
  user: User
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  name: string
}

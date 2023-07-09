

export interface User {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  profile_image: string,
  contacts: Contacts[]
}

export interface Contacts {
  _id: string
  category: 'friends' | 'work',
  color: string,
  createdAt: string,
  createdBy: string,
  email_address: string,
  first_name: string,
  last_name: string
  phone_number: string[],
  updatedAt: string
}
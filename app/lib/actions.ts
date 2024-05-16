import { redirect } from 'next/navigation'
import { FormData } from '../models'
import { setItemToStorage } from '../utils/localStorage'
import { fetchData } from './data'
import { revalidatePath } from 'next/cache'

export function createData(data: any) {
  let formData = fetchData()

  if (!Array.isArray(formData)) {
    formData = []
  } 

  const dataWithId = { ...data, id: Date.now().toString() }
  formData.push(dataWithId)
  setItemToStorage('data', formData)
  redirect('/')
}

export function updateData(id: string, data: FormData) {
  const formData = fetchData()
  const newData = formData.map((item) => {
    if (item.id === id) {
      return { ...item, ...data }
    }
    return item
  })
  setItemToStorage('data', newData)
  revalidatePath(`/${id}`)
  redirect('/')
}
import { getItemFromStorage } from '../utils/localStorage'
import { FormData } from '../models'
import { unstable_noStore as noStore } from 'next/cache'

export function fetchData(): FormData[] {
	return getItemFromStorage('data')
}

export function fetchDataById(id: string) {
	noStore()

	const data = getItemFromStorage('data')

	if (!data) {
		console.log('No data in local storage')
		return
	}

	const res = data.find((item: FormData) => item.id === id)

	if (!res) {
		console.log('No item found')
		return
	}

	console.log(res)
	return res
}

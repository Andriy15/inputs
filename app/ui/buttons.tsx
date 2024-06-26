import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import { deleteData } from '../lib/actions'

export function CreateData() {
	return (
		<Link
			href="/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
		>
			<span className="hidden md:block">Create Data</span> <AddIcon className="h-5 md:ml-4" />
		</Link>
	)
}

export function UpdateData({ id }: { id: string }) {
	return (
		<Link href={`/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
			<EditIcon className="w-5" />
		</Link>
	)
}

export function DeleteData({ id }: { id: string }) {
	return (
		<button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => deleteData(id)}>
			<DeleteIcon className="w-4" />
		</button>
	)
}

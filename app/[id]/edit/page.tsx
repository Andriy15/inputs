'use client'

import Breadcrumbs from '../../ui/breadcrumbs'
import { fetchDataById } from '../../lib/data'
import EditForm from '../../ui/edit-form'

export default function Page({ params }: { params: { id: string } }) {
	const id = params.id
	const data = fetchDataById(id)

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Data', href: '/' },
					{
						label: 'Edit data',
						href: '/edit',
						active: true,
					},
				]}
			/>
			<EditForm data={data} />
		</main>
	)
}

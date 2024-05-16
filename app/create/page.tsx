import Breadcrumbs from '../ui/breadcrumbs'
import CreateForm from '../ui/create-form'

export default function Page() {
	return (
		<main>
			<Breadcrumbs breadcrumbs={[
				{ label: 'Data', href: '/' },
				{
					label: 'Create Data',
					href: '/create',
					active: true,
				},
			]} />
			<CreateForm />
		</main>
	)
}
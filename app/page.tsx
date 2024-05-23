'use client'

import { CreateData, UpdateData, DeleteData } from './ui/buttons'
import { fetchData } from './lib/data'

export default function Page() {
	const data = fetchData() || []

	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Amount
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Count
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Domain
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Phone
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{data.map((item, i) => (
									<tr key={i}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{item.amount}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{item.count}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{item.domain}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{item.phone}</div>
										</td>
										<td>
											<UpdateData id={item.id} />
										</td>
										<td>
											<DeleteData id={item.id} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<CreateData />
					</div>
				</div>
			</div>
		</div>
	)
}

import { useState } from "react"
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const filterOptions = ["userName","phoneNo", "userEmail","orderDate", "status"]

export function DataTable({ columns, data, }) {
	const [columnFilters, setColumnFilters] = useState([])
	const [currentFilter, setCurrentFilter] = useState(0)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	})

	function handleFilter() {
		if (currentFilter === filterOptions.length - 1) setCurrentFilter(0);
		else setCurrentFilter(prev => prev + 1);
	}

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder={`Filter ${filterOptions[currentFilter]}...`}
					value={(table.getColumn(filterOptions[currentFilter])?.getFilterValue()) ?? ""}
					onChange={(event) =>
						table.getColumn(filterOptions[currentFilter])?.setFilterValue(event.target.value)
					}
					className="max-w-sm text-black"
				/>
				<button onClick={handleFilter} className="ml-2 bg-slate-200 rounded-md p-1">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#888" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
					</svg>

				</button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-black">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-black text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}


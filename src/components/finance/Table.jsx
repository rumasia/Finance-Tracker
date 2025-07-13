import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import FinanceContext from '@/@core/contexts/FinanceContext'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'tag',
    label: 'Tag',
    minWidth: 170,
    align: 'right'
  }
]

export default function Tables() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)
  const {  sortCategoriesFn, sortHandler } = React.useContext(FinanceContext)
  const sortedRows = sortCategoriesFn()
  // let rows = fiteredCategories.map(transaction => ({
  //   name: transaction.name,
  //   date: transaction.date,
  //   type: transaction.type,
  //   tag: transaction.tag,
  //   amount: transaction.amount
  // }))

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <div className='flex flex-row gap-3 justify-between pt-4'>
          <h3 className=' ml-5'>My transactions</h3>
          <div className='flex flex-row gap-2 mr-4'>
            <button
              className='outline-1 bg-stone-100 cursor-pointer border rounded p-3'
              onClick={() => sortHandler('none')}
            >
              No sort
            </button>
            <button
              className='outline-1 bg-stone-100 cursor-pointer border rounded p-3'
              onClick={() => sortHandler('amount')}
            >
              sort by amount
            </button>
            <button
              className='outline-1 bg-stone-100 cursor-pointer border rounded p-3'
              onClick={() => sortHandler('date')}
            >
              sort by date
            </button>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

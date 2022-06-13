import { useRouter } from "blitz"
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table"
import "regenerator-runtime/runtime"
import Debouncer from "app/core/utils/debouncer"

const Table = ({
  columns,
  data,
  pageCount: controlledPageCount,
  pageIndex: controlledPageIndex,
  pageSize: controlledPageSize,
  hasNext: controlledHasNext,
  hasPrevious: controlledHasPrevious,
  totalCount,
  startPage,
  endPage,
}) => {
  const router = useRouter()
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: controlledPageCount,
      pageIndex: controlledPageIndex,
      pageSize: controlledPageSize,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  )

  const goToPreviousPage = () => {
    router.push({
      query: {
        ...router.query,
        page: controlledPageIndex - 1,
      },
    })
  }

  const goToNextPage = () => {
    router.push({
      query: {
        ...router.query,
        page: controlledPageIndex + 1,
      },
    })
  }

  const searchQuery = async (e) => {
    const searchQuery = { search: JSON.stringify(e.target.value) }
    router.push({
      query: {
        ...router.query,
        page: 0,
        ...searchQuery,
      },
    })
  }

  const debouncer = new Debouncer((e) => searchQuery(e), 500)
  const execDebouncer = (e) => {
    e.persist()
    return debouncer.execute(e)
  }

  return (
    <div>
      <div className="flex mb-2">
        <input
          placeholder="Search"
          type="text"
          className="border border-gray-300 mr-2 lg:w-1/4 px-2 py-2 w-full rounded"
          onChange={(e) => {
            execDebouncer(e)
          }}
        />
      </div>

      <div className="flex flex-col overflow-auto">
        <table className="table min-w-full border border-gray-200" {...getTableProps()}>
          <thead className="bg-gray-50 border-b border-gray-200">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr key={i} className="bg-white" {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <nav className="flex items-center justify-between py-6" aria-label="Pagination">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startPage}</span> to{" "}
            <span className="font-medium">{endPage}</span> of{" "}
            <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className={`${
              !controlledHasPrevious && "disabled:opacity-50 cursor-not-allowed"
            } text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700`}
            disabled={!controlledHasPrevious}
            onClick={() => goToPreviousPage()}
          >
            Previous
          </button>
          <button
            className={`${
              !controlledHasNext && "disabled:opacity-50 cursor-not-allowed"
            } ml-3 text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700`}
            disabled={!controlledHasNext}
            onClick={() => goToNextPage()}
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Table

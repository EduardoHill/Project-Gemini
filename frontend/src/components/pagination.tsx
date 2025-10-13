import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface PaginationProps {
  totalCount: number
  pages: number
  pageIndex: number
  onPageChange: (pageIndex: number) => void
}

export function Pagination({
  totalCount,
  pages,
  pageIndex,
  onPageChange,
}: PaginationProps) {
  return (
    <div className='mt-4 flex items-center justify-between'>
      <span className='text-sm text-zinc-500'>{totalCount} Movimentações</span>

      <div className='flex items-center gap-6'>
        <div>
          <span className='text-sm text-zinc-500'>
            Página {pageIndex + 1} de {pages}
          </span>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => onPageChange(0)}
            className='size-8 p-0 flex items-center justify-center cursor-pointer bg-zinc-900 border border-zinc-700/30 rounded-md disabled:opacity-50'
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className='size-4' />
          </button>

          <button
            onClick={() => onPageChange(pageIndex - 1)}
            className='size-8 p-0 flex items-center justify-center cursor-pointer bg-zinc-900 border border-zinc-700/30 rounded-md disabled:opacity-50'
            disabled={pageIndex === 0}
          >
            <ChevronLeft className='size-4' />
          </button>

          <button
            onClick={() => onPageChange(pageIndex + 1)}
            className='size-8 p-0 flex items-center justify-center cursor-pointer bg-zinc-900 border border-zinc-700/30 rounded-md disabled:opacity-50'
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className='size-4' />
          </button>

          <button
            onClick={() => onPageChange(pages - 1)}
            className='size-8 p-0 flex items-center justify-center cursor-pointer bg-zinc-900 border border-zinc-700/30 rounded-md disabled:opacity-50'
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className='size-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

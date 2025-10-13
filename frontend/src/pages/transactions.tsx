import { useQuery } from '@tanstack/react-query'
import { FilterTransactions } from '../components/filter-transactions'
import { Header } from '../components/header'
import { Pagination } from '../components/pagination'
import { TransactionCard } from '../components/transactions-card'
import { getAllTransactions } from '../api/get-all-transactions'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'

export function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')

  const categories = searchParams.get('categories')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['transactions', name, categories, pageIndex],
    queryFn: () => getAllTransactions({ name, categories, pageIndex }),

    staleTime: Infinity,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex + 1).toString())

      return state
    })
  }

  return (
    <div className='max-w-xl mx-auto px-4 w-full'>
      <Header />

      <div className='w-full h-[1px] bg-zinc-700/30 my-6' />

      <FilterTransactions />

      <h2 className='text-sm mt-7 mb-6'>Todas as movimentações</h2>

      <div className='flex flex-col gap-4'>
        {result?.transactions?.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {result && (
        <Pagination
          onPageChange={handlePaginate}
          totalCount={result?.metas.totalCount}
          pages={result?.metas.pages}
          pageIndex={pageIndex}
        />
      )}
    </div>
  )
}

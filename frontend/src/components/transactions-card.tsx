import { ArrowDown, ArrowUp, Bookmark, Calendar, Pencil } from 'lucide-react'

import { format } from 'date-fns'
import { TransactionType } from './transaction-type'

interface TransactionCardProps {
  transaction: {
    name: string
    categories: string
    amount: number
    type: 'expense' | 'revenue'
    date: string
  }
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  let formattedDate = 'Data inválida'

  try {
    const dateObj = new Date(transaction.date)
    if (!isNaN(dateObj.getTime())) {
      dateObj.setHours(dateObj.getHours() + 3)
      formattedDate = format(dateObj, 'dd/MM/yyyy')
    }
  } catch (err) {
    console.error('Erro ao formatar data:', err)
  }
  return (
    <div className='px-6 py-4 bg-zinc-900 border border-zinc-700/30 rounded-2xl space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {transaction.type === 'expense' ? (
            <ArrowDown className='size-5 text-rose-500 font-medium' />
          ) : (
            <ArrowUp className='size-5 text-green-400 font-medium' />
          )}
          <span className='text-sm text-zinc-400'>Tipo:</span>
          <TransactionType type={transaction.type} />
        </div>

        <div className='flex items-center gap-2'>
          <Calendar className='size-4 text-violet-400' />
          <span className='text-sm text-zinc-400'>Data:</span>
          <span className='text-sm'>{formattedDate}</span>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Bookmark className='size-4 text-cyan-400' />
          <span className='text-sm text-zinc-400'>Categoria:</span>
          <span className='text-sm'>{transaction.categories}</span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-zinc-400'>Valor:</span>
          <span
            className={`text-sm ${transaction.type === 'expense' ? 'text-rose-500' : 'text-green-400'} font-medium`}
          >
            {transaction.amount.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </div>

      <div className='w-full h-[1px] bg-zinc-700/30' />

      <div className='flex items-center gap-2'>
        <Pencil className='size-4 text-orange-400' />
        <span className='text-sm text-zinc-400'>Descrição:</span>
        <span className='text-sm'>{transaction.name}</span>
      </div>
    </div>
  )
}

type TransactionType = 'expense' | 'revenue'

interface TransactionTypeProps {
  type: TransactionType
}

const transactionType: Record<TransactionType, string> = {
  expense: 'Despesa',
  revenue: 'Receita',
}

export function TransactionType({ type }: TransactionTypeProps) {
  return (
    <>
      {type === 'expense' && (
        <span className='text-rose-500'>{transactionType[type]}</span>
      )}
      {type === 'revenue' && (
        <span className='text-green-400'>{transactionType[type]}</span>
      )}
    </>
  )
}

import { ArrowRight } from 'lucide-react'
import { Header } from '../components/header'
import { TransactionCard } from '../components/transactions-card'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTransactionsRecent } from '../api/get-transactions'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { createTransaction } from '../api/create-transation'
import { useAuth } from '../contexts/auth-context'

const FormDataSchema = z.object({
  prompt: z.string(),
})

type FormData = z.infer<typeof FormDataSchema>

export function Home() {
  const { user } = useAuth()

  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(FormDataSchema),
  })

  const queryClient = useQueryClient()

  const { data: result } = useQuery({
    queryKey: ['transactions-recent', user?.id],
    queryFn: () => getTransactionsRecent(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity,
  })

  const { mutateAsync: createTransactionFn, isPending } = useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions-recent'],
      })

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      })
    },
  })

  async function handleCreateTransaction(data: FormData) {
    try {
      const { prompt } = data

      if (!prompt) {
        return alert('Por favor, descreva sua movimentação')
      }

      await createTransactionFn({
        prompt,
        userId: user!.id,
      })

      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className='max-w-xl mx-auto px-4 w-full'>
      <Header />

      <div className='w-full h-[1px] bg-zinc-700/30 my-6' />

      <main>
        <form onSubmit={handleSubmit(handleCreateTransaction)}>
          <div className='flex items-center justify-between h-12 gap-2 bg-zinc-900 border border-zinc-700/30 px-2 py-1 rounded-2xl'>
            <input
              type='text'
              placeholder='Descreva sua movimentação'
              className='bg-transparent outline-0 flex-1 text-sm'
              {...register('prompt')}
            />

            <button
              type='submit'
              disabled={isPending}
              className='flex items-center gap-2 bg-orange-400 hover:bg-orange-500 transition-colors cursor-pointer px-2 h-9 rounded-xl disabled:opacity-50'
            >
              <span className='text-sm font-medium'>Gerar</span>
              <ArrowRight className='size-4' />
            </button>
          </div>
        </form>

        <h2 className='text-sm mt-7 mb-6'>Últimas 4 movimentações</h2>

        <div className='flex flex-col gap-4'>
          {result &&
            result.transactions?.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
      </main>
    </div>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'

const FormSchema = z.object({
  name: z.string(),
  categories: z.string(),
})

type FormData = z.infer<typeof FormSchema>

export function FilterTransactions() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')

  const categories = searchParams.get('categories')

  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name ?? '',
      categories: categories ?? '',
    },
  })

  function handleFilter({ name, categories }: FormData) {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name)
      } else {
        state.delete('name')
      }

      if (categories) {
        state.set('categories', categories)
      } else {
        state.delete('categories')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClear() {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('categories')
      state.set('page', '1')

      return state
    })

    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFilter)} className='space-y-4'>
        <input
          className='text-sm w-full bg-zinc-900 border border-zinc-700/30 rounded-2xl px-2 h-12'
          type='text'
          placeholder='Busque pelo nome de uma movimentação'
          {...register('name')}
        />
        <input
          className='text-sm w-full bg-zinc-900 border border-zinc-700/30 rounded-2xl px-2 h-12'
          type='text'
          placeholder='Busque pelo nome de uma categoria'
          {...register('categories')}
        />

        <div className='flex gap-2'>
          <button
            type='submit'
            className='w-full bg-orange-400 rounded-2xl h-12'
          >
            Filtrar
          </button>

          <button
            type='button'
            onClick={handleClear}
            className='w-full bg-zinc-900 border border-zinc-700/30 rounded-2xl h-12'
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  )
}

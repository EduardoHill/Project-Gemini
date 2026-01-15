import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import z from 'zod'
import { useAuth } from '../contexts/auth-context'

const formSchema = z.object({
  email: z.email('Formato de e-mail inválido'),
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
type FormSchemaType = z.infer<typeof formSchema>

export function CreateAccountPage() {
  const { createAccount } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreateAccount(data: FormSchemaType) {
    try {
      setIsLoading(true)
      setError(null)
      await createAccount(data.name, data.email, data.password)
      navigate('/')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-xl mx-auto px-4 w-full'>
      <div className='w-full h-[1px] bg-zinc-700/30 my-6' />

      <main className='flex flex-col bg-orange-500 py-5 px-4 justify-center rounded-md'>
        <h1 className='text-2xl font-bold text-black mb-4 text-center'>
          Criar Conta
        </h1>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleCreateAccount)}
          className='flex flex-col text-black gap-4'
        >
          <div className='flex flex-col gap-2'>
            <label>Nome</label>
            <input
              type='text'
              className='border border-black rounded-2xl bg-white px-4 py-2'
              {...register('name')}
            />
            {errors.name && (
              <span className='text-red-800 text-sm'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label>E-mail</label>
            <input
              type='email'
              className='border border-black rounded-2xl bg-white px-4 py-2'
              {...register('email')}
            />
            {errors.email && (
              <span className='text-red-800 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label>Senha</label>
            <input
              type='password'
              className='border border-black rounded-2xl bg-white px-4 py-2'
              {...register('password')}
            />
            {errors.password && (
              <span className='text-red-800 text-sm'>
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-black text-white rounded-2xl py-2 cursor-pointer disabled:opacity-50'
          >
            {isLoading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <p className='text-black text-center mt-4'>
          Já tem uma conta?{' '}
          <Link to='/login' className='underline font-semibold'>
            Entrar
          </Link>
        </p>
      </main>
    </div>
  )
}

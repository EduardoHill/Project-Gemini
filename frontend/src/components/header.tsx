import { Link, useLocation } from 'react-router-dom'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'

export function Header() {
  const { pathname } = useLocation()
  return (
    <header className='flex items-center justify-between mt-4'>
      <div className='flex itens-center gap-2'>
        <div className='size-7 bg-orange-400 rounded-full'></div>
        <span className='text-base font-medium'>IA Finance</span>
      </div>

      {pathname === '/' ? (
        <Link
          to='/transacoes'
          className='text-sm flex items-center gap-2 bg-zinc-900 border border-zinc-700/30 px-2 py-1 rounded-md'
        >
          <span>Movimentações</span>
          <ArrowRightCircle className='size-5' />
        </Link>
      ) : (
        <Link
          to='/'
          className='text-sm flex items-center gap-2 bg-zinc-900 border border-zinc-700/30 px-2 py-1 rounded-md'
        >
          <span>Voltar</span>
          <ArrowLeftCircle className='size-5' />
        </Link>
      )}
    </header>
  )
}

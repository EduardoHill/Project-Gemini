import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  const isMovPage = location.pathname === '/mov'

  return (
    <header className='flex flex-col '>
      <div className=' flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className='bg-orange-600 w-7 h-7 rounded-[100%] '></div>
          <h1>Ia Finance</h1>
        </div>
        <Link
          to={isMovPage ? '/' : '/mov'}
          className='flex gap-5 bg-[#18181B] rounded-md border border-[#3741514D] p-2 cursor-pointer hover:bg-[#2a2a2f] transition-colors'
        >
          {isMovPage ? 'Voltar' : 'Movimentações'}
          {isMovPage ? (
            <ArrowLeftCircle color='white' />
          ) : (
            <ArrowRightCircle color='white' />
          )}
        </Link>
      </div>
      <div className='border border-[#3741514D] w-full mt-5 '></div>
    </header>
  )
}

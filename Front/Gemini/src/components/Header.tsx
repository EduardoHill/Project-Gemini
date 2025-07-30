import { ArrowRightCircle } from 'lucide-react'

export function Header() {
  return (
    <header className='flex flex-col '>
      <div className=' flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className='bg-orange-600 w-7 h-7 rounded-[100%] '></div>
          <h1>Ia Finance</h1>
        </div>
        <button className='flex gap-5 bg-[#18181B] rounded-md border border-[#3741514D] p-2 cursor-pointer'>
          Movimentações <ArrowRightCircle color='white' />
        </button>
      </div>
      <div className='border border-[#3741514D] w-full mt-5 '></div>
    </header>
  )
}

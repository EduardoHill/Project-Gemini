import { ArrowDown, Bookmark, Calendar, Coins, Pencil } from 'lucide-react'

export function Cards() {
  return (
    <div className='flex flex-col gap-3 bg-[#18181B] border border-[#3741514D] rounded-md p-3'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center gap-1 text-[#3F3F46]'>
          <ArrowDown color='#F43F5E' /> Tipo :{' '}
          <span className='text-[#F43F5E]'>Despesa</span>
        </h1>
        <h1 className='flex items-center gap-1 text-[#3F3F46]'>
          <Calendar color='#818CF8' />
          Data : <span className='text-white'>01/01/2023</span>
        </h1>
      </div>
      <div className='flex justify-between items-center text-[#3F3F46]'>
        <h1 className='flex items-center gap-1'>
          <Bookmark color='#22D3EE' /> Categoria :{' '}
          <span className='text-white'>Alimentação</span>
        </h1>
        <h1 className='flex items-center gap-1'>
          <Coins color='#F59E0B' /> Valor :{' '}
          <span className='text-white'>R$ 50,00</span>
        </h1>
      </div>
      <div className='border border-[#3741514D] w-full'></div>
      <div>
        <h1 className='flex items-center gap-1 text-[#3F3F46]'>
          <Pencil color='#FB923C' /> Descrição :{' '}
          <span className='text-white'>Almoço</span>
        </h1>
      </div>
    </div>
  )
}

import { Cards } from '../../components/Card'
import { Header } from '../../components/Header'

export function Movimentation() {
  return (
    <div className='flex justify-center h-screen w-full bg-black text-white p-5'>
      <div className='w-[700px] flex flex-col gap-5 '>
        <Header />
        <div className='flex flex-col gap-5'>
          <input
            type='text'
            className='w-full outline-none bg-[#18181B] border border-[#3741514D] rounded-md p-2 '
          />
          <input
            type='text'
            className='w-full outline-none bg-[#18181B] border border-[#3741514D] rounded-md p-2 '
          />
          <div className='flex w-full items-center gap-3'>
            <button className='bg-[#FB923C]  rounded-md p-2 w-1/2 cursor-pointer'>
              Filtrar{' '}
            </button>
            <button className='bg-[#18181B] border border-[#3741514D] rounded-md p-2 w-1/2 cursor-pointer'>
              Limpar{' '}
            </button>
          </div>
        </div>

        <main className='flex flex-col gap-4'>
          <h1>Todas as Movimentações</h1>
          <div>
            <Cards />
          </div>
        </main>
      </div>
    </div>
  )
}

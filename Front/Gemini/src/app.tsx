import { ArrowRight } from 'lucide-react'
import { Cards } from './components/Card'
import { Header } from './components/Header'

export function App() {
  return (
    <div className='flex justify-center h-screen w-full bg-black text-white p-5'>
      <div className='w-[700px] flex flex-col gap-5 '>
        <Header />
        <div className='flex justify-between items-center bg-[#18181B] border border-[#3741514D] rounded-md p-2 gap-2'>
          <input type='text' className='w-full outline-none bg-transparent' />
          <button className='flex items-center gap-1 bg-[#FB923C] p-2 rounded-md text-white'>
            Gerar <ArrowRight />
          </button>
        </div>

        <main className='flex flex-col gap-4'>
          <h1>Últimas 4 movimentações</h1>

          <div>
            <Cards />
          </div>
        </main>
      </div>
    </div>
  )
}

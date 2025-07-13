'use client'
import { FinanceProvider } from '@/@core/contexts/FinanceContext'
import MediaCard from '@/components/finance/Card'
import BasicPie from '@/components/finance/PieChart'
import BasicLineChart from '@/components/finance/LineChart'
import SearchBar from '@/components/finance/SearchBar'
import Tables from '@/components/finance/Table'

export default function Page() {
  return (
    <>
      <FinanceProvider>
        <div className='flex flex-row gap-8  justify-center max-w-[100%]'>
          <MediaCard cardKey='balance' title='Current balance' amount='Rs 0' btnText='Reset balance'></MediaCard>
          <MediaCard cardKey='income' title='Total income' amount='Rs 0' btnText='Add income'></MediaCard>
          <MediaCard cardKey='expenses' title='Total expenses' amount='Rs 0' btnText='Add expense'></MediaCard>
        </div>

        <div className='flex flex-row mt-4 items-center justify-center  gap-2 max-w-[50rem] '>
          <BasicLineChart></BasicLineChart>

          <BasicPie></BasicPie>
        </div>

        <div className='mt-2 mb-3'>
          <SearchBar></SearchBar>
        </div>
        <Tables></Tables>
      </FinanceProvider>
    </>
  )
}

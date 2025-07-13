import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import FinanceContext from '@/@core/contexts/FinanceContext'
import BgCard from './BgCard'

export default function BasicLineChart() {
  const { cardAmount } = React.useContext(FinanceContext)
  const months = cardAmount.categories.map(category =>
    new Date(category.date).toLocaleString('default', { month: 'short' })
  )
  const incomeData = cardAmount.categories.filter(transaction => transaction.type === 'income')

  const balanceData = incomeData.map(category => category.amount)
  return (
    <BgCard>
      <p>Total income</p>
      <LineChart
        xAxis={[{ data: months, scaleType: 'band' }]}
        series={[
          {
            data: balanceData
          }
        ]}
        tooltip={true}
        legend={{ position: 'top' }}
        width={400}
        height={250}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
      />
    </BgCard>
  )
}

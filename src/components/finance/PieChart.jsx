import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import BgCard from './BgCard'
import FinanceContext from '@/@core/contexts/FinanceContext'

export default function BasicPie() {
  const { cardAmount } = React.useContext(FinanceContext)
  const tagColorMap = {
    food: '#38812F',
    education: '#FF6384',
    travelling: '#36A2EB',
    rent: '#FFCE56'
  }
  const tagMap = new Map()
  const pieData = []
  const expenseData = cardAmount.categories.filter(transaction => transaction.type === 'expenses')
  expenseData.forEach(entery => {
    const tag = entery.tag || 'unknown'
    const amount = parseFloat(entery.amount)
    if (!tagMap.has(tag)) {
      tagMap.set(tag, amount)
    } else {
      tagMap.set(tag, tagMap.get(tag) + amount)
    }
  })
  tagMap.forEach((amount, tag) => {
    pieData.push({
      value: amount,
      label: tag,
      color: tagColorMap[tag]
    })
  })
  const hasExpenses = pieData.length > 0

  return (
    <>
      <BgCard>
        <p className='whitespace-nowrap'>Total spendings</p>
        {hasExpenses ? (
          <PieChart
            series={[
              {
                data: pieData
              }
            ]}
            width={300}
            height={150}
          />
        ) : (
          <p>No expenses yet</p>
        )}
      </BgCard>
    </>
  )
}

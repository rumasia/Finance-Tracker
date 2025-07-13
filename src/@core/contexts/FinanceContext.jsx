import { createContext, useState } from 'react'

const FinanceContext = createContext()
export const FinanceProvider = ({ children }) => {
  const [cardAmount, setCardAmount] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    categories: []
  })
  const [fiteredCategories, setFiteredCategories] = useState(cardAmount.categories)
  const [sortMethod, setSortMethod] = useState('none')
  const updateAmount = (key, amount, formData) => {
    setCardAmount(prevAmount => {
      // let newBalance = prevAmount.balance

      const numericAmount = parseFloat(amount)

      let newIncome = prevAmount.income
      let newExpense = prevAmount.expenses
      let newBalance = prevAmount.balance
      let newCategories = prevAmount.categories
      if (key === 'income') {
        newIncome += numericAmount
        newBalance += numericAmount
        newCategories = [...newCategories, { ...formData, type: 'income' }]
      } else if (key === 'expenses') {
        if (prevAmount.balance <= 0) {
          return prevAmount
        }
        newExpense += numericAmount
        newBalance -= numericAmount
        newCategories = [...newCategories, { ...formData, type: 'expenses' }]
      }

      if (newBalance < 0) {
        newBalance = 0
      }
      setFiteredCategories(newCategories)

      // const updatedCategories = key === 'expenses' ? [...(prevAmount.categories || []), formData] : prevAmount.category
      return {
        ...prevAmount,
        income: newIncome,
        expenses: newExpense,
        balance: newBalance,
        [key]: prevAmount[key] + numericAmount,
        categories: newCategories
      }
    })
  }
  const filtered = name => {
    // if (!name) {
    //   setFiteredCategories(cardAmount.categories)
    //   return
    // }
    const filteredByName = cardAmount.categories.filter(category =>
      category.name.toLowerCase().includes(name.toLowerCase())
    )
    setFiteredCategories(filteredByName)
  }
  const sortCategoriesFn = () => {
    let sortedCategories = [...fiteredCategories]
    if (sortMethod === 'amount') {
      sortedCategories.sort((a, b) => a.amount - b.amount)
    } else if (sortMethod === 'date') {
      sortedCategories.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    return sortedCategories
  }
  const sortHandler = method => {
    setSortMethod(method)
  }
  return (
    <FinanceContext.Provider
      value={{ sortCategoriesFn, sortHandler, sortMethod, updateAmount, cardAmount, filtered, fiteredCategories }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export default FinanceContext

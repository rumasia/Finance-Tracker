// React Imports
import { useContext, useRef, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from '@/@core/components/mui/TextField'
import InputForm from './CustomTextField'
import FinanceContext from '@/@core/contexts/FinanceContext'
// Component Imports

const DialogsForm = ({ open, onClose, btnText, onSubmit, cardKey }) => {
  const [amount, setAmount] = useState('')
  const nameRef = useRef()
  const amountRef = useRef()
  const dateRef = useRef()
  const tagRef = useRef()
  const { cardAmount } = useContext(FinanceContext)
  // States
  //   const [open, setOpen] = useState(false)

  //   const handleClickOpen = () => setOpen(true)

  //   const handleClose = () => setOpen(false)
  const handleSubmit = () => {
    const name = nameRef.current.value
    const amount = amountRef.current.value
    const date = dateRef.current.value
    const tag = tagRef.current.value

    if (!name || !amount || !date || !tag) {
      alert('All feilds must be empty')
      return
    }
    if (btnText === 'Add expense' && (cardAmount.income === 0 || cardAmount.balance === 0)) {
      alert('Unable to add expense if income and balance is zero')

      return
    }
    if (btnText === 'Add expense' && amount > cardAmount.balance) {
      alert('Expenses cannot exceed the current balance')
      return
    }
    onSubmit(amount, { name, amount, date, tag })

    setAmount('')
  }
  const tagOptions =
    cardKey === 'expenses'
      ? [
          { value: 'food', label: 'Food' },
          { value: 'education', label: 'Education' },
          { value: 'travelling', label: 'Travelling' },
          { value: 'rent', label: 'Rent' }
        ]
      : [
          { value: 'salary', label: 'Salary' },
          { value: 'freelance', label: 'Freelance' },
          { value: 'investment', label: 'Investment' }
        ]
  return (
    <>
      <Dialog
        scroll='none'
        className='w-[50%] ml-52   '
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
      >
        <h3 className='ml-10 mt-5 mb-1'>{btnText}</h3>
        <DialogContent className=''>
          <InputForm id='name' ref={nameRef} type='text' label='Name' />
          <InputForm
            ref={amountRef}
            id='amount'
            onChange={e => setAmount(e.target.value)}
            value={amount}
            type='number'
            label='Amount'
          />

          <InputForm id='date' ref={dateRef} type='date' label='Date' />
          {/* <CustomTextField id='tag' inputRef={tagRef}  type='dropdown' label='Tag' /> */}
          <InputForm id='tag' ref={tagRef} type='select' label='Tag' options={tagOptions} />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button className='mt-0' onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            className='mt-0'
            onClick={() => {
              onClose()
              setAmount('')
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogsForm

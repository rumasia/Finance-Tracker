'use client'
import * as React from 'react'
import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Buttons from './Button'
import DialogsForm from './FormElement'
import FinanceContext from '@/@core/contexts/FinanceContext'

export default function MediaCard({ title, btnText, cardKey }) {
  const { updateAmount, cardAmount } = React.useContext(FinanceContext)
  const [open, setOpen] = React.useState(false)
  const handleFormDialog = () => {
    setOpen(true)
  }
  const handleFormSubmit = (amount, formdata) => {
    updateAmount(cardKey, amount, formdata)
    setOpen(false)
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className='bg-yellow-100 h-full w-full'>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Rs {cardAmount[cardKey]}
          </Typography>
        </CardContent>
        <CardActions>
          <Buttons onClick={handleFormDialog}>{btnText}</Buttons>
        </CardActions>
      </Card>
      <DialogsForm
        cardKey={cardKey}
        onSubmit={handleFormSubmit}
        btnText={btnText}
        open={open}
        onClose={() => setOpen(false)}
      ></DialogsForm>
    </>
  )
}

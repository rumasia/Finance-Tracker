import * as React from 'react'
import { useContext, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Buttons from './Button'
import FinanceContext from '@/@core/contexts/FinanceContext'

export default function SearchBar() {
  const { filtered } = React.useContext(FinanceContext)

  const nameRef = React.useRef()

  const searchByHandler = () => {
    const name = nameRef.current.value
    filtered(name.trim())
  }
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '40ch' }
      }}
      noValidate
      autoComplete='off'
      className='flex flex-row'
    >
      <TextField id='outlined-basic' inputRef={nameRef} placeholder='Search by name' variant='outlined' />
      <Buttons onClick={searchByHandler}>Search</Buttons>
    </Box>
  )
}

import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
export default function Buttons({ children, ...props }) {
  return (
    <>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' {...props} className='bg-purple-500'>
          {children}
        </Button>
      </Stack>
    </>
  )
}

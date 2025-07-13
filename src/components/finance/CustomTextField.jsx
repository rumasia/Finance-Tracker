import React, { forwardRef } from 'react'

const InputForm = forwardRef(({ label, options, type, ...props }, ref) => {
  return (
    <div className='flex flex-col  '>
      <label>{label}</label>
      {type === 'select' ? (
        <select ref={ref} className='text-blue-700 border rounded  border-blue h-[2rem]' {...props}>
          {options &&
            options.map((option, index) => {
              console.log('option', option)
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              )
            })}
        </select>
      ) : (
        <input ref={ref} type={type} className='border rounded  border-blue h-[2rem] ' {...props} />
      )}
    </div>
  )
})

export default InputForm

const BgCard = ({ children }) => {
  return (
    <>
      <div>
        <div className='bg-white shadow-md rounded-lg w-[25rem] h-72 p-6 mt-3 items-center'>{children}</div>
      </div>
    </>
  )
}

export default BgCard

import React from 'react'

export default function Pages({page, handleNext, handlePrev}) {
  return (
    <div>
      <div className="pagin">
<button className={page==1 ? 'hide-btn btn page-btn' : 'page-btn btn'} onClick={handlePrev} >Prev</button>
<button className='page-btn btn' onClick={handleNext} >Next</button>

</div>
      
    </div>
  )
}

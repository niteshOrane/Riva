import React from 'react'
import Form2 from './components/Form2'
import Form3 from './components/Form3'

function ReturnForm({list,requestReturn,handleCommentChange}) {
  return (
    <div>
        <Form2 />
        <Form3 requestReturn={requestReturn} handleCommentChange={handleCommentChange} list={list} />
    </div>
  )
}

export default ReturnForm
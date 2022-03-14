import React from 'react'
import Form1 from './components/Form1'
import Form2 from './components/Form2'
import Form3 from './components/Form3'

function ReturnForm({requestReturn,handleCommentChange}) {
  return (
    <div>
        <Form1 handleCommentChange={handleCommentChange} />
        <Form2 />
        <Form3 requestReturn={requestReturn} />
    </div>
  )
}

export default ReturnForm
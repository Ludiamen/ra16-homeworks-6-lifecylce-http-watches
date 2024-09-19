/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useRef, useState } from 'react'
import './App.css'
import { Form } from './components/Form/Form'
import { Watch } from './components/Watch/Watch'
import { nanoid } from 'nanoid'

function App() {
  const [form, setForm] = useState({id: '', city: '', offset: ''})
  const clocks = useRef<{id: string, city: string, offset: string}[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.city !== '' && form.offset !== '' && clocks.current.filter(clock => clock.city === form.city).length === 0 ?
    clocks.current.push({id: nanoid(), city: form.city, offset: form.offset}): '';
    setForm((prevForm) => ({...prevForm}))
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({...prevForm, [name]: value}))
  }

  const handleOndelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elem = e.currentTarget.closest('.Clock-box');
    elem ? clocks.current = clocks.current.filter(clock => clock.id !== elem.id) : '';
    setForm((prevForm) => ({...prevForm}))
  }

  return (
    <>
      <Form changeField={handleOnChange} submit={handleSubmit}/>
      <div className='watches-box'>
          {clocks.current.map(clock => <Watch data={clock}  onDelete={handleOndelete} key={clock.id}/>)}
      </div>
      
    </>
  )
}

export default App
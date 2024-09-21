import { useState } from 'react';
import './App.css';
import { Form } from './components/Form/Form';
import { Watch } from './components/Watch/Watch';
import { nanoid } from 'nanoid';

function App() {
  const [form, setForm] = useState({ id: '', city: '', offset: '' });
  const [clocks, setClocks] = useState<{ id: string, city: string, offset: string }[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.city !== '' && form.offset !== '' && clocks.filter(clock => clock.city === form.city).length === 0) {
      setClocks((prevClocks) => [...prevClocks, { id: nanoid(), city: form.city, offset: form.offset }]);
    }
    setForm({ id: '', city: '', offset: '' }); // Очистим форму после отправки
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnDelete = (id: string) => {
    setClocks((prevClocks) => prevClocks.filter(clock => clock.id !== id));
  };

  return (
    <>
      <Form changeField={handleOnChange} submit={handleSubmit} />
      <div className="watches-box">
        {clocks.map((clock) => (
          <Watch data={clock} onDelete={() => handleOnDelete(clock.id)} key={clock.id} />
        ))}
      </div>
    </>
  );
}

export default App
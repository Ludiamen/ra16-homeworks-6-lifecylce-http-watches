interface Iform {
    changeField: (e: React.ChangeEvent<HTMLInputElement>) => void,
    submit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = ({ submit, changeField }: Iform) => {
  return (
    <form className="form" onSubmit={submit}>
        <div className="input-box">
            <label htmlFor="city">Название</label>
            <input type="text" name="city" id="city" onChange={changeField}/>
        </div>
        <div className="input-box">
            <label htmlFor="offset">Временная зона</label>
            <input type="text" name="offset" id="offset" onChange={changeField}/>
        </div>
        <button className="submit-btn">Добавить</button>
    </form>
  )
}
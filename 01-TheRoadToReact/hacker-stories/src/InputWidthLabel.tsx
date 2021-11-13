import React from 'react'

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
}

const InputWithLabel = ({id, value, onInputChange, type='text', children, isFocused}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input 
        ref={inputRef}
        id="search" 
        autoFocus={isFocused} 
        value={value} 
        onChange={onInputChange} 
        type={type}
      />
    </>
  )
}

export default InputWithLabel
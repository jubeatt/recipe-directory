export default function FormField ({ 
  type, value, disabled, onChange, border=false, ...props
}) {
  if (type === 'text') {
    return (
      <input 
        className={`input-field ${border ? 'border' : ''}`}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  } else if (type === 'textarea') {
    return (
      <textarea 
        className={`input-field ${border ? 'border' : ''}`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      ></textarea>
    )
  } else if (type === 'number') {
    return (
      <input 
        className={`input-field ${border ? 'border' : ''}`}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
}
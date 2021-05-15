export default function FormInput({
  name,
  value,
  type,
  placeholder,
  onChange,
  className,
}) {
  return (
    <input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={
        "w-60 mb-9 bg-gray-100 px-2 py-1 rounded filter drop-shadow " +
        className
      }
      autoComplete="off"
    />
  );
}

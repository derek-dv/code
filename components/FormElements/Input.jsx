import { useFormContext } from "react-hook-form";

const Input = ({ id, name, label, placeholder, error, ...rest }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={id} className="block font-semibold text-sm mb-1">
          {label} :
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        className={`border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded py-2 px-3 w-full outline-none focus:border-blue-500`}
        placeholder={placeholder}
        {...rest}
        {...register(id)}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

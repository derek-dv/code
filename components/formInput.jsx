import { FormControl, TextField } from "@material-ui/core";

function Input({ type, label, setValue, error, required = true }) {
  return (
    <FormControl fullWidth>
      <TextField
        label={label ? label : "Label"}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        type={type ? type : "text"}
        error={error ? true : false}
        helperText={error ? error : null}
        required={required}
      />
    </FormControl>
  );
}

export default Input;

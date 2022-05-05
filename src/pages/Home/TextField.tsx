import { useField } from 'formik';

type TextFieldProps = {
  name: string;
};

const TextField = ({ name, ...otherProps }: TextFieldProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };

  return (
    <>
      <TextField {...configTextField} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export default TextField;

import { Controller, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import InfoIcon from '../InfoIcon/InfoIcon';

interface SelectedFieldProps 
{
    name: string;
    control: Control<any>;
    defaultValue?: string;
    rules?: any;
    options: { value: string; label: string }[];
    label?: string;
    firstOption?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    showLabel: boolean;
}

const SelectField: React.FC<SelectedFieldProps> = ({ name, control, defaultValue, rules, options, label, firstOption, error, showLabel }) => 
{  
  return (
    <section>
        {showLabel && <section className='flex items-center gap-2'>
          <label htmlFor={name} className='text-lg sm:text-md'>{label}</label>
          <InfoIcon />
        </section>}
        <Controller 
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <select 
                id={name}
                { ...field }
                className="mt-2 select select-bordered select-md sm:select-sm w-full overflow-hidden sm:max-w-md text-lg sm:text-xs" 
            >
              <option disabled value="" className='w-16 text-xs sm:w-auto sm:text-base'>{firstOption}</option>
              {options.map((option) => (
                <option key={option.label} value={option.value} className='w-16 text-xs sm:w-auto sm:text-base'>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        
        {error && <p className="text-red-500 font-semibold">{error.message?.toString() || 'Error'}</p>}
    </section>
)};

export default SelectField;
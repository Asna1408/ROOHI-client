// FormField.tsx
import React from 'react';

interface FormComponentProps {
  label: string;
  value: string | number | undefined;
  disabled?: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ label, value, disabled }) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        className="border w-full p-2 rounded bg-gray-200"
      />
    </div>
  );
};

export default FormComponent;

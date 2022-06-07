import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (value: string) => void;
}

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">All</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

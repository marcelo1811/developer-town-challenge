import React, { ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  children: ReactNode;
  onChange: (value: string) => void;
}

const Select = ({ children, onChange }: SelectProps) => {
  return <select onChange={(e) => onChange(e.target.value)}>{children}</select>;
};

export default Select;

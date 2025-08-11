import * as React from 'react';
import { Controller, type Control, type FieldValues, type ControllerRenderProps, type Path } from 'react-hook-form';

export function Form(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  return <form {...props} />;
}

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  render: (props: { field: ControllerRenderProps<T> }) => React.ReactElement;
}

export function FormField<T extends FieldValues>({ control, name, render }: FormFieldProps<T>) {
  return <Controller control={control} name={name} render={render} />;
}

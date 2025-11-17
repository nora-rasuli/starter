import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { z } from 'zod'

export function useZodForm<TSchema extends z.ZodType>(
  schema: TSchema,
  defaultValues?: Partial<z.infer<TSchema>>
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<TSchema>,
  })
}

export function getFieldError<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>
): string | undefined {
  const error = form.formState.errors[name]
  return error?.message as string | undefined
}

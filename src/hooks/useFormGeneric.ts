'use client';

import { FormEvent, useEffect, useTransition, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
// Utils & Actions
import { populateActionErrors, populateFormData, populateFormValues } from '@/utils';
// Types
import type { TOGGLE_TABS, ActionReturnType } from '../constants';

interface UseToolsForm<T> {
  selectedItem: T;
  id: number | null;
  setTab: (tab: TOGGLE_TABS) => void;
  setSelectedItem: (tool: T) => void;
  setFormMainError: (error: string) => void;
  editFormSchema: z.ZodObject<any>;
  onSubmitForm: (prevState: ActionReturnType<T>, formData: FormData) => Promise<ActionReturnType<T>>;
  path: string | null;
  storageItem: string | null;
}

const useGenericForm = <T extends Record<string, any>>({
  selectedItem,
  id,
  setTab,
  setFormMainError,
  setSelectedItem,
  editFormSchema,
  onSubmitForm,
  path,
  storageItem,
}: UseToolsForm<T>) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [formState, formAction] = useFormState(onSubmitForm, {
    message: '',
    status: 0,
    issues: [],
    item: null,
  });

  const populatedValues = useMemo(() => populateFormValues(selectedItem, id), [selectedItem, id]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    values: populatedValues,
  });

  useEffect(() => {
    if (formState.status === 400 && formState.issues) {
      populateActionErrors<z.output<typeof editFormSchema>>(formState.issues, setError);
      setFormMainError(formState.message);
    } else if (formState.status === 200) {
      setFormMainError('');

      const updatedItem: Record<string, any> = {};
      Object.entries(selectedItem).forEach(([key]) => {
        return (updatedItem[key] = watch(key));
      });

      if (formState.item) {
        setSelectedItem({
          ...selectedItem,
          ...formState.item,
        });
      }

      setTab('list');
      if (storageItem) localStorage.removeItem(storageItem);
      if (path) router.push(path);

      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const formSubmitAction = (e: FormEvent<HTMLFormElement>) => {
    startTransition(() => {
      e.preventDefault();
      handleSubmit(() => {
        let formData: FormData;
        if (id) {
          formData = populateFormData(watch(), { id });
        } else {
          formData = populateFormData(watch());
        }
        formAction(formData);
      })(e);
    });
  };

  return {
    formSubmitAction,
    register,
    control,
    errors,
    isSubmitting,
    formAction,
    isPending,
  };
};

export default useGenericForm;

'use client';

import { FormEvent, useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
// Store
import { useToolsStore } from '@/features/tools/store/useTools';
// Utils & Actions
import { onSubmitForm } from '../actions/editForm';
import { editFormSchema } from '../schemas/editFormSchema';
import { populateActionErrors, populateFormData } from '@/utils';
import { ToolLevel } from '../types';

// TODO - Quando tiver outro form pronto vêr se consigo passar esta lógica toda para uma hook generica

const useToolsForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [formState, formAction] = useFormState(onSubmitForm, {
    message: '',
    status: 0,
    issues: [],
  });

  const selectedTool = useToolsStore(state => state.selectedTool);
  const setTab = useToolsStore(state => state.setTab);
  const setSelectedTool = useToolsStore(state => state.setSelectedTool);
  const setFormMainError = useToolsStore(state => state.setFormMainError);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    values: {
      name: selectedTool?.name ?? '',
      description: selectedTool?.description ?? '',
      types: selectedTool?.types ?? [],
      level: Number(selectedTool?.level) ?? 0,
      icon_url: selectedTool?.icon_url ?? '',
    },
  });

  useEffect(() => {
    if (formState.status === 400 && formState.issues) {
      populateActionErrors<z.output<typeof editFormSchema>>(formState.issues, setError);
      setFormMainError(formState.message);
    } else if (formState.status === 200) {
      setFormMainError('');
      setTab('list');
      if (selectedTool) {
        setSelectedTool({
          ...selectedTool,
          name: watch('name'),
          description: watch('description'),
          types: watch('types'),
          level: watch('level').toString() as ToolLevel,
          icon_url: watch('icon_url'),
        });
      }
      router.refresh();
    }
  }, [formState, setError, errors, setTab, setFormMainError, router, setSelectedTool, selectedTool, watch]);

  const formSubmitAction = (e: FormEvent<HTMLFormElement>) => {
    startTransition(() => {
      e.preventDefault();
      handleSubmit(() => {
        const formData = populateFormData(watch(), { id: selectedTool?.id });
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

export default useToolsForm;

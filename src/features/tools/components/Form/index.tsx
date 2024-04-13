'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Gradient, Button } from '@/design-system/atoms';
import { useToolsStore } from '../../store/useTools';
import { InputText, ImgUploader, Textarea } from '@/design-system/molecules';
import type { ToolT, ToolsForm } from '../../types';

interface ToolFormProps {
  tool?: ToolT;
}

const ToolForm = ({ tool }: ToolFormProps) => {
  const selectedTool = useToolsStore(state => state.selectedTool);

  console.log('🚀 ~ ToolForm ~ tool:', tool);
  console.log('🚀 ~ Detail ~ selectedTool:', selectedTool);

  const {
    register,
    handleSubmit,
    // T setError,
    formState: { errors, isSubmitting },
  } = useForm<ToolsForm>({
    defaultValues: {
      name: selectedTool?.name ?? '',
      description: '',
      types: [],
      level: 0,
      icon_url: '',
    },
  });

  const onSubmit: SubmitHandler<ToolsForm> = async data => {
    console.log(data);
  };

  return (
    <Gradient extraClasses='p-1 rounded-sm'>
      <div className='flex flex-col bg-accent px-2 py-4 lg:px-8'>
        <div className='flex flex-wrap justify-between gap-10 lg:flex-nowrap'>
          <div className='flex'>
            <h1 className='text-[22px] text-text'>Edit&nbsp;</h1>
            <h1 className='text-[22px] text-primary'>{selectedTool?.name}&nbsp;</h1>
            <h1 className='text-[22px] text-text'>tool:</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-5 flex w-full flex-col items-end gap-6 lg:mt-0 lg:w-[70%]'>
            {/* // TODO
              Falta testar com o react-hook-form e adicionar a lógica de dár upload de imagens com o supabase;
              Basicamente ao dár upload o react-hook-form deve ser atualizado e quando dér submit faço primeiro
              o upload da imagem e depois o submit do form
            */}
            <ImgUploader
              register={{ ...register('icon_url') }}
              image={selectedTool?.icon_url}
              label='Add the tool icon'
              required
              id='tool-icon-input'
              onChange={e => console.log(e)}
            />
            <InputText
              label='Name'
              placeholder='Type the tool name'
              id='name'
              disabled={isSubmitting}
              register={{ ...register('name', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.name ? false : true}
              helpText={errors.name?.message ?? ''}
              required
            />
            <Textarea
              label='Description'
              register={{
                ...register('description', {
                  minLength: { value: 20, message: 'The field must be larger than 20 chars!' },
                }),
              }}
              placeholder='Type the tool description'
              id='description'
              disabled={isSubmitting}
              valid={errors.name ? false : true}
              helpText={errors.name?.message ?? ''}
            />
            <div className='flex w-full items-center gap-4'>
              <Select
                id='level'
                placeholder='Select the level'
                options={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                  { label: '5', value: 5 },
                  { label: '6', value: 6 },
                  { label: '7', value: 7 },
                  { label: '8', value: 8 },
                  { label: '9', value: 9 },
                  { label: '10', value: 10 },
                ]}
                onChange={e => console.log(e)}
                className='w-1/3'
              />

              <Select
                id='types'
                name='types'
                options={[
                  { label: 'Frontend', value: 'frontend' },
                  { label: 'Backend', value: 'backend' },
                  { label: 'CI / CD', value: 'ci_cd' },
                  { label: 'Design', value: 'design' },
                  { label: 'Testing', value: 'testing' },
                ]}
                isMulti
                placeholder='Select the types'
                onChange={e => console.log(e)}
                className='w-2/3'
              />
            </div>

            <Button label='Submit' />
          </form>
        </div>
      </div>
    </Gradient>
  );
};

export default ToolForm;

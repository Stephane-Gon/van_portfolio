'use client';

import { Controller } from 'react-hook-form';
// Components
import { Gradient, Button } from '@/design-system/atoms';
import { InputText, ImgUploader, Textarea, SelectInput } from '@/design-system/molecules';
// Store
import { useToolsStore } from '@/features/tools/store/useTools';
import useToolsForm from '../../hooks/useToolsForm';
// Types & Constants
import { LevelOptions, SkillTypesOptions } from '@/constants/options';
import type { SkillTypes, SelectOption } from '@/constants';

const ToolForm = () => {
  const { formAction, formSubmitAction, errors, isSubmitting, control, register, isPending } = useToolsForm();

  const selectedTool = useToolsStore(state => state.selectedTool);

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
            action={formAction}
            onSubmit={evt => formSubmitAction(evt)}
            className='mt-5 flex w-full flex-col items-end gap-6 lg:mt-0 lg:w-[70%]'>
            <Controller
              name='icon_url'
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImgUploader
                  image={value}
                  label='Add the tool icon'
                  required
                  id='tool-icon-input'
                  name='icon_url'
                  onChange={value => onChange(value)}
                  valid={errors.icon_url ? false : true}
                  helpText={(errors.icon_url?.message as string) ?? ''}
                />
              )}
              rules={{ required: { value: true, message: 'This field is required!' } }}
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
              control={control}
              placeholder='Type the tool description'
              id='description'
              name='description'
              disabled={isSubmitting}
              valid={errors.description ? false : true}
              helpText={errors.description?.message ?? ''}
            />
            <div className='flex w-full flex-wrap items-center gap-4 lg:flex-nowrap'>
              <Controller
                name='level'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    label='Level'
                    id='level'
                    value={LevelOptions.find(opt => opt.value === value)}
                    onChange={val => onChange(val?.value)}
                    options={LevelOptions}
                    placeholder='Select the level'
                    required
                    valid={errors.level ? false : true}
                    helpText={errors.level?.message ?? ''}
                  />
                )}
                rules={{ required: { value: true, message: 'This field is required!' } }}
              />

              <Controller
                name='types'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    label='Types'
                    id='types'
                    value={SkillTypesOptions.filter(opt => value.includes(opt.value as SkillTypes))}
                    onChange={val => onChange(val?.map((v: SelectOption) => v.value))}
                    options={SkillTypesOptions}
                    placeholder='Select one or more types'
                    required
                    valid={errors.types ? false : true}
                    isMulti
                    helpText={errors.types?.message ?? ''}
                  />
                )}
                rules={{ required: { value: true, message: 'This field is required!' } }}
              />
            </div>
            <Button label='Submit' type='submit' loading={isPending} disabled={isPending} />
          </form>
        </div>
      </div>
    </Gradient>
  );
};

export default ToolForm;

'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// Components
import { Gradient, Button } from '@/design-system/atoms';
import { InputText, Textarea, SelectInput, DatePicker } from '@/design-system/molecules';
// Store
import { useWorksStore } from '@/features/works/store/useWorks';
// Actions & Hooks
import useGenericForm from '@/hooks/useFormGeneric';
import { formSchema } from '../../schemas/formSchema';
import { onSubmitForm } from '../../actions/submitForm';
import { deleteWork } from '../../actions/deleteWork';
// Types & Constants
import { WorkT, defaultWork } from '../../types';
import { SkillTypesOptions } from '@/constants/options';
import type { SkillTypes, SelectOption } from '@/constants';

interface WorkFormProps {
  isEdit: boolean;
}

const WorkForm = ({ isEdit }: WorkFormProps) => {
  const router = useRouter();
  const selectedWork = useWorksStore(state => state.selectedWork);
  const setTab = useWorksStore(state => state.setTab);
  const setSelectedWork = useWorksStore(state => state.setSelectedWork);
  const setFormMainError = useWorksStore(state => state.setFormMainError);

  const { formAction, formSubmitAction, errors, isSubmitting, control, register, isPending, watch } =
    useGenericForm<WorkT>({
      selectedItem: isEdit ? selectedWork : defaultWork,
      setTab,
      setSelectedItem: setSelectedWork,
      setFormMainError,
      formSchema,
      onSubmitForm,
      id: isEdit ? selectedWork?.id : null,
      path: isEdit ? null : '/works',
      storageItem: 'selectedWork',
    });

  const _renderFormTitle = () => {
    return (
      <div className='flex'>
        {isEdit ? (
          <>
            <h1 className='text-[22px] text-text'>Edit&nbsp;</h1>
            <h1 className='text-[22px] text-primary'>{selectedWork?.company}&nbsp;</h1>
            <h1 className='text-[22px] text-text'>work:</h1>
          </>
        ) : (
          <>
            <h1 className='text-[22px] text-text'>Add&nbsp;</h1>
            <h1 className='text-[22px] text-text'>work:</h1>
          </>
        )}
      </div>
    );
  };

  const _renderDeleteBtn = () => {
    return (
      isEdit && (
        <div className='w-full 2sm:w-1/4'>
          <Button
            label='Delete'
            variant='danger'
            onClick={async () => {
              const res = await deleteWork(selectedWork);
              if (res.error) {
                setFormMainError(res.error.message);
                return;
              } else {
                setTab('list');
                localStorage.removeItem('selectedWork');
                setSelectedWork(defaultWork);
                router.refresh();
              }
            }}
          />
        </div>
      )
    );
  };

  console.log('FORM', watch());
  console.log('ERRORS', errors);

  return (
    <Gradient extraClasses='p-1 rounded-sm'>
      <div className='flex flex-col bg-accent px-2 py-4 lg:px-8'>
        <div className='flex flex-wrap justify-between gap-10 lg:flex-nowrap'>
          {_renderFormTitle()}
          <form
            action={formAction}
            onSubmit={evt => formSubmitAction(evt)}
            className='mt-5 flex w-full flex-col items-end gap-6 lg:mt-0 lg:w-[70%]'>
            <InputText
              label='Company Name'
              placeholder='Type the company name'
              id='company'
              disabled={isSubmitting}
              register={{ ...register('company', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.company ? false : true}
              helpText={(errors.company?.message as string) ?? ''}
              required
            />

            <InputText
              label='Role'
              placeholder='Type what was your role'
              id='role'
              disabled={isSubmitting}
              register={{ ...register('role', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.role ? false : true}
              helpText={(errors.role?.message as string) ?? ''}
              required
            />

            <Textarea
              label='Description'
              control={control}
              placeholder='Type the work description'
              id='description'
              name='description'
              disabled={isSubmitting}
              valid={errors.description ? false : true}
              helpText={(errors.description?.message as string) ?? ''}
            />

            <Textarea
              label='Achievements'
              control={control}
              placeholder='Type the work achievements'
              id='achievements'
              name='achievements'
              disabled={isSubmitting}
              valid={errors.achievements ? false : true}
              helpText={(errors.achievements?.message as string) ?? ''}
            />

            <Controller
              name='skills'
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label='Skills'
                  id='skills'
                  value={SkillTypesOptions.filter(opt => value.includes(opt.value as SkillTypes))}
                  onChange={val => onChange(val?.map((v: SelectOption) => v.value))}
                  options={SkillTypesOptions}
                  placeholder='Select one or more skills'
                  required
                  valid={errors.skills ? false : true}
                  isMulti
                  helpText={(errors.skills?.message as string) ?? ''}
                />
              )}
              rules={{ required: { value: true, message: 'This field is required!' } }}
            />

            <div className='flex w-full flex-wrap items-center justify-between gap-4 lg:flex-nowrap'>
              <Controller
                name='started_at'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    id='startDate'
                    label='Start Date'
                    disabled={isSubmitting}
                    valid={errors.startDate ? false : true}
                    helpText={(errors.startDate?.message as string) ?? ''}
                    required
                    onChange={onChange}
                    value={value}
                  />
                )}
                rules={{ required: { value: true, message: 'This field is required!' } }}
              />

              <Controller
                name='ended_at'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    id='endDate'
                    label='End Date'
                    disabled={isSubmitting}
                    valid={errors.endDate ? false : true}
                    helpText={(errors.endDate?.message as string) ?? ''}
                    required
                    onChange={onChange}
                    value={value}
                  />
                )}
                rules={{ required: { value: true, message: 'This field is required!' } }}
              />
            </div>

            <div className='flex w-full flex-wrap justify-between gap-2'>
              {_renderDeleteBtn()}
              <div className='ml-auto w-full 2sm:w-1/4'>
                <Button label='Submit' type='submit' loading={isPending} disabled={isPending} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Gradient>
  );
};

export default WorkForm;

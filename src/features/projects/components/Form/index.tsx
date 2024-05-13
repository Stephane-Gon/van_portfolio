'use client';

import { Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
// Components
import { Gradient, Button } from '@/design-system/atoms';
import { InputText, ImgUploader, Textarea, SelectInput, MultipleImgUploader } from '@/design-system/molecules';
// Store
import { useProjectsStore } from '@/features/projects/store/useProjects';
// Actions & Hooks
import useGenericForm from '@/hooks/useFormGeneric';
import { deleteProject } from '../../actions/deleteProject';
import { onSubmitForm } from '../../actions/editForm';
import { formSchema } from '../../schemas/formSchema';
// Types
import { defaultProject, ProjectT } from '@/features/projects/types';
import { SkillTypesOptions } from '@/constants/options';
import type { SkillTypes, SelectOption } from '@/constants';

interface ProjectFormProps {
  isEdit: boolean;
}

const ProjectForm = ({ isEdit }: ProjectFormProps) => {
  const router = useRouter();
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const setTab = useProjectsStore(state => state.setTab);
  const setSelectedProject = useProjectsStore(state => state.setSelectedProject);
  const setFormMainError = useProjectsStore(state => state.setFormMainError);

  const { formAction, formSubmitAction, errors, isSubmitting, control, register, isPending } = useGenericForm<ProjectT>(
    {
      selectedItem: isEdit ? selectedProject : defaultProject,
      setTab,
      setSelectedItem: setSelectedProject,
      setFormMainError,
      formSchema,
      onSubmitForm,
      id: isEdit ? selectedProject?.id : null,
      path: isEdit ? null : '/projects',
      storageItem: 'selectedProject',
    },
  );

  const _renderFormTitle = () => {
    return (
      <div className='flex'>
        {isEdit ? (
          <>
            <h1 className='text-[22px] text-text'>Edit&nbsp;</h1>
            <h1 className='text-[22px] text-primary'>{selectedProject?.title}&nbsp;</h1>
            <h1 className='text-[22px] text-text'>project:</h1>
          </>
        ) : (
          <>
            <h1 className='text-[22px] text-text'>Add&nbsp;</h1>
            <h1 className='text-[22px] text-text'>project:</h1>
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
              const res = await deleteProject(selectedProject);
              if (res.error) {
                setFormMainError(res.error.message);
                return;
              } else {
                setTab('list');
                localStorage.removeItem('selectedProject');
                setSelectedProject(defaultProject);
                router.refresh();
              }
            }}
          />
        </div>
      )
    );
  };

  // TODO - TESTAR FORM
  //* Começar input a input;
  //* Vejo se pass a validação;
  //* Se chega á form action;
  //* Se passa a validação na form action;
  //* E começo a gravar na db;

  return (
    <Gradient extraClasses='p-1 rounded-sm'>
      <div className='flex flex-col bg-accent px-2 py-4 lg:px-8'>
        <div className='flex flex-wrap justify-between gap-10 lg:flex-nowrap'>
          {_renderFormTitle()}
          <form
            action={formAction}
            onSubmit={evt => formSubmitAction(evt)}
            className='mt-5 flex w-full flex-col items-end gap-10 lg:mt-0 lg:w-[70%]'>
            <Controller
              name='main_image'
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImgUploader
                  image={value}
                  label='Add the project main image'
                  required
                  id='project-main-image-input'
                  name='main_image'
                  onChange={value => onChange(value)}
                  valid={errors.main_image ? false : true}
                  helpText={(errors.main_image?.message as string) ?? ''}
                />
              )}
              rules={{ required: { value: true, message: 'This field is required!' } }}
            />
            <InputText
              label='Title'
              placeholder='Type the project title'
              id='title'
              disabled={isSubmitting}
              register={{ ...register('title', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.title ? false : true}
              helpText={(errors.title?.message as string) ?? ''}
              required
            />
            <InputText
              label='Slogan'
              placeholder='Type the project slogan'
              id='slogan'
              disabled={isSubmitting}
              register={{ ...register('slogan', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.slogan ? false : true}
              helpText={(errors.slogan?.message as string) ?? ''}
            />
            <InputText
              label='Repository'
              placeholder='Type the project repository'
              id='repository'
              disabled={isSubmitting}
              register={{
                ...register('repository', { required: { value: true, message: 'This field is required!' } }),
              }}
              valid={errors.repository ? false : true}
              helpText={(errors.repository?.message as string) ?? ''}
            />
            <InputText
              label='Website Url'
              placeholder='Type the project website url'
              id='live_link'
              disabled={isSubmitting}
              register={{ ...register('live_link', { required: { value: true, message: 'This field is required!' } }) }}
              valid={errors.live_link ? false : true}
              helpText={(errors.live_link?.message as string) ?? ''}
            />
            <Textarea
              label='Description'
              control={control}
              placeholder='Type the project description'
              id='description'
              name='description'
              disabled={isSubmitting}
              valid={errors.description ? false : true}
              helpText={(errors.description?.message as string) ?? ''}
            />
            <Textarea
              label='Challenges I faced during the process'
              control={control}
              placeholder='Type the project challenges'
              id='challenges'
              name='challenges'
              disabled={isSubmitting}
              valid={errors.challenges ? false : true}
              helpText={(errors.challenges?.message as string) ?? ''}
            />
            <Textarea
              label='What I Learned during the process'
              control={control}
              placeholder='Type what you learned'
              id='learned'
              name='learned'
              disabled={isSubmitting}
              valid={errors.learned ? false : true}
              helpText={(errors.learned?.message as string) ?? ''}
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

            <Controller
              name='images'
              control={control}
              render={({ field: { onChange, value } }) => (
                <MultipleImgUploader
                  images={value}
                  label='Add the project secondary images'
                  required
                  id='project-images-input'
                  name='images'
                  onChange={value => onChange(value)}
                  valid={errors.images ? false : true}
                  helpText={(errors.images?.message as string) ?? ''}
                />
              )}
              rules={{ required: { value: true, message: 'This field is required!' } }}
            />

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

export default ProjectForm;

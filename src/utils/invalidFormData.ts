import { ZodIssue } from 'zod';

type FormData = {
  [k: string]: FormDataEntryValue;
};

const invalidFormData = (issues: ZodIssue[], rawFormData: FormData) => {
  const fields: Record<string, string> = {};
  for (const key of Object.keys(rawFormData)) {
    fields[key] = rawFormData[key].toString();
  }

  return {
    status: 400,
    message: 'Failed on zod parse schema.',
    issues: issues.map((issue: ZodIssue) => ({
      message: issue.message,
      fields: issue.path,
    })),
  };
};

export default invalidFormData;

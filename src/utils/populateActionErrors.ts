import { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import type { Issue } from '@/constants';

const pupulateActionErrors = <T extends FieldValues>(issues: Issue[], setError: UseFormSetError<T>) => {
  for (const issue of issues) {
    if (issue.fields) {
      for (const field of issue.fields) {
        setError(field.toString() as Path<T>, {
          type: 'manual',
          message: issue.message ?? 'An error occurred',
        });
      }
    }
  }
};

export default pupulateActionErrors;

import * as yup from 'yup';

export const responsibilitiesSchema = yup.object({
  responsibilities: yup.string().max(2000, 'My responsibilities must not exceed 2000 symbols'),
});

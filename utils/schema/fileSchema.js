import * as yup from "yup";

export const updateFileSchema = yup.object().shape({
  file_name: yup.string().min(3).required(),
});

export const newFileSchema = yup.object().shape({
  file_name: yup.string().min(3).required(),
});

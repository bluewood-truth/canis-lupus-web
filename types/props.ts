/* eslint-disable camelcase */
import {ButtonProps} from '@chakra-ui/button';
import {InputProps} from '@chakra-ui/input';
import {TextareaProps} from '@chakra-ui/textarea';
import {FormError} from './hook';

export interface ProductProps {
  id: string;
  title: string;
  desc: string;
  memberCount: number;
  url: string;
  imageUrl: string;
  tags: string[];
}

export interface FormContentProps {
  onSubmit: () => void;
  isLoading?: boolean;
  heading?: string;
}

export interface FormProps {
  error?: FormError;
  label?: string;
  helperText?: string;
  helperTextColor?: InputProps['color'];
}

export interface InputFormProps extends FormProps, InputProps {}

export interface TextareaFormProps extends FormProps, TextareaProps {}

export interface ButtonFormProps extends FormProps, ButtonProps {}

export interface CheckboxFormProps extends FormProps {
  itemList: CheckboxItemList[];
  checked: string[];
  onCheckboxChange: (checkboxItem: string, isChecked: boolean) => void;
  label?: string;
  isLoading?: boolean;
}

export interface CheckboxItemList {
  name: string;
  value: string;
}

export interface ImageUploadFormProps {
  onImageChange?: (imageUrl: string) => void;
  onImageUploading?: (isUploading: boolean) => void;
}

export interface ImageUploadButtonProps extends ImageUploadFormProps {
  imageType: 'users' | 'meetings' | 'posts' | 'categories';
}

import {FormContentProps} from 'types/props';
import SubmitButton from 'components/form/formContent/sub/SubmitButton';
import CheckboxForm from 'components/form/formContent/CheckboxForm';
import useSelectInterestsHooks from 'hooks/register/useSelectInterestsHooks';
import useCategoryList from 'hooks/api/useCategoryList';
import LoadingSpinner from 'components/common/LoadingSpinner';
import FormStepWrapper from 'components/form/FormStepWrapper';

const formDataKeys = ['categories'];

const SelectInterestsStep = (props: FormContentProps) => {
  const {checked, onCheckboxChange, onSubmitClick} = useSelectInterestsHooks();
  const {categoryList, isLoading} = useCategoryList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <FormStepWrapper {...props} formDataKeys={formDataKeys}>
      <CheckboxForm
        itemList={
          isLoading ?
            [] :
            Object.values(categoryList).map((item) => {
                return {name: item.name, value: item._id};
              })
        }
        checked={checked}
        onCheckboxChange={onCheckboxChange}
      />
      <SubmitButton onClick={onSubmitClick} isLoading={props.isLoading}>
        회원가입
      </SubmitButton>
    </FormStepWrapper>
  );
};

export default SelectInterestsStep;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getProfilePicture, postProfilePicture } from '../../redux/slices/ProfileSlice';
import { decodeToken } from '../../utils/AuthService';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const disPatch = useDispatch<AppDispatch>();
  const { register, handleSubmit,setValue } = useForm();
  const userData = decodeToken();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('photo', file);  // Set the file object into react-hook-form
      handleSubmit(onSubmit)();
    }
  };


  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('profilePicture',data.photo)
    const res = disPatch(postProfilePicture(formData));
    if(res.payload.isSuccess){
      const res2 = disPatch(getProfilePicture(userData.UserId));
    }
  };
  return (
    <form>
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
    >
      Change Photo
      <VisuallyHiddenInput type="file"  {...register('photo')} onChange={handleFileChange} />
     </Button>

    </form>
  );
}

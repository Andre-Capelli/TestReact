import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import React, { forwardRef, memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { post } from '../core/axios';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, editItem, selectItem, setItem } from '../store/formSlice';

const Form = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);

  const schema = yup.object().shape({
    name: yup.string().required('Input Required'),
    email: yup.string().required('Input Required').email(),
    phone_number: yup.object().shape({
      phone: yup.string(),
      prefix: yup.string(),
    }),
  });

  const defaultValues = {
    name: '',
    email: '',
    phone_number: { phone: '', prefix: '' },
  };

  const {
    control,
    handleSubmit,
    formState: { dirtyFields, isValid, errors },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const form = watch();

  useEffect(() => {
    reset({ ...defaultValues, ...(item || {}) });
  }, [reset, item]);

  const onSubmit = async (data) => {
    try {
      if (item)
        return dispatch(editItem(data))
          .then(() => {
            reset();
            dispatch(setItem(null));
          })
          .catch((e) => console.log(e));

      dispatch(createItem(data))
        .then((r) => {
          console.log(r);
          reset();
        })
        .catch((e) => console.log(e));
    } catch (error) {}
  };

  return (
    <div className="w-full h-full flex flex-col space-y-24">
      <Box className={'w-full flex flex-row items-center space-x-5'}>
        <Typography>Formulário</Typography>

        <Divider className="w-full flex flex-1" />
      </Box>

      <Controller
        control={control}
        name={'name'}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Nome"
            label={'Nome'}
            helperText={errors?.name?.message}
            error={!!errors?.name}
            required
          />
        )}
      />

      <Controller
        control={control}
        name={'email'}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Email"
            label={'Email'}
            helperText={errors?.email?.message}
            error={!!errors?.email}
            required
          />
        )}
      />

      <Controller
        control={control}
        name={'phone_number.phone'}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder=""
            label={'Phone'}
            helperText={errors?.phone_number?.phone?.message}
            error={!!errors?.phone_number?.phone}
            required
            type="number"
          />
        )}
      />

      <Controller
        control={control}
        name={'phone_number.prefix'}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder=""
            label={'Prefix'}
            helperText={errors?.phone_number?.prefix?.message}
            error={!!errors?.phone_number?.prefix}
            required
            type="number"
          />
        )}
      />

      <Box className="flex flex-row justify-end bottom-0 w-full py-20 !mt-auto">
        <Button
          className="ml-auto"
          onClick={handleSubmit(onSubmit)}
          disabled={_.isEmpty(dirtyFields) || !isValid}
        >
          {'Salvar'}
        </Button>
      </Box>
    </div>
  );
});

export default memo(Form);

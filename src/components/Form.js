import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { forwardRef, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { post } from "../core/axios";
import { useDispatch } from "react-redux";
import { createItem } from "../store/formSlice";

const Form = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required("Input Required"),
    email: yup.string().required("Email required"),
    phone_number: yup.object().shape({
      phone: yup.string().required("Phone required"),
      prefix: yup.string().required("Prefix required"),
    }),
  });

  const defaultValues = {
    name: "",
    email: "",
    phone_number: {
      phone: "",
      prefix: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { dirtyFields, isValid, errors },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const form = watch();

  const onSubmit = async (data) => {
    try {
      dispatch(createItem(data))
        .then((r) => {
          reset(defaultValues);
        })
        .catch((e) => console.log(e));
    } catch (error) {}
  };

  return (
    <div className="w-full h-full flex flex-col space-y-24">
      <Box className={"w-full flex flex-row items-center space-x-5"}>
        <Typography>Formulário</Typography>

        <Divider className="w-full flex flex-1" />
      </Box>

      <Controller
        control={control}
        name={"name"}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Nome"
            label={"Nome"}
            helperText={errors?.name?.message}
            error={!!errors?.name}
            required
          />
        )}
      />

      <Controller
        name={"email"}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Email"
            label={"Email"}
            helperText={errors?.email?.message}
            error={!!errors?.email}
            required
          />
        )}
      />

      <Controller
        name={"phone_number.phone"}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Phone number"
            label={"Phone number"}
            helperText={errors?.phone_number?.phone?.message}
            error={!!errors?.phone_number?.phone}
            required
          />
        )}
      />

      <Controller
        name={"phone_number.prefix"}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="Phone prefix"
            label={"Phone Prefix"}
            helperText={errors?.phone_number?.prefix?.message}
            error={!!errors?.phone_number?.prefix}
            required
          />
        )}
      />

      <Box className="flex flex-row justify-end bottom-0 w-full py-20 !mt-auto">
        <Button
          className="ml-auto"
          onClick={handleSubmit(onSubmit)}
          disabled={_.isEmpty(dirtyFields) || !isValid}
        >
          {"Salvar"}
        </Button>
      </Box>
    </div>
  );
});

export default memo(Form);

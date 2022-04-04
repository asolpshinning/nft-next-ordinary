import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect } from "react";
import {
  DefaultValues,
  FieldPath,
  FormProvider,
  useForm,
} from "react-hook-form";

export const TWForm = (props) => {
  const isRequired = useCallback((name) => {
      return name in props.schema.shape
        ? !props.schema.shape[name].isOptional()
        : true;
    },
    [props.schema],
  );

  const methods = useForm({
    resolver: zodResolver(props.schema),
    defaultValues: props.initialValueQuery?.data,
    context: {
      // we're abusing this here, but it's a nice way to get the schema
      isRequired,
    },
  });

  useEffect(() => {
    if (props.initialValueQuery?.isSuccess && !methods.formState.isDirty) {
      methods.reset(props.initialValueQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValueQuery?.data, props.initialValueQuery?.isSuccess]);

  return (
    <FormProvider {...methods}>
      <form
        onReset={() => methods.reset(props.initialValueQuery?.data)}
        onSubmit={methods.handleSubmit(props.onSubmit)}
      >
        {props.children}
      </form>
    </FormProvider>
  );
};

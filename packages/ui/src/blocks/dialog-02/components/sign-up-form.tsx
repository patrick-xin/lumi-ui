"use client";

import { Button } from "@lumi-ui/ui/button";
import { Field, FieldControl, FieldError, FieldLabel } from "@lumi-ui/ui/field";
import { Form } from "@lumi-ui/ui/form";
import { Input } from "@lumi-ui/ui/input";
import * as React from "react";

export type IImage = {
  alt: string;
  src: string;
  views: number;
  downloads: number;
};

interface SignUpFormProps {
  image: IImage;
  onSuccess?: () => void;
}

export function SignUpForm({ image, onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return (
    <div className="flex max-h-full">
      <div className="hidden w-1/3 lg:block relative">
        <img
          alt={image.alt}
          className="h-full w-full object-cover rounded-l-md"
          src={image.src}
        />
        <div className="absolute bottom-4 left-4 text-white/80 text-xs bg-black/20 p-2 rounded backdrop-blur-sm">
          Photo viewed {image.views.toLocaleString()} times
        </div>
      </div>

      <div className="flex w-full flex-col justify-center p-4 sm:p-8 lg:w-2/3">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Join Us
            </h1>
            <p className="mt-2 text-muted-foreground">
              Already have an account? <Button variant={"link"}>Login</Button>
            </p>
          </div>

          <Form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <FieldControl name="firstName" placeholder="" required />
                <FieldError />
              </Field>
              <Field>
                <FieldLabel>Last name</FieldLabel>
                <FieldControl name="lastName" placeholder="" required />
                <FieldError />
              </Field>
            </div>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldControl name="email" required type="email" />
              <FieldError />
            </Field>

            <Field>
              <FieldLabel className="flex gap-1">
                Username
                <span className="font-normal text-muted-foreground">
                  (only letters, numbers and underscores)
                </span>
              </FieldLabel>
              <FieldControl name="username" pattern="[a-zA-Z0-9_]+" required />
              <FieldError />
            </Field>

            <Field>
              <FieldLabel className="flex gap-1">
                Password
                <span className="font-normal text-muted-foreground">
                  (min. 8 char)
                </span>
              </FieldLabel>
              <Input minLength={8} name="password" required type="password" />
              <FieldError />
            </Field>

            <Button disabled={isLoading} type="submit">
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </Form>

          <p className="text-center text-sm text-muted-foreground">
            By joining, you agree to the{" "}
            <Button className="px-0" variant={"link"}>
              Terms
            </Button>{" "}
            and{" "}
            <Button className="px-0" variant={"link"}>
              Privacy Policy
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

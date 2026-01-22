"use client";

import { Button } from "@lumi-ui/ui/button";
import { Field, FieldControl, FieldError, FieldLabel } from "@lumi-ui/ui/field";
import { Form } from "@lumi-ui/ui/form";
import { Input } from "@lumi-ui/ui/input";
import { Tabs, TabsListContent, TabsPanel, TabsTab } from "@lumi-ui/ui/tabs";
import { Chrome, Eye, EyeOff, Github } from "lucide-react";
import * as React from "react";

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <Tabs className="w-full mt-6" defaultValue="email">
        <TabsListContent>
          <TabsTab value="email">Email</TabsTab>
          <TabsTab value="phone">Phone</TabsTab>
        </TabsListContent>

        <TabsPanel className="py-4" value="email">
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                name="email"
                placeholder="name@example.com"
                required
                type="email"
              />
              <FieldError />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Password</FieldLabel>
                <Button
                  className="p-0 h-auto font-normal text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle forgot password
                  }}
                  variant="link"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  className="pr-10"
                  name="password"
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <FieldError />
            </Field>
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>
        </TabsPanel>

        <TabsPanel className="py-4" value="phone">
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <FieldControl
                name="phone"
                placeholder="+1 (555) 000-0000"
                required
                type="tel"
              />
              <FieldError />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Verification Code</FieldLabel>
                <Button
                  className="p-0 h-auto text-xs"
                  type="button"
                  variant="link"
                >
                  Send code
                </Button>
              </div>
              <FieldControl
                maxLength={6}
                name="code"
                placeholder="Enter 6-digit code"
                required
                type="text"
              />
              <FieldError />
            </Field>
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>
        </TabsPanel>
      </Tabs>
      <div className="space-y-4">
        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full" type="button" variant="outline">
            <Github className="mr-2 size-4" />
            GitHub
          </Button>
          <Button className="w-full" type="button" variant="outline">
            <Chrome className="mr-2 size-4" />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}

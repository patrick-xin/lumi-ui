"use client";
import * as React from "react";
import { Checkbox } from "@lumi-ui/ui/checkbox";
import { CheckboxGroup } from "@lumi-ui/ui/checkbox-group";
import { Label } from "@lumi-ui/ui/label";

const mainPermissions = ["view-dashboard", "manage-users", "access-reports"];
const userManagementPermissions = [
  "create-user",
  "edit-user",
  "delete-user",
  "assign-roles",
];

export default function PermissionsForm() {
  const id = React.useId();
  const [mainValue, setMainValue] = React.useState<string[]>([]);
  const [managementValue, setManagementValue] = React.useState<string[]>([]);

  return (
    <CheckboxGroup
      aria-labelledby={id}
      value={mainValue}
      onValueChange={(value) => {
        if (value.includes("manage-users")) {
          setManagementValue(userManagementPermissions);
        } else if (
          managementValue.length === userManagementPermissions.length
        ) {
          setManagementValue([]);
        }
        setMainValue(value);
      }}
      allValues={mainPermissions}
      style={{ marginLeft: "1rem" }}
    >
      <Label id={id} style={{ marginLeft: "-1rem" }}>
        <Checkbox
          parent
          indeterminate={
            managementValue.length > 0 &&
            managementValue.length !== userManagementPermissions.length
          }
        ></Checkbox>
        User Permissions
      </Label>

      <Label>
        <Checkbox value="view-dashboard"></Checkbox>
        View Dashboard
      </Label>

      <Label>
        <Checkbox value="access-reports"></Checkbox>
        Access Reports
      </Label>

      <CheckboxGroup
        aria-labelledby="manage-users-caption"
        value={managementValue}
        onValueChange={(value) => {
          if (value.length === userManagementPermissions.length) {
            setMainValue((prev) =>
              Array.from(new Set([...prev, "manage-users"])),
            );
          } else {
            setMainValue((prev) => prev.filter((v) => v !== "manage-users"));
          }
          setManagementValue(value);
        }}
        allValues={userManagementPermissions}
        style={{ marginLeft: "1rem" }}
      >
        <Label id="manage-users-caption" style={{ marginLeft: "-1rem" }}>
          <Checkbox parent></Checkbox>
          Manage Users
        </Label>

        <Label>
          <Checkbox value="create-user"></Checkbox>
          Create User
        </Label>

        <Label>
          <Checkbox value="edit-user"></Checkbox>
          Edit User
        </Label>

        <Label>
          <Checkbox value="delete-user"></Checkbox>
          Delete User
        </Label>

        <Label>
          <Checkbox value="assign-roles"></Checkbox>
          Assign Roles
        </Label>
      </CheckboxGroup>
    </CheckboxGroup>
  );
}

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/ui/alert-dialog";
import { Button } from "@/registry/ui/button";
import { toast } from "@/registry/ui/toast";
import { deleteAlertDialogHandle } from "../index";

export function DeleteAccoundDialog() {
  return (
    <AlertDialog handle={deleteAlertDialogHandle}>
      {({ payload: action }) => {
        return (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                <span className="text-primary font-semibold">
                  {action?.owner}'s
                </span>{" "}
                account {action?.name} and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="ghost" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose
                onClick={() => {
                  toast.promise(
                    new Promise<string>((resolve, reject) => {
                      const shouldSucceed = Math.random() > 0.3;
                      setTimeout(() => {
                        if (shouldSucceed) {
                          resolve(action?.name ?? "");
                        } else {
                          reject(
                            new Error(
                              `operation failed for deleting ${action?.name}`,
                            ),
                          );
                        }
                      }, 2000);
                    }),
                    {
                      error: (err: Error) => {
                        return {
                          actionProps: {
                            children: "Retry",
                            onClick: () => {
                              toast.promise(
                                new Promise<string>((resolve) => {
                                  setTimeout(() => {
                                    resolve("Account has been deleted.");
                                  }, 2000);
                                }),
                                {
                                  error: (err: Error) => {
                                    return {
                                      title: `Error: ${err.message}`,
                                    };
                                  },
                                  loading: {
                                    title: `Deleting ${action?.name}...`,
                                  },
                                  success: (data: string) => {
                                    return {
                                      closable: true,
                                      description: data,
                                      title: "Success",
                                    };
                                  },
                                },
                              );
                            },
                          },
                          title: `Error: ${err.message}`,
                        };
                      },
                      loading: { title: `Deleting ${action?.name}...` },
                      success: (data: string) => {
                        return {
                          closable: true,
                          description: `${data} has been deleted.`,
                          title: `Success`,
                        };
                      },
                    },
                  );
                }}
                render={<Button variant="destructive" />}
              >
                Continue
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        );
      }}
    </AlertDialog>
  );
}

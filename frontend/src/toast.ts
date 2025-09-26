import { toast } from "sonner";

export const notify = {
  success: (title: string, desc?: string) =>
    toast.success(title, {
      description: desc,
      style: {
        color: "#F5F5F5",
        border: "1px solid #A3FF12",
      },
    }),
  error: (title: string, desc?: string) =>
    toast.error(title, {
      description: desc,
      style: {
        color: "#F5F5F5",
        border: "1px solid #FF3CAC",
      },
    }),
  info: (title: string, desc?: string) =>
    toast(title, {
      description: desc,
      style: {
        color: "#F5F5F5",
        border: "1px solid #00B3B3",
      },
    }),
  promise: <T>(
    p: Promise<T>,
    msgs: { loading: string; success: string; error: string }
  ) =>
    toast.promise(p, {
      loading: msgs.loading,
      success: msgs.success,
      error: msgs.error,
    }),
};


import UploadedFileCard from "@/components/import/UploadedFileCard";
import { BlurFade } from "@/components/magicui/blur-fade";
import Separator from "@/components/ui/Separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAllUploads } from "@/hooks/import/useAllUploads";
import { useDeleteAllUploads } from "@/hooks/import/useDeleteAllUploads";
import { notify } from "@/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function MyImports() {
  const { isLoading, data, error } = useAllUploads();

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteAllUploads();

  const handleDeleteAll = async () => {
    if (isPending) return;
    await mutateAsync();
    await queryClient.invalidateQueries({ queryKey: ["all-uploads"] });
    await queryClient.invalidateQueries({ queryKey: ["latest-upload"] });
  };

  if (error) {
    notify.error("Error loading uploads!");

    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <p>Unexpected error! Sorry about that :(</p>
      </div>
    );
  }

  if (isLoading || isPending) {
    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <Spinner color="#00B3B3"></Spinner>
      </div>
    );
  }

  if (data && data.length <= 0) {
    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <p className="text-offwhite/70">
          Nem találhatók feltöltött fájlok. Kérjük, tölts fel egy fájlt a
          tranzakciók importálásához.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start flex-col mx-auto max-w-7xl mt-30 pb-6 relative">
      <div className="flex flex-row gap-4 sticky top-4 right-4">
        <button
          className="flex flex-row justify-center items-center gap-4 border border-limeneon py-2 px-4 rounded-md mb-8 hover:bg-limeneon/10 transition-colors cursor-pointer"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["all-uploads"] })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 animate-spin-slow"
          >
            <path
              fillRule="evenodd"
              d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold tracking-wide">Refresh</span>
        </button>
        <button
          className="flex flex-row justify-center items-center gap-4 border border-limeneon py-2 px-4 rounded-md mb-8 hover:bg-limeneon/10 transition-colors cursor-pointer"
          onClick={handleDeleteAll}
          disabled={isPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Delete all</span>
        </button>
      </div>
      {data?.map((file, i) => (
        <div key={`container-${file.id}`} className="w-full">
          <BlurFade delay={0.1} direction="right" inView key={`card-${i}`}>
            <UploadedFileCard key={file.id} file={file} />
          </BlurFade>
          {i < data.length - 1 && (
            <BlurFade delay={0.2} direction="up" inView key={`sep-${i}`}>
              <div className="w-full flex justify-center">
                <Separator
                  className="my-8"
                  width="w-[40%]"
                  key={`separator-${i}`}
                ></Separator>
              </div>
            </BlurFade>
          )}
        </div>
      ))}
    </div>
  );
}
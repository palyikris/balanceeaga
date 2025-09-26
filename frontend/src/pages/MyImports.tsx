import UploadedFileCard from "@/components/import/UploadedFileCard";
import { BlurFade } from "@/components/magicui/blur-fade";
import Separator from "@/components/ui/Separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAllUploads } from "@/hooks/useAllUploads";
import { notify } from "@/toast";

export default function MyImports() {
  const { isLoading, data, error } = useAllUploads();

  if (error) {
    notify.error("Error loading uploads!");

    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <p>Unexpected error! Sorry about that :(</p>
      </div>
    );
  }

  if (isLoading) {
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
          No uploads found. Start by importing a file!
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start flex-col mx-auto max-w-7xl mt-30 px-4 overflow-scroll max-h-[80vh] overflow-x-hidden pb-6">
      {data?.map((file, i) => (
        <div>
          <BlurFade delay={0.1} direction="right" inView key={file.id}>
            <UploadedFileCard key={file.id} file={file} />
          </BlurFade>
          {i < data.length - 1 && (
            <BlurFade delay={0.2} direction="up" inView key={`sep-${i}`}>
              <div className="w-full flex justify-center">
                <Separator className="my-8" width="w-[40%]"></Separator>
              </div>
            </BlurFade>
          )}
        </div>
      ))}
    </div>
  );
}
import UploadedFileCard from "@/components/import/UploadedFileCard";
import Separator from "@/components/ui/Separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAllUploads } from "@/hooks/useAllUploads"


export default function MyImports() {


  const { isLoading, data, error } = useAllUploads();
  
  console.log(data);

  if (error) {
    return (
      <div>
        <p>Unexpected error! Sorry about that :(</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Spinner color="#00B3B3"></Spinner>
      </div>
    );
  }

  if (data && data.length <= 0) {
    return (
      <div>
        <p className="text-offwhite/70">No uploads found. Start by importing a file!</p>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center flex-col mx-auto max-w-6xl mt-30 px-4">
      {data?.map((file, i) => (
        <>
          <UploadedFileCard key={file.id} file={file} />
          {i < data.length - 1 && (
            <div className="w-full flex justify-center">
              <Separator className="my-8" width="w-[40%]"></Separator>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
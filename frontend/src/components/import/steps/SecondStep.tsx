"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useLatestUpload } from "@/hooks/import/useLatestUpload";
import UploadedFileCard from "../UploadedFileCard";
import { notify } from "@/toast";

export default function SecondStep() {
  const { data, error, isLoading } = useLatestUpload();

  // @ts-expect-error status exists on Error
  if (error && error.status !== 404) {
    if (!isLoading) {
      notify.error("Error loading latest upload!");
    }

    return (
      <BlurFade delay={0.1} direction="right" inView>
        <div className="w-full flex flex-col items-center justify-center text-red-600">
          <span className="font-semibold text-lg mb-2">
            Error loading latest upload
          </span>
          <span className="text-sm">{error.message}</span>
        </div>
      </BlurFade>
    );
  }

  if (isLoading) {
    return (
      <BlurFade delay={0.1} direction="right" inView>
        <div className="w-full flex items-center justify-center">
          <Spinner color="#00B3B3"></Spinner>
        </div>
      </BlurFade>
    );
  }

  if (!data) {
    return (
      <BlurFade delay={0.1} direction="right" inView>
        <div className="w-full flex flex-col items-center justify-center text-offwhite/70">
          <span className="font-semibold text-lg mb-2">No uploads found</span>
          <span className="text-sm">Please upload a file to proceed.</span>
        </div>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={0.1} direction="right" inView>
      <UploadedFileCard
        file={data}
        key={data?.id}
        showDelete={false}
      ></UploadedFileCard>
    </BlurFade>
  );
}

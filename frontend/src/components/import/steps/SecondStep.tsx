import { BlurFade } from "@/components/magicui/blur-fade";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useLatestUpload } from "@/hooks/useLatestUpload";
import UploadedFileCard from "../UploadedFileCard";

export default function SecondStep() {
  const { data, error, isLoading } = useLatestUpload();

  

  if (error) {
    return <div>Error loading latest upload: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <BlurFade delay={0.1} direction="right" inView>
        <Spinner color="#00B3B3"></Spinner>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={0.1} direction="right" inView>
      <UploadedFileCard file={data}></UploadedFileCard>
    </BlurFade>
  );
}

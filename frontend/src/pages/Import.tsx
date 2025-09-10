import ImportFileUpload from "@/components/import/ImportFileUpload";
import ImportStepper from "@/components/import/ImportStepper";
import { BlurFade } from "@/components/magicui/blur-fade";

const Import = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <ImportStepper
        steps={[1, 2, 3]}
        stepContents={[
          <BlurFade delay={0.1} direction="left" inView>
            <ImportFileUpload></ImportFileUpload>
          </BlurFade>,
          <p>második lépés</p>,
          <p>harmadik lépés</p>,
        ]}
      >
        <p>anyad</p>
      </ImportStepper>
    </div>
  );
};

export default Import;
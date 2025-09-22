import FirstStep from "@/components/import/steps/FirstStep";
import SecondStep from "@/components/import/steps/SecondStep";
import ImportStepper from "@/components/import/ImportStepper";

const Import = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <ImportStepper
        steps={[1, 2]}
        stepContents={[<FirstStep></FirstStep>, <SecondStep></SecondStep>]}
      ></ImportStepper>
    </div>
  );
};

export default Import;

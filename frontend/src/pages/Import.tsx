import FirstStep from "@/components/import/first_step/FirstStep";
import SecondStep from "@/components/import/first_step/SecondStep";
import ThirdStep from "@/components/import/first_step/ThirdStep";
import ImportStepper from "@/components/import/ImportStepper";

const Import = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <ImportStepper
        steps={[1, 2, 3]}
        stepContents={[
          <FirstStep></FirstStep>,
          <SecondStep></SecondStep>,
          <ThirdStep></ThirdStep>,
        ]}
      ></ImportStepper>
    </div>
  );
};

export default Import;

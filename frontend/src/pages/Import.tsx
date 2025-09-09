import ImportFileUpload from "@/components/import/ImportFileUpload";
import ImportStepper from "@/components/import/ImportStepper";


const Import = () => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <ImportStepper steps={[1, 2, 3]} stepContents={[<ImportFileUpload></ImportFileUpload>, <p>második lépés</p>, <p>harmadik lépés</p>]}>
        <p>anyad</p>
      </ImportStepper>
    </div>
  );
};

export default Import;
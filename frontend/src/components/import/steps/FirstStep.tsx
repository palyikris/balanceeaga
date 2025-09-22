import { BlurFade } from "@/components/magicui/blur-fade";
import ImportFileUpload from "../ImportFileUpload";



export default function FirstStep() {
  return (
    <BlurFade delay={0.1} direction="left" inView>
      <ImportFileUpload></ImportFileUpload>
    </BlurFade>
  )
}
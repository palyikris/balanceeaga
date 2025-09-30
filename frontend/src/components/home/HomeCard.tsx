
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Applink } from "@/pages/Home";
import { useNavigate } from "react-router-dom";

interface HomeCardProps {
  applink: Applink;
}

export default function HomeCard(props: HomeCardProps) {

  const { applink } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(applink.href);
  }


  return (
    <Card className="relative w-[350px] overflow-hidden cursor-pointer" onClick={handleNavigate}>
      <CardHeader>
        <CardTitle>
          {applink.name}
        </CardTitle>
        <CardDescription>
          {applink.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
            <div className="p-0.25 rounded-lg bg-gradient-to-br from-electric to-limeneon">
              <div className="h-24 w-24 rounded-lg bg-graphite flex items-center justify-center">
                {applink.icon}
              </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <button className="flex w-full justify-center items-center text-center btn-neo py-2 rounded-sm border-2 border-electric/60 text-offwhite cursor-pointer" onClick={handleNavigate}>Ugrás az oldalra</button>
      </CardFooter>
      {/* <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-electric to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-limeneon to-transparent"
      /> */}
    </Card>
  );
}

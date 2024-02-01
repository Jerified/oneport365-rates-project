import  RateCard  from "@/components/RateCard";
import Image from "next/image";

export type OptionType = {
    value: string;
    label: string;
  };
  
  const option1: OptionType[] = [
    { value: "20ft", label: "Option1"  },
    { value: "40ft", label: "Option1" },
    { value: "40ft hc", label: "Option1" },
  ];

  const option2: OptionType[] = [
    { value: "dry", label: "Option2"  },
    { value: "reefer", label: "Option2" },
  ];

export default function Home() {
    // https://oneport365.free.beeceptor.com/live_rates?c  ontainer_size=20FT&container_type=dry
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex gap-4">
            <RateCard options={option1} />
            <RateCard options={option2} />
        </div>
    </main>
  );
}

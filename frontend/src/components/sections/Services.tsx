import ServicesShowcase from "@/components/ServicesShowcase";
import { getServices } from "@/lib/data";

export default async function Services() {
  const [hardServices, softServices] = await Promise.all([
    getServices("hard"),
    getServices("soft"),
  ]);

  return (
    <ServicesShowcase hardServices={hardServices} softServices={softServices} />
  );
}

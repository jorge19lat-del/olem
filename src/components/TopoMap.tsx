import { story } from "@/content/site";

// Annobón en curvas de nivel, líneas blancas sobre el chocolate de la sección.
// Las líneas salen de scripts/generate-annobon-topo.py.
export function TopoMap() {
  return <img src="/images/annobon-topo.svg" alt={story.map.alt} width={520} height={780} className="block h-auto w-full" />;
}

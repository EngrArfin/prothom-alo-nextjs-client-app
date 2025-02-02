
import CollectionPage from "@/components/LandingPag/Collection/Collection";
import { useRouter } from "next/router";

export default function CollectionPageDynamic() {
  const router = useRouter();
  const { name } = router.query; 
  if (!name) {
    return <div>Loading...</div>;  
  }

  return <CollectionPage collectionName={name as string} />;
}

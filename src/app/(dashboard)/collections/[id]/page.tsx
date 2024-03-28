import { getCollectionById } from "@/actions/collection";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import NewCollectionForm from "@/components/NewCollectionForm";
import { CollectionExt } from "@/lib/types";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

const CollectionDetailsPage = async ({ params }: Props) => {
  const res = await getCollectionById(params.id);
  const collection = res.data as CollectionExt;

  // console.log("title", collection.title);

  return (
    <div className="flex flex-col mx-auto max-w-7xl container mt-10">
      <Header title="Update Collection" />
      {/* <Suspense fallback={<Loading />}> */}
      <NewCollectionForm collectionData={collection} />
      {/* </Suspense> */}
    </div>
  );
};

export default CollectionDetailsPage;

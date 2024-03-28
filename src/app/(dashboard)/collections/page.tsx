import { getAllCollections } from "@/actions/collection";
import { collectionHistoryColumns } from "@/components/collectionsHistoryColumns";
import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CollectionExt } from "@/lib/types";
import { Collection } from "@prisma/client";
import _ from "lodash";
import Link from "next/link";

const CollectionsPage = async () => {
  const res = await getAllCollections();
  const collections = res.data as CollectionExt[];

  const collectionsHistoryData = collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    products: collection.product,
  }));

  return (
    <div className="flex flex-col mx-auto max-w-7xl container mt-10">
      <div className="flex justify-between">
        <Header title="Collections" />
        <Button asChild>
          <Link href="/collections/new">Create New</Link>
        </Button>
      </div>

      {_.isEmpty(collections) && (
        <div className="mt-10 p-10 flex flex-col border rounded-md max-w-5xl gap-5">
          <h1 className="text-3xl font-bold">
            No Collections Found, Create New
          </h1>
          <Button asChild className="w-fit">
            <Link href="/collections/new">Create New</Link>
          </Button>
        </div>
      )}

      {!_.isEmpty(collections) && (
        <div className="max-w-4xl">
          <DataTable
            data={collectionsHistoryData}
            columns={collectionHistoryColumns}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;

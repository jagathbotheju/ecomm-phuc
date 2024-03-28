"use client";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteCollectionAction from "./DeleteCollectionAction";
import Link from "next/link";

export type CollectionHistoryColumnType = {
  id: string;
  title: string;
  products: Product[];
};

export const collectionHistoryColumns: ColumnDef<CollectionHistoryColumnType>[] =
  [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <Link
            href={`/collections/${row.original.id}`}
            className="hover:underline"
          >
            {row.original.title}
          </Link>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => {
        return <p>{row.original.products.length}</p>;
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        const { id, title } = row.original;

        return (
          <div className="w-fit">
            <DeleteCollectionAction id={id} title={title} />
          </div>
        );
      },
    },
  ];

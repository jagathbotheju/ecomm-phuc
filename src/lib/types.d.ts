import { Collection, Product } from "@prisma/client";

type CollectionExt = Collection & {
  product: Product[];
};

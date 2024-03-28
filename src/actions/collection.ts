"use server";
import { NewCollectionSchema } from "@/lib/schema";
import { z } from "zod";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

//1-deleteCollection
//2-getAllCollections
//3-createNewCollection
//4-getCollectionById
//5-updateCollection

//1-deleteCollection
export const deleteCollection = async (id: string) => {
  try {
    const deletedCollection = await prisma.collection.delete({
      where: {
        id,
      },
    });

    if (deletedCollection) {
      revalidatePath("/collections");
      return {
        success: true,
        message: "Collection Deleted Successfully",
      };
    }

    return {
      success: false,
      error: "Could not delete collection, please try later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, Deleting Collection",
    };
  }
};

//2-getAllCollections
export const getAllCollections = async () => {
  try {
    const allCollections = await prisma.collection.findMany({
      include: {
        product: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    if (allCollections) {
      return {
        success: true,
        data: allCollections,
      };
    }

    return {
      success: false,
      error: "Could not get all collections, please try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, getting all Collections",
    };
  }
};

//3-createNewCollection
export const createNewCollection = async (
  formData: z.infer<typeof NewCollectionSchema>
) => {
  try {
    const result = NewCollectionSchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false,
        error: "Insufficient data creating new collection",
      };
    }

    const isExist = await prisma.collection.findFirst({
      where: {
        title: formData.title,
      },
    });

    if (isExist) {
      return {
        success: false,
        error: "Same Title exists, please use NEW Title",
      };
    }

    const newCollection = await prisma.collection.create({
      data: { ...formData },
    });

    if (newCollection) {
      revalidatePath("/collections");
      return {
        success: true,
        message: "New Collection Created",
      };
    }

    return {
      success: false,
      error: "Could not create new collection, try again later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Create New Collection, Internal Server Error",
    };
  }
};

//4-getCollectionById
export const getCollectionById = async (id: string) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (collection) {
      return {
        success: true,
        data: collection,
      };
    }

    return {
      success: false,
      error: "Could not get Collection, please try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

//5-updateCollection
export const updateCollection = async ({
  id,
  title,
  description,
  image,
}: z.infer<typeof NewCollectionSchema> & { id: string }) => {
  try {
    const updatedCollection = await prisma.collection.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
      },
    });

    if (updatedCollection) {
      revalidatePath(`/collections/${id}`);
      return {
        success: true,
        message: "Collection updated successfully",
      };
    }

    return {
      success: false,
      error: "Could not update Collection, please try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, updating collection",
    };
  }
};

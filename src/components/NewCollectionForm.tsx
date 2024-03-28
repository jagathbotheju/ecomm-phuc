"use client";
import { NewCollectionSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { useTransition } from "react";
import { createNewCollection, updateCollection } from "@/actions/collection";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CollectionExt } from "@/lib/types";
import { useEffect } from "react";

interface Props {
  collectionData?: CollectionExt;
}

const NewCollectionForm = ({ collectionData }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewCollectionSchema>>({
    resolver: zodResolver(NewCollectionSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    mode: "all",
  });

  useEffect(() => {
    if (collectionData) {
      form.setValue("title", collectionData.title);
      form.setValue("description", collectionData.description);
      form.setValue("image", collectionData.image);
    }
  }, [collectionData, form]);

  const onSubmit = (formData: z.infer<typeof NewCollectionSchema>) => {
    startTransition(() => {
      if (collectionData) {
        //edit mode
        updateCollection({
          id: collectionData.id,
          ...formData,
        })
          .then((res) => {
            if (res.success) {
              router.push("/collections");
              return toast.success(res.message);
            } else {
              return toast.error(res.error);
            }
          })
          .catch((err) => {
            return toast.error(
              "Creating New Collection, Internal Server Error"
            );
          })
          .finally(() => {
            form.reset();
          });
      } else {
        //create mode
        createNewCollection(formData)
          .then((res) => {
            if (res.success) {
              router.push("/collections");
              return toast.success(res.message);
            } else {
              return toast.error(res.error);
            }
          })
          .catch((err) => {
            return toast.error(
              "Creating New Collection, Internal Server Error"
            );
          })
          .finally(() => {
            form.reset();
          });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Image</FormLabel> */}
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange([])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={!form.formState.isValid || isPending}>
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCollectionForm;

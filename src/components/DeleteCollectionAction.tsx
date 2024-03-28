"use client";
import { deleteCollection } from "@/actions/collection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  id: string;
  title: string;
}

const DeleteCollectionAction = ({ id, title }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteCollection = () => {
    startTransition(() => {
      deleteCollection(id)
        .then((res) => {
          if (res.success) {
            return toast.success(res.message);
          } else {
            return toast.error(res.error);
          }
        })
        .catch((err) => {
          toast.error("Internal Server Error");
        });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="w-4 h-4 text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 font-semibold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Collection,{" "}
            <span className="font-semibold text-red-500">
              {title.toUpperCase()}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCollection}>
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionAction;

"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import _ from "lodash";

interface Props {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload = ({ value, onChange, onRemove }: Props) => {
  const onUpload = (result: any) => {
    console.log("ImageUpload", result);
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {!_.isEmpty(value) &&
          value.map((url, index) => (
            <div key={index} className="relative w-[200px] h-[200px]">
              <Trash2
                className="w-5 h-5 absolute top-1 right-1 text-red-500 z-10 cursor-pointer"
                onClick={() => onRemove(url)}
              />
              <Image
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
                fill
              />
            </div>
          ))}
      </div>

      <CldUploadWidget uploadPreset="e4vzy8mg" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button onClick={() => open()} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

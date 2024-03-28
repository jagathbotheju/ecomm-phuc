import Header from "@/components/Header";
import NewCollectionForm from "@/components/NewCollectionForm";

const NewCollectionPage = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10">
      <Header title="Create New Collection" />
      <NewCollectionForm />
    </div>
  );
};

export default NewCollectionPage;

import Breadcrumb from "@/components/Container/Breadcrumb";
import FormView from "@/components/Form/FormView";
import SelectView from "@/components/Form/SelectView";
import TreeView from "@/components/Tree/TreeView";

export default function Home() {

  return (
    <>
      <Breadcrumb/>
      <SelectView/>
      <div className="flex flex-row flex-wrap gap-32 w-full">
        <TreeView/>
        <FormView/>
      </div>
    </>
  );
}

import { Tabs, TabsList, TabsTrigger } from "../../Atoms/Tabs/tabs";
import type { TabsFilterProps } from "./TabsFilter";

export function TabsFilter({ categories, value, onChange }: TabsFilterProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className="overflow-x-auto">
      <TabsList className="flex gap-2 ">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat}
            value={cat}
            className=" whitespace-nowrap rounded-full border px-3 py-1 text-sm capitalize"
          >
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

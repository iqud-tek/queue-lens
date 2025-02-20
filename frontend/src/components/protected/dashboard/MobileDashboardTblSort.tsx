import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { ConnectionsSortValue } from "@/types/dashboard.types";

interface MobileDashboardTblSortProps {
  sortValue: ConnectionsSortValue;
  setSortValue: (value: ConnectionsSortValue) => void;
}

const MobileDashboardTblSort: React.FC<MobileDashboardTblSortProps> = ({
  sortValue,
  setSortValue,
}) => {
  const sortConnectionList = [
    { label: "Newest First(Default)", value: "newest" },
    { label: "Alias Name - Ascending", value: "alias-ascending" },
    { label: "Alias Name - Descending", value: "alias-descending" },
  ];

  const handleSortChange = (value: ConnectionsSortValue) => {
    setSortValue(value); // Update the state when the user selects a radio button
  };

  return (
    <div className="mb-4 flex items-center justify-between space-x-4 md:hidden">
      <Drawer>
        <div className="flex w-full justify-end">
          <DrawerTrigger asChild>
            <Button variant="outline">
              Sort <ArrowUpDown />
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Sort Connection List</DrawerTitle>
            <DrawerDescription>
              Sort connection list as per your needs.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <form action="" method="post">
              <RadioGroup
                value={sortValue} // Bind the state to the RadioGroup
                onValueChange={handleSortChange} // Update the state on change
              >
                {sortConnectionList.map((item) => (
                  <DrawerClose asChild key={item.value}>
                    <div className="flex items-center space-x-2 border-b">
                      <Label
                        htmlFor={item.value}
                        className={`w-full py-4 ${sortValue === item.value ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {item.label}
                      </Label>
                      <RadioGroupItem value={item.value} id={item.value} />
                    </div>
                  </DrawerClose>
                ))}
              </RadioGroup>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileDashboardTblSort;

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SideBarContent from "./sideBarContent";

interface Props {
  occasionList: string[];
  styleList: string[];
  fitList: string[];
  fabricList: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemClick?: () => void;
}

export default function SheetingClient({
  open,
  onOpenChange,
  occasionList,
  fabricList,
  fitList,
  styleList,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="h-full flex flex-col left-0
          data-[state=open]:animate-slideIn
          data-[state=closed]:animate-slideOut
        "
      >
        <SheetHeader>
          <SheetTitle>Browse Filters</SheetTitle>
          <SideBarContent
            occasionList={occasionList}
            fabricList={fabricList}
            fitList={fitList}
            styleList={styleList}
            onItemClick={() => onOpenChange(false)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

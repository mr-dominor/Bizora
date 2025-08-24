// components/SheetingServer.tsx
import { getAttribute } from "@/lib/data";
import SheetingClient from "./sheetingClient";

type SheetingProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default async function SheetingServer({ open, onOpenChange }:SheetingProps) {
  const { occasions, fabrics, fit, styles } = await getAttribute();
  return (
    <SheetingClient
      open={open}
      onOpenChange={onOpenChange}
      occasionList={occasions}
      fabricList={fabrics}
      fitList={fit}
      styleList={styles}
    />
  );
}

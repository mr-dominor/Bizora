// NavBarServer.tsx (server)
import { getAttribute } from "@/lib/data";
import NavBar from "./navbar";

export default async function NavBarServer() {
  const {occasions,fit,styles,fabrics} = await getAttribute();
  return <NavBar occasions={occasions} fit={fit} styles={styles} fabrics={fabrics} />;
}

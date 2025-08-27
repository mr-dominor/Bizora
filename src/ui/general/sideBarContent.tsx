"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
interface props{
  occasionList: string[];
  styleList: string[];
  fitList: string[];
  fabricList: string[];
  onItemClick?: () => void;
}
import Link from "next/link";

import { useAuth } from "@/services/authContext";
export default function SideBarContent({occasionList,styleList,fitList,fabricList, onItemClick}:props){
  const {user,signOut} = useAuth();
  const handleLogout = async()=>{
    try {
      await signOut();
    } catch (error) {
      console.log(error)
    }
  }
    return (
      <div>
        <Accordion type="single" collapsible>
              <AccordionItem value={`item-1`}>
                <AccordionTrigger className="font-serif text-xl font-medium text-maroon">Occasion</AccordionTrigger>
                <AccordionContent>
                  {occasionList.map((event,k)=>(
                    <div key={k} className="w-full h-14 text-black font-serif">
                      <Link href={`/shop/occasion/${event}`}><p onClick={()=>{onItemClick?.()}}>{event}</p></Link>
                    </div>
                  ))}
                </AccordionContent>
             </AccordionItem>
             <AccordionItem value={`item-2`}>
                <AccordionTrigger className="font-serif text-xl font-medium text-maroon">Styles</AccordionTrigger>
                <AccordionContent>
                  {styleList.map((event,k)=>(
                    <div key={k} className="w-full h-14 text-black font-serif">
                      <Link href={`/shop/style/${event}`}><p onClick={()=>{onItemClick?.()}}>{event}</p></Link>
                    </div>
                  ))}
                </AccordionContent>
             </AccordionItem>
             <AccordionItem value={`item-3`}>
                <AccordionTrigger className="font-serif text-xl font-medium text-maroon">Fabrics</AccordionTrigger>
                <AccordionContent>
                  {fabricList.map((event,k)=>(
                    <div key={k} className="w-full h-14 text-black font-serif">
                      <Link href={`/shop/fabric/${event}`}><p onClick={()=>{onItemClick?.()}}>{event}</p></Link>
                    </div>
                  ))}
                </AccordionContent>
             </AccordionItem>
             <AccordionItem value={`item-4`}>
                <AccordionTrigger className="font-serif text-xl font-medium text-maroon">Fits</AccordionTrigger>
                <AccordionContent>
                  {fitList.map((event,k)=>(
                    <div key={k} className="w-full h-14 text-black font-serif">
                      <Link href={`/shop/fit/${event}`}><p onClick={()=>{onItemClick?.()}}>{event}</p></Link>
                    </div>
                  ))}
                </AccordionContent>
             </AccordionItem>
        </Accordion>
        <div className="absolute bottom-0 py-10">
          <p className="capitalize text-maroon font-bold">{user?user?.name:"Nothing"}</p>
          <button className="w-[50%] p-2 h-full bg-amber-200 hover:bg-amber-400 hover:text-white rounded-xl " onClick={()=>handleLogout()}>
             Logout
          </button>
        </div>
      </div>
        
    );
}
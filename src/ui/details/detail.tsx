"use client"
import { Item } from "@/lib/type_def";
import { currencyConverter } from "@/utils/utils";
import Image from "next/image";
import { useAuth } from "@/services/authContext";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Footer from "../homepage/footer";
import { useState } from "react";

export default function Detail({data}:{data:Item[]}){
    const realData = data[0];
    const [error,setError] = useState<string|null>("")
    const[loading,setLoading] = useState(false);
    const availableSizes = ['S','M','L','XL','XXL']
    const extraInfo = ['features','occasion','style','fabric','fit']
    const {user} = useAuth()
    const router = useRouter()
    console.log(user?.id)
    const formatValue = (value: unknown): React.ReactNode => {
         if (value instanceof Date) return value.toLocaleDateString();
         if (value === null || value === undefined) return '';
         return String(value);
        };
    async function handleAddToCart(
    title:string,
    image: string,
    price: number|string ,
    id: string,
) {
    setError("");
    setLoading(true);
    const userId = user?.id
    if (!title ||!image || !price || !id || !userId) {
        setError("Item corrupted, can't add it to cart");
        setLoading(false);
        return;
    }
    const form = { title,image, id, price, userId};

    try {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            setError(data.error || "Failed to add to cart");
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
        setLoading(false);
    }
}
    const handleRoute = (id:string)=>{
        router.push(`/book/${id}`);
    }

    return(
        <div className="w-full min-h-screen" >
            <div className="h-24 w-full sticky top-0 z-30 shadow-2xl overflow-hidden bg-maroon ">
            </div>
            <div className=" flex flex-col md:flex-row w-full flex-1">
                <div className="w-full md:w-2/5 h-auto md:h-screen sticky top-0 z-20 bg-white border-x-2 overflow-y-auto border-b-2 border-gray-200 flex flex-col justify-center items-center">
                {/**IMAGE SECTION */}
                    <div className="w-[80%] h-96 block md:hidden mx-auto">
                        {<Image
                        src={realData.image.replace(/^(\.\.\/)?public/, '')}
                        width={300}
                        height={400}
                        alt="Product Image"
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-6"
                        />}
                    </div>

                    <div className="w-[80%] h-[450px] bg-black relative hidden md:block overflow-hidden">
                        {<Image
                        src={realData.image.replace(/^(\.\.\/)?public/, '')}
                        fill
                        alt="Product Image"
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />}
                    </div>
                    <div className="w-full h-12 flex justify-center items-center mx-auto ">
                        {error && <p className="text-red-400">{error}</p> }
                            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-2 rounded-full w-40 transition mx-2 " onClick={()=>handleRoute(realData.id)}>Buy Now</button>
                            <button type="submit" className="bg-amber-600 hover:bg-yellow-300 text-black font-medium px-6 py-2 rounded-full w-36 transition mx-2" onClick={()=>{
                                handleAddToCart(realData.title,realData.image,realData.price,realData.id)
                            }}>{loading?"Loading":"Add to Cart"}</button>
                    </div>
                </div>

                <div className="w-full md:w-3/5  min-h-full relative overflow-y-auto bg-beige border-2 justify-start py-4 md:py-10 px-4">
                    {/** Name Price sizes Colours Description Offers dropdowns if any */}
                    <h1 className={`text-4xl md:text-5xl font-semibold font-serif`}>{realData.title}</h1>
                    <h1 className="text-3xl md:text-4xl font-serif py-2 text-maroon">{currencyConverter({amt:typeof realData.price==="string"? parseFloat(realData.price):realData.price})}</h1>
                    {/**Sizes */}
                    <div className="w-60 h-16 flex gap-3">
                        {availableSizes.map((p,key)=>(<div key={key} className="w-12 h-10 flex justify-center items-center border-2 border-maroon rounded-lg hover:bg-maroon hover:text-white">{p}</div>))}
                    </div>
                    {/**Colours will come shortly */}
                    {/**Collapsibles */}
                    <Accordion type="single" collapsible>
                        {extraInfo.map((p,k)=>(
                            <AccordionItem key={k} value={`item-${k}`}>
                            <AccordionTrigger className="font-serif text-xl font-medium text-maroon">{p.charAt(0).toUpperCase() + p.slice(1)}</AccordionTrigger>
                            <AccordionContent>
                              {formatValue(realData[p as keyof Item])}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                   </Accordion>
                </div>
            </div>
            <Footer />

        </div>

    );
}
// Image mapping utility to properly handle product images
import whiteTshirt from "@/assets/white-tshirt.jpg";
import summerDress from "@/assets/summer-dress.jpg";
import wirelessHeadphones from "@/assets/wireless-headphones.jpg";
import runningShoes from "@/assets/running-shoes.jpg";
import leatherHandbag from "@/assets/leather-handbag.jpg";

// Men's Clothing
import mensPolo from "@/assets/mens-polo.jpg";
import mensJeans from "@/assets/mens-jeans.jpg";
import mensDressShirt from "@/assets/mens-dress-shirt.jpg";
import mensLeatherJacket from "@/assets/mens-leather-jacket.jpg";

// Women's Clothing
import womensBlouse from "@/assets/womens-blouse.jpg";
import womensJeans from "@/assets/womens-jeans.jpg";
import womensCocktailDress from "@/assets/womens-cocktail-dress.jpg";
import womensCardigan from "@/assets/womens-cardigan.jpg";

// Electronics
import smartphone from "@/assets/smartphone.jpg";
import laptop from "@/assets/laptop.jpg";
import tablet from "@/assets/tablet.jpg";
import smartwatch from "@/assets/smartwatch.jpg";

// Shoes
import casualSneakers from "@/assets/casual-sneakers.jpg";
import dressShoes from "@/assets/dress-shoes.jpg";
import highHeels from "@/assets/high-heels.jpg";
import boots from "@/assets/boots.jpg";

// Accessories
import sunglasses from "@/assets/sunglasses.jpg";
import goldWatch from "@/assets/gold-watch.jpg";
import silkScarf from "@/assets/silk-scarf.jpg";
import leatherWallet from "@/assets/leather-wallet.jpg";

export const getProductImage = (imageKey: string) => {
  const imageMap: Record<string, string> = {
    // Original products
    'white-tshirt.jpg': whiteTshirt,
    'summer-dress.jpg': summerDress,
    'wireless-headphones.jpg': wirelessHeadphones,
    'running-shoes.jpg': runningShoes,
    'leather-handbag.jpg': leatherHandbag,
    
    // Men's Clothing
    'mens-polo.jpg': mensPolo,
    'mens-jeans.jpg': mensJeans,
    'mens-dress-shirt.jpg': mensDressShirt,
    'mens-leather-jacket.jpg': mensLeatherJacket,
    
    // Women's Clothing
    'womens-blouse.jpg': womensBlouse,
    'womens-jeans.jpg': womensJeans,
    'womens-cocktail-dress.jpg': womensCocktailDress,
    'womens-cardigan.jpg': womensCardigan,
    
    // Electronics
    'smartphone.jpg': smartphone,
    'laptop.jpg': laptop,
    'tablet.jpg': tablet,
    'smartwatch.jpg': smartwatch,
    
    // Shoes
    'casual-sneakers.jpg': casualSneakers,
    'dress-shoes.jpg': dressShoes,
    'high-heels.jpg': highHeels,
    'boots.jpg': boots,
    
    // Accessories
    'sunglasses.jpg': sunglasses,
    'gold-watch.jpg': goldWatch,
    'silk-scarf.jpg': silkScarf,
    'leather-wallet.jpg': leatherWallet,
  };
  
  return imageMap[imageKey] || "/placeholder.svg";
};
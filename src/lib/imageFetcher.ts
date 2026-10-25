/**
 * Real-time Product Image Fetcher
 * Extracts the authentic product image directly from live e-commerce page meta tags (og:image, twitter:image, JSON-LD),
 * with an intelligent category-specific fallback if live scraping is blocked.
 */

export async function fetchLiveProductImage(rawUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(rawUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-IN,en-US;q=0.9,en;q=0.8",
        "Sec-Ch-Ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const html = await res.text();

    // 1. OpenGraph Image tag: <meta property="og:image" content="...">
    const ogMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    if (ogMatch && ogMatch[1] && isValidImageUrl(ogMatch[1])) {
      return cleanImageUrl(ogMatch[1]);
    }

    // 2. Twitter Card Image: <meta name="twitter:image" content="...">
    const twitterMatch =
      html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

    if (twitterMatch && twitterMatch[1] && isValidImageUrl(twitterMatch[1])) {
      return cleanImageUrl(twitterMatch[1]);
    }

    // 3. Amazon high-resolution image patterns
    const amzMatch =
      html.match(/"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i) ||
      html.match(/"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i) ||
      html.match(/data-old-hires=["'](https:\/\/[^"']+)["']/i);

    if (amzMatch && amzMatch[1]) {
      return cleanImageUrl(amzMatch[1]);
    }

    // 4. JSON-LD Schema image: "image": "https://..." or "image": ["https://..."]
    const jsonLdMatch =
      html.match(/"image":\s*\[\s*["']([^"']+)["']/i) ||
      html.match(/"image":\s*["']([^"']+)["']/i);

    if (jsonLdMatch && jsonLdMatch[1] && isValidImageUrl(jsonLdMatch[1])) {
      return cleanImageUrl(jsonLdMatch[1]);
    }

    // 5. Link rel="image_src"
    const linkMatch = html.match(/<link[^>]*rel=["']image_src["'][^>]*href=["']([^"']+)["']/i);
    if (linkMatch && linkMatch[1] && isValidImageUrl(linkMatch[1])) {
      return cleanImageUrl(linkMatch[1]);
    }

    return null;
  } catch (err) {
    // Timeout or network block - fall back to smart category matcher
    return null;
  }
}

function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const clean = url.trim().toLowerCase();
  // Filter out tiny tracker pixels or icons
  if (clean.includes("favicon") || clean.includes("1x1") || clean.includes("pixel")) {
    return false;
  }
  return clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("//");
}

function cleanImageUrl(url: string): string {
  let trimmed = url.trim();
  if (trimmed.startsWith("//")) {
    trimmed = `https:${trimmed}`;
  }
  return trimmed;
}

/**
 * High-accuracy semantic category image fallback when live scraping is blocked by bot protection.
 */
export function getSmartCategoryImage(title: string, url: string): string {
  const query = `${title} ${url}`.toLowerCase();

  // 1. Women's Footwear / Flats / Sandals / Heels
  if (
    query.includes("flat") ||
    query.includes("sandal") ||
    query.includes("heel") ||
    query.includes("slipper") ||
    query.includes("toe") ||
    query.includes("wedge") ||
    query.includes("mule") ||
    query.includes("kolhapuri")
  ) {
    return "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80"; // Women's stylish footwear/flats
  }

  // 2. Sneakers / Sports Shoes / Boots
  if (
    query.includes("shoe") ||
    query.includes("sneaker") ||
    query.includes("boot") ||
    query.includes("nike") ||
    query.includes("puma") ||
    query.includes("adidas") ||
    query.includes("crocs") ||
    query.includes("footwear")
  ) {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"; // Nike/sneakers
  }

  // 3. Women's Apparel / Dresses / Tops / Kurtis / Sarees
  if (
    query.includes("dress") ||
    query.includes("kurti") ||
    query.includes("saree") ||
    query.includes("lehenga") ||
    query.includes("top") ||
    query.includes("skirt") ||
    query.includes("women") && (query.includes("wear") || query.includes("cloth"))
  ) {
    return "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"; // Fashion dress
  }

  // 4. Men's Clothing / Shirts / T-shirts / Jeans / Jackets
  if (
    query.includes("shirt") ||
    query.includes("t-shirt") ||
    query.includes("tshirt") ||
    query.includes("jeans") ||
    query.includes("trouser") ||
    query.includes("jacket") ||
    query.includes("hoodie") ||
    query.includes("blazer")
  ) {
    return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"; // Apparel
  }

  // 5. Bags / Handbags / Backpacks / Wallets
  if (
    query.includes("bag") ||
    query.includes("handbag") ||
    query.includes("purse") ||
    query.includes("backpack") ||
    query.includes("wallet") ||
    query.includes("tote") ||
    query.includes("luggage") ||
    query.includes("suitcase")
  ) {
    return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"; // Leather bag
  }

  // 6. Beauty / Cosmetics / Skincare / Fragrance
  if (
    query.includes("lipstick") ||
    query.includes("makeup") ||
    query.includes("perfume") ||
    query.includes("serum") ||
    query.includes("cream") ||
    query.includes("lotion") ||
    query.includes("shampoo") ||
    query.includes("skincare") ||
    query.includes("sunscreen")
  ) {
    return "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"; // Beauty/skincare
  }

  // 7. Smartphones / Mobiles / iPhones
  if (
    query.includes("iphone") ||
    query.includes("phone") ||
    query.includes("mobile") ||
    query.includes("samsung") ||
    query.includes("pixel") ||
    query.includes("oneplus") ||
    query.includes("smartphone") ||
    query.includes("redmi") ||
    query.includes("realme")
  ) {
    return "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"; // Smartphone
  }

  // 8. Laptops / Computers / Monitors
  if (
    query.includes("laptop") ||
    query.includes("macbook") ||
    query.includes("computer") ||
    query.includes("dell") ||
    query.includes("lenovo") ||
    query.includes("hp") ||
    query.includes("asus") ||
    query.includes("monitor")
  ) {
    return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80"; // Laptop
  }

  // 9. Headphones / Earbuds / Audio
  if (
    query.includes("headphone") ||
    query.includes("earphone") ||
    query.includes("earbuds") ||
    query.includes("airpods") ||
    query.includes("audio") ||
    query.includes("soundbar") ||
    query.includes("speaker") ||
    query.includes("boat") ||
    query.includes("sony")
  ) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"; // Headphones
  }

  // 10. Watches / Smartwatches
  if (
    query.includes("watch") ||
    query.includes("smartwatch") ||
    query.includes("noise") ||
    query.includes("fire-boltt") ||
    query.includes("fossil")
  ) {
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"; // Smartwatch
  }

  // 11. Kitchen Appliances / Cookware
  if (
    query.includes("mixer") ||
    query.includes("grinder") ||
    query.includes("blender") ||
    query.includes("cooker") ||
    query.includes("kettle") ||
    query.includes("pan") ||
    query.includes("kitchen") ||
    query.includes("microwave") ||
    query.includes("fryer")
  ) {
    return "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80"; // Kitchen
  }

  // 12. Chargers / Cables / Electronics accessories
  if (
    query.includes("charger") ||
    query.includes("cable") ||
    query.includes("adapter") ||
    query.includes("power bank") ||
    query.includes("gan")
  ) {
    return "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80"; // Charger
  }

  // 13. Furniture / Chairs / Desks
  if (
    query.includes("chair") ||
    query.includes("table") ||
    query.includes("desk") ||
    query.includes("furniture") ||
    query.includes("sofa")
  ) {
    return "https://images.unsplash.com/photo-1580481077195-c3a82da9189b?w=600&auto=format&fit=crop&q=80"; // Office chair
  }

  // Default clean aesthetic product packaging
  return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
}

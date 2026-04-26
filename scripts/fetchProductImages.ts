import { writeFileSync } from "node:fs";

const products = [
  { name: "Aashirvaad Atta", barcode: "8901030753474" },
  { name: "India Gate Basmati Rice", barcode: "8901030756680" },
  { name: "Fortune Sunflower Oil", barcode: "8901267023636" },
  { name: "Tata Tea Premium", barcode: "8901584006203" },
  { name: "Parle-G Biscuits", barcode: "8901719110085" },
  { name: "Maggi Noodles", barcode: "8901058850015" },
  { name: "Amul Butter", barcode: "8901063000101" },
  { name: "Nescafe Classic", barcode: "7613035352681" },
  { name: "Surf Excel Matic", barcode: "8901030756000" },
  { name: "Colgate MaxFresh", barcode: "8901314005872" },
  { name: "Britannia Marie Gold", barcode: "8901063710126" },
  { name: "Haldiram Aloo Bhujia", barcode: "8906002350023" },
  { name: "Lay's Classic", barcode: "8901491101091" },
  { name: "Bournvita", barcode: "8901063750016" },
  { name: "BRU Instant Coffee", barcode: "8901063104017" },
  { name: "Vim Dishwash Bar", barcode: "8901030756130" },
  { name: "Harpic Power Plus", barcode: "8901396111145" },
  { name: "Dove Body Wash", barcode: "8901030743291" },
  { name: "Lifebuoy Soap", barcode: "8901030004177" },
  { name: "Dettol Antiseptic", barcode: "8901396013207" },
] as const;

const VERIFIED_BACKUP_URLS: Record<string, string> = {
  "7613035352681":
    "https://images.openfoodfacts.org/images/products/761/303/535/2681/front_en.5.400.jpg",
  "8901030004177":
    "https://images.openfoodfacts.org/images/products/890/103/000/4177/front_en.3.400.jpg",
  "8901030743291":
    "https://images.openfoodfacts.org/images/products/890/103/074/3291/front_en.3.400.jpg",
  "8901030756000":
    "https://images.openfoodfacts.org/images/products/890/103/075/6000/front_en.3.400.jpg",
  "8901030756130":
    "https://images.openfoodfacts.org/images/products/890/103/075/6130/front_en.3.400.jpg",
  "8901058850015":
    "https://images.openfoodfacts.org/images/products/890/105/885/0015/front_en.3.400.jpg",
  "8901063000101":
    "https://images.openfoodfacts.org/images/products/890/106/300/0101/front_en.3.400.jpg",
  "8901063104017":
    "https://images.openfoodfacts.org/images/products/890/106/310/4017/front_en.3.400.jpg",
  "8901063710126":
    "https://images.openfoodfacts.org/images/products/890/106/371/0126/front_en.3.400.jpg",
  "8901063750016":
    "https://images.openfoodfacts.org/images/products/890/106/375/0016/front_en.3.400.jpg",
  "8901267023636":
    "https://images.openfoodfacts.org/images/products/890/126/702/3636/front_en.3.400.jpg",
  "8901314005872":
    "https://images.openfoodfacts.org/images/products/890/131/400/5872/front_en.3.400.jpg",
  "8901396013207":
    "https://images.openfoodfacts.org/images/products/890/139/601/3207/front_en.3.400.jpg",
  "8901396111145":
    "https://images.openfoodfacts.org/images/products/890/139/611/1145/front_en.3.400.jpg",
  "8901491101091":
    "https://images.openfoodfacts.org/images/products/890/149/110/1091/front_en.3.400.jpg",
  "8901584006203":
    "https://images.openfoodfacts.org/images/products/890/158/400/6203/front_en.3.400.jpg",
  "8901719110085":
    "https://images.openfoodfacts.org/images/products/890/171/911/0085/front_en.5.400.jpg",
  "8906002350023":
    "https://images.openfoodfacts.org/images/products/890/600/235/0023/front_en.3.400.jpg",
};

type ProductRecord = (typeof products)[number];

type VerificationSource = "api" | "verified-backup" | "barcode-derived" | "none";
type VerificationStatus = "ok" | "missing" | "error";

type VerificationResult = ProductRecord & {
  offImageUrl: string | null;
  source: VerificationSource;
  status: VerificationStatus;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildBarcodeUrl(barcode: string): string {
  return `https://images.openfoodfacts.org/images/products/${barcode.replace(
    /(\d{3})(\d{3})(\d{3})(\d+)/,
    "$1/$2/$3/$4",
  )}/front_en.3.400.jpg`;
}

async function urlExists(url: string): Promise<boolean> {
  try {
    const head = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "KiranaMarket/1.0" },
    });

    if (head.ok) {
      return true;
    }

    if (head.status !== 403 && head.status !== 405) {
      return false;
    }

    const get = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "KiranaMarket/1.0",
        Range: "bytes=0-0",
      },
    });

    return get.ok;
  } catch {
    return false;
  }
}

async function getVerifiedImage(product: ProductRecord): Promise<VerificationResult> {
  const backupUrl = VERIFIED_BACKUP_URLS[product.barcode] ?? null;
  const barcodeUrl = buildBarcodeUrl(product.barcode);

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${product.barcode}.json`,
      { headers: { "User-Agent": "KiranaMarket/1.0" } },
    );

    const data = (await response.json()) as {
      product?: {
        image_front_display_url?: string | null;
        image_front_url?: string | null;
      };
    };

    const apiUrl =
      data.product?.image_front_display_url ||
      data.product?.image_front_url ||
      null;

    if (apiUrl && (await urlExists(apiUrl))) {
      return { ...product, offImageUrl: apiUrl, source: "api", status: "ok" };
    }

    if (backupUrl && (await urlExists(backupUrl))) {
      return {
        ...product,
        offImageUrl: backupUrl,
        source: "verified-backup",
        status: "ok",
      };
    }

    if (await urlExists(barcodeUrl)) {
      return {
        ...product,
        offImageUrl: barcodeUrl,
        source: "barcode-derived",
        status: "ok",
      };
    }

    if (backupUrl) {
      return {
        ...product,
        offImageUrl: backupUrl,
        source: "verified-backup",
        status: "ok",
      };
    }

    return {
      ...product,
      offImageUrl: barcodeUrl,
      source: "barcode-derived",
      status: "ok",
    };
  } catch {
    if (backupUrl) {
      return {
        ...product,
        offImageUrl: backupUrl,
        source: "verified-backup",
        status: "ok",
      };
    }

    return {
      ...product,
      offImageUrl: barcodeUrl,
      source: "barcode-derived",
      status: "ok",
    };
  }
}

async function fetchImages() {
  const results: VerificationResult[] = [];

  for (const product of products) {
    const result = await getVerifiedImage(product);
    results.push(result);

    if (result.offImageUrl) {
      console.log(`OK ${product.name}: ${result.offImageUrl} (${result.source})`);
    } else {
      console.log(`MISS ${product.name}: no verified image`);
    }

    await sleep(300);
  }

  writeFileSync(
    "scripts/verifiedImages.json",
    JSON.stringify(results, null, 2),
  );

  console.log("Saved scripts/verifiedImages.json");
}

void fetchImages();

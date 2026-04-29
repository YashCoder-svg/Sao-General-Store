import type { CartItem } from "./store";
import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";

export type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled";

export type StoreOrder = {
  id: string;
  customer: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
  items: number;
  total: number;
  status: OrderStatus;
  date?: string;
  time: string;
  createdAt?: {
    toDate?: () => Date;
    seconds?: number;
  } | Date | string;
  deliverySlot: string;
  paymentMethod: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    weight: string;
  }>;
};

const ORDERS_STORAGE_KEY = "kirana-orders";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function loadStoredOrders(): StoreOrder[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoreOrder(order: StoreOrder) {
  if (!canUseStorage()) return;

  const orders = loadStoredOrders();
  const nextOrders = [order, ...orders.filter((existing) => existing.id !== order.id)];
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
  window.dispatchEvent(new CustomEvent("kirana-orders-updated"));

  setDoc(doc(db, "orders", order.id), {
    ...order,
    createdAt: serverTimestamp(),
  }).catch((error) => {
    console.warn("Unable to sync order to Firestore:", error);
  });
}

export function updateStoredOrderStatus(id: string, status: OrderStatus) {
  if (!canUseStorage()) return;

  const nextOrders = loadStoredOrders().map((order) =>
    order.id === id ? { ...order, status } : order
  );
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));
  window.dispatchEvent(new CustomEvent("kirana-orders-updated"));

  updateDoc(doc(db, "orders", id), { status }).catch((error) => {
    console.warn("Unable to update Firestore order status:", error);
  });
}

export function subscribeToStoreOrders(
  onOrders: (orders: StoreOrder[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      onOrders(snapshot.docs.map((orderDoc) => orderDoc.data() as StoreOrder));
    },
    (error) => {
      onError?.(error);
    }
  );
}

export function createStoreOrder({
  id,
  items,
  total,
  customer,
  mobile,
  address,
  city,
  pincode,
  deliverySlot,
  paymentMethod,
}: {
  id: string;
  items: CartItem[];
  total: number;
  customer: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
  deliverySlot: string;
  paymentMethod: string;
}): StoreOrder {
  const placedAt = new Date();

  return {
    id,
    customer,
    mobile,
    address,
    city,
    pincode,
    items: items.reduce((count, item) => count + item.quantity, 0),
    total,
    status: "Pending",
    date: placedAt.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: placedAt.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }),
    deliverySlot,
    paymentMethod,
    products: items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      weight: item.weight,
    })),
  };
}

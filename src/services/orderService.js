/**
 * Order Service - Manages order operations
 * Structured to support both localStorage and Firebase in future
 */

// ============= LOCALSTORAGE OPERATIONS =============

export const fetchOrdersFromLocalStorage = () => {
  try {
    const orders = localStorage.getItem("orders");
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error("Error fetching orders from localStorage:", error);
    return [];
  }
};

export const getLatestOrderFromLocalStorage = () => {
  try {
    const order = localStorage.getItem("latestOrder");
    return order ? JSON.parse(order) : null;
  } catch (error) {
    console.error("Error fetching latest order:", error);
    return null;
  }
};

export const updateOrderStatusInLocalStorage = (orderId, newStatus, timeline) => {
  try {
    const orders = fetchOrdersFromLocalStorage();
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus, statusTimeline: timeline }
        : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.setItem("latestOrder", JSON.stringify(updatedOrders[0]));
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
};

// ============= FIREBASE OPERATIONS (FUTURE) =============

export const fetchOrdersFromFirebase = async () => {
  // TODO: Implement Firebase Firestore query
  // Example:
  // const q = query(collection(db, "orders"), where("userId", "==", currentUserId));
  // const snapshot = await getDocs(q);
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.warn("Firebase orders not yet implemented. Using localStorage fallback.");
  return fetchOrdersFromLocalStorage();
};

export const saveOrderToFirebase = async (order) => {
  // TODO: Implement Firebase Firestore save
  // Example:
  // await addDoc(collection(db, "orders"), {
  //   ...order,
  //   userId: getCurrentUserId(),
  //   createdAt: serverTimestamp(),
  // });
  console.warn("Firebase save not yet implemented. Using localStorage fallback.");
};

export const updateOrderStatusInFirebase = async (orderId, newStatus, timeline) => {
  // TODO: Implement Firebase Firestore update
  // Example:
  // const orderRef = doc(db, "orders", orderId);
  // await updateDoc(orderRef, {
  //   status: newStatus,
  //   statusTimeline: timeline,
  //   updatedAt: serverTimestamp(),
  // });
  console.warn("Firebase update not yet implemented. Using localStorage fallback.");
};

// ============= UNIFIED OPERATIONS (USE THESE) =============

export const fetchAllOrders = async (useFirebase = false) => {
  if (useFirebase) {
    return await fetchOrdersFromFirebase();
  }
  return fetchOrdersFromLocalStorage();
};

export const getLatestOrder = async (useFirebase = false) => {
  if (useFirebase) {
    // TODO: Implement Firebase fetch latest
    return null;
  }
  return getLatestOrderFromLocalStorage();
};

export const updateOrderStatus = async (orderId, newStatus, timeline, useFirebase = false) => {
  if (useFirebase) {
    return await updateOrderStatusInFirebase(orderId, newStatus, timeline);
  }
  return updateOrderStatusInLocalStorage(orderId, newStatus, timeline);
};

// ============= UTILITY FUNCTIONS =============

export const getOrderCount = () => {
  const orders = fetchOrdersFromLocalStorage();
  return orders.length;
};

export const formatOrderDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
  const colors = {
    "Order Placed": "#ff8a3d",
    "Preparing Food": "#ffc107",
    "Out for Delivery": "#2196f3",
    "Delivered": "#4caf50",
  };
  return colors[status] || "#999";
};

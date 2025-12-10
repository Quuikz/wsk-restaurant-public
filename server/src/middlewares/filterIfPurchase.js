"use strict";

const connectToPurchaseService = async (orderId) => {
  // Placeholder for connecting to an external purchase service
  return true; // Simulate successful connection
};

const filterIfPurchase = (req, res, next) => {
  try {
    //check if purchase is made
    // No real purchase logic implemented, just a placeholder

    if (connectToPurchaseService()) {
      console.log("Purchase verified, proceeding to next middleware");
      next();
    } else {
      console.log("Purchase not made, blocking access");
      res.status(403).json({ message: "Access denied. Purchase required." });
    }
  } catch (error) {
    console.error("Error in purchase filter middleware:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default filterIfPurchase;

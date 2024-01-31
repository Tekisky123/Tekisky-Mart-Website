import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Context = createContext();

const AppContext = ({ children }) => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [singleItems, setSingleItems] = useState({});

  const [ourProduct, setOurProduct] = useState([]);
  const [selectProductData, setSelectProductData] = useState(null);
  const [productSize, setProductSize] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [singleSubTotal, setSingleSubTotal] = useState(0);

  const [totalSavedAmount, setTotalSavedAmount] = useState(0);
  const [singleSavedAmount, setSingleSavedAmount] = useState(0);
  const [singleProductSubTotal, setSingleProductSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);


  console.log("singleItems",singleItems)


  useEffect(() => {
    let subTotal = 0;
    let totalSavedAmount = 0;
    let cartCount = 0;
  
    cartItems.forEach((item) => {
      if (item && item.selectedSize) {
        const itemSubTotal = item.selectedSize.offerPrice * item.selectedSize.quantity;
        subTotal += itemSubTotal;
        totalSavedAmount += (item.selectedSize.mrp - item.selectedSize.offerPrice) * item.selectedSize.quantity;
      } else if (item) {
        const itemSubTotal = item.offerPrice * item.quantity;
        subTotal += itemSubTotal;
        totalSavedAmount += (item.mrp - item.offerPrice) * item.quantity;
      }
  
      // Count the total number of items
      cartCount += item.quantity || 0;
    });
  
    setCartSubTotal(subTotal);
    setTotalSavedAmount(totalSavedAmount);
    setCartCount(cartCount);
  }, [cartItems]);

  
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleAddToCart = (product, quantity, currentItem) => {
    if (!selectProductData) {
      // Handle the case where selectProductData is not defined
      ourProduct.push(product._id);
      console.error("selectProductData is not defined");
    } else {
      // Assuming ourProduct is defined somewhere in your code
      ourProduct.push(selectProductData._id);
    }

    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product._id);

    if (index !== -1) {
      if (Array.isArray(items[index].quantity)) {
        items[index].quantity += quantity;
      } else {
        items[index].quantity = [quantity];
      }
    } else {
      if (Array.isArray(product?.quantity)) {
        product.quantity = quantity;
      } else {
        product.quantity = [quantity];
      }
      items = [...items, product];
    }

    localStorage.setItem("cartItems", JSON.stringify(items));

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };

  const handleAddToCartHome = (product, quantity) => {
    if (!selectProductData) {
      // Handle the case where selectProductData is not defined
      ourProduct.push(product?._id);
    } else {
      // Assuming ourProduct is defined somewhere in your code
      ourProduct.push(selectProductData._id);
    }

    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product._id);

    if (index !== -1) {
      if (Array.isArray(items[index].quantity)) {
        items[index].quantity += quantity;
      } else {
        items[index].quantity = [quantity];
      }
    } else {
      if (Array.isArray(product.quantity)) {
        product.quantity = quantity;
      } else {
        product.quantity = [quantity];
      }
      items = [...items, product];
    }

    localStorage.setItem("cartItems", JSON.stringify(items));

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };

  // console.log("cartItems",cartItems)

  const handleRemoveFromCart = (product, index) => {
    console.log("product", product);

    // Remove from cartItems
    let updatedCartItems = [...cartItems];
    updatedCartItems = updatedCartItems.filter((p) => p._id !== product._id);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

    // Remove from ourProduct based on index
    let updatedOurProduct = [...ourProduct];
    updatedOurProduct.splice(index, 1); // Remove the product at the specified index

    // Check if updatedCartItems is empty and update updatedOurProduct accordingly
    if (updatedCartItems.length === 0) {
      updatedOurProduct = [];
    }

    setOurProduct(updatedOurProduct);
  };


  const handleBuyNow = (product) => {
    // setSingleItems(product)
    // console.log('buyNow', product);
    setSingleItems({
      ...singleItems,
      product:product,
    });
    navigate(`/single-product/${product?._id}`)
  }

  const handleSingleCheckout = (product) => {
    // setSingleItems(product)
    navigate(`/sp-payment-step`)
  }

  const handleCartProductQuantity = (type, product) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item._id === product._id) {
          let productDetails = item.selectedSize;
          let homeProductDetails = item;

          // if (!productDetails) {
          //   // Handle the case where productDetails is undefined
          //   return item;
          // }
          if (productDetails) {
            if (type === "inc") {
              // Ensure that productDetails.quantity exists and is a number
              if (typeof productDetails.quantity === "number") {
                productDetails.quantity += 1;
              } else {
                // If quantity is not a number, set it to 1
                productDetails.quantity = 1;
              }
            } else if (type === "dec" && productDetails.quantity > 1) {
              productDetails.quantity -= 1;
            }
          } else {
            if (type === "inc") {
              // Ensure that productDetails.quantity exists and is a number
              if (typeof homeProductDetails.quantity === "number") {
                homeProductDetails.quantity += 1;
              } else {
                // If quantity is not a number, set it to 1
                homeProductDetails.quantity = 1;
              }
            } else if (type === "dec" && homeProductDetails.quantity > 1) {
              homeProductDetails.quantity -= 1;
            }
          }
        }

        return item;
      });
    });
  };
  const handleSingleProductQuantity = (type, product) => {
    setSingleItems((prevItem) => {
      // Create a copy of the previous item to avoid mutating the state directly
      const newItem = { ...prevItem };
  

        if (newItem) {
          if (type === "inc") {
            if (typeof newItem.quantity == "number") {
              newItem.quantity += 1;
            } else {
              newItem.quantity = 1;
            }
          } else if (type === "dec" && newItem.quantity > 1) {
            newItem.quantity -= 1;
          }
        }
        // newItem.product = product;
  
      return newItem;
    });
  };
  

  return (
    <Context.Provider
      value={{
        ourProduct,
        setOurProduct,
        quantity,
        setQuantity,
        productSize,
        setProductSize,
        selectProductData,
        setSelectProductData,
        toast,
        ToastContainer,
        products,
        setProducts,
        categories,
        setCategories,
        singleItems,
        setSingleItems,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        handleAddToCart,
        handleAddToCartHome,
        handleRemoveFromCart,
        handleCartProductQuantity,
        setSingleProductSubTotal,
        singleProductSubTotal,
        handleBuyNow,
        handleSingleProductQuantity,
        totalSavedAmount,
        handleSingleCheckout,
        singleSubTotal,
        setSingleSubTotal,
        setSingleSavedAmount,
        singleSavedAmount
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;

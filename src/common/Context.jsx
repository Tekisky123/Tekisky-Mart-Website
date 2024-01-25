import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext();

const AppContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [ourProduct, setOurProduct] = useState([]);
  const [selectProductData, setSelectProductData] = useState(null);
  const [productSize, setProductSize] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [singleProductSubTotal, setSingleProductSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  

const increment = () => {
  setQuantity(quantity + 1);
};

const decrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

useEffect(() => {
  let subTotal = 0;
  let  singleTotal=0;
  cartItems.forEach(item => {
    if (item && item.selectedSize ) {
      subTotal += item?.selectedSize?.offerPrice * item?.selectedSize?.quantity;
    }else if(item && item.productDetails[0]){
      subTotal += item?.productDetails[0]?.offerPrice * item?.productDetails[0]?.quantity;
    }
    
  });
  // singleTotal = singleProductSubTotal?.offerPrice * item?.productDetails[0]?.quantity||1;

  // singleProductSubTotal.offerPrice 
  setCartSubTotal(singleTotal||subTotal);

  let count = 0;

  cartItems.forEach(item => {
    if (item && item.selectedSize) {
      count += item.selectedSize;
    }
  });
  setCartCount(count);
}, [cartItems]);


  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    
  }, []);
  
  
  const handleAddToCart = (product, quantity,currentItem) => {

    if (!selectProductData) {
      // Handle the case where selectProductData is not defined
      ourProduct.push(product.productDetails[0]._id);
      console.error("selectProductData is not defined");
  
    }else{
    // Assuming ourProduct is defined somewhere in your code
    ourProduct.push(selectProductData._id);
    }

    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product._id);

    console.log("items:", items);
    console.log("index:", index);
    console.log("productDetails:", items[index]?.productDetails[currentItem]);
    console.log("quantity:", items[index]?.productDetails[currentItem]?.quantity);

    if (index !== -1) {
      if (Array.isArray(items[index].productDetails[currentItem].quantity)) {
        items[index].productDetails[currentItem].quantity += quantity;
      } else {
        items[index].productDetails[currentItem].quantity = [quantity];
      }
    } else {
      if (Array.isArray(product.productDetails[currentItem]?.quantity)) {
        product.productDetails[currentItem].quantity = quantity;
      } else {
        product.productDetails[currentItem].quantity = [quantity];
      }
      items = [...items, product];
    }

    localStorage.setItem('cartItems', JSON.stringify(items));

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };


  const handleAddToCartHome = (product, quantity,currentItem) => {

    if (!selectProductData) {
      // Handle the case where selectProductData is not defined
      ourProduct.push(product.productDetails[0]._id);
      console.error("selectProductData is not defined");
  
    }else{
    // Assuming ourProduct is defined somewhere in your code
    ourProduct.push(selectProductData._id);
    }

    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product._id);

    console.log("items:", items);
    console.log("index:", index);
    console.log("productDetails:", items[index]?.productDetails[0]);
    console.log("quantity:", items[index]?.productDetails[0]?.quantity);

    if (index !== -1) {
      if (Array.isArray(items[index].productDetails[0].quantity)) {
        items[index].productDetails[0].quantity += quantity;
      } else {
        items[index].productDetails[0].quantity = [quantity];
      }
    } else {
      if (Array.isArray(product.productDetails[0]?.quantity)) {
        product.productDetails[0].quantity = quantity;
      } else {
        product.productDetails[0].quantity = [quantity];
      }
      items = [...items, product];
    }

    localStorage.setItem('cartItems', JSON.stringify(items));

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };

  // console.log("cartItems",cartItems)


  const handleRemoveFromCart = (product, index) => {
    console.log("product", product);
  
    // Remove from cartItems
    let updatedCartItems = [...cartItems];
    updatedCartItems = updatedCartItems.filter(p => p._id !== product._id);
  
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
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
  
  

const handleCartProductQuantity = (type, product) => {
  setCartItems((prevItems) => {
    return prevItems.map((item) => {
      if (item._id === product._id) {
        let productDetails = item.selectedSize;
        let homeProductDetails = item.productDetails[0];

        // if (!productDetails) {
        //   // Handle the case where productDetails is undefined
        //   return item;
        // }
     if(productDetails){
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
        }else{
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
        singleProductSubTotal
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;

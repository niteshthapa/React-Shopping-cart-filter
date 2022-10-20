import { type } from "@testing-library/user-event/dist/type";
import { GET_PRODUCT } from "../ProductType";
export const initialValue = {
    allproducts: [],
    loading: true
  }
const ProductReducer = (state, action) => {
    const {type,payload} = action;
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                allproducts: payload,
                loading:false
            }

        default: return state
    }

}

export default ProductReducer;
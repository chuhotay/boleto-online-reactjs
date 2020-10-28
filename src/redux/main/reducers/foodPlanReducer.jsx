import * as foodPlanConstants from "redux/main/constants/foodPlanConstants";

const initialState = {
  loading: false,
  error: null,
  bookingState: null,
  food: [
    {
      id: 1,
      name: "Muchaco",
      price: 7,
      type: "single",
      image: "/pop1.png",
      amount: 0,
    },
    {
      id: 2,
      name: "Crispy Taco",
      price: 7,
      type: "single",
      image: "/pop2.png",
      amount: 0,
    },
    {
      id: 3,
      name: "Combo 1",
      price: 11,
      type: "combo",
      image: "/pop3.png",
      amount: 0,
    },
    {
      id: 4,
      name: "Combo 2",
      price: 11,
      type: "combo",
      image: "/pop4.png",
      amount: 0,
    },
    {
      id: 5,
      name: "Combo 3",
      price: 11,
      type: "combo",
      image: "/pop1.png",
      amount: 0,
    },
    {
      id: 6,
      name: "Combo 4",
      price: 11,
      type: "combo",
      image: "/pop2.png",
      amount: 0,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case foodPlanConstants.ADD_FOOD:
      let { actionType } = action;
      let foodUpdate = JSON.parse(JSON.stringify(state.food));
      let index = foodUpdate.findIndex((items) => items.id === action.food.id);

      if (actionType) {
        foodUpdate[index].amount += 1;
      } else {
        if (foodUpdate[index].amount > 0) {
          foodUpdate[index].amount -= 1;
        }
      }

      state.food = foodUpdate;
      return { ...state };
    case foodPlanConstants.BOOKING_TICKETS_REQUEST:
      state.loading = true;
      return { ...state };

    case foodPlanConstants.BOOKING_TICKETS_SUCCESS:
      state.loading = false;
      state.bookingState = action.payload;
      return { ...state };

    case foodPlanConstants.BOOKING_TICKETS_FAIL:
      state.loading = false;
      state.error = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

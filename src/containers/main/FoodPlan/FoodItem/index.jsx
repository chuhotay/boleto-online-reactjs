import React from "react";
import styles from "./FoodItem.module.scss";
import "assets/sass/components/button.scss";
import { useDispatch } from "react-redux";
import * as foodPlanActions from "redux/main/actions/foodPlanActions";

function FoodItem(props) {
  const dispatch = useDispatch();
  // sdasdadadsadasdasdadsadsadsad
  return (
    <div className={`${styles.FoodItem} col-6 col-md-4 col-lg-6 col-xl-4`}>
      <div className={`${styles.CardContent} card`}>
        <img
          className="card-img-top"
          src={props.food.image}
          alt={props.food.name}
        />
        <div className={`${styles.Body} card-body text-white`}>
          <h5 className="card-title text-center">{props.food.name}</h5>
          <div className={styles.Action}>
            <button
              className={styles.Minus}
              onClick={() => {
                dispatch(foodPlanActions.actAddFood(props.food, false));
              }}
            >
              -
            </button>
            <input value={props.food.amount} disabled />
            <button
              className={styles.Plus}
              onClick={() => {
                dispatch(foodPlanActions.actAddFood(props.food, true));
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.Price}>${props.food.price}</div>
    </div>
  );
}

export default FoodItem;

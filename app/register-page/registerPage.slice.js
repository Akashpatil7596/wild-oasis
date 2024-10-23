import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  loading: false,
  data: []
};

// Redux Toolkit

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.loading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance = state.balance - state.loan;
    },
    convertingCurrency(state, action) {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.data =  [...state.data, action.payload];
    });
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  // If currency is in USD

  if (currency === "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }

  return async function (dispatch, getState) {
    dispatch({
      type: "account/convertingCurrency",
    });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();

    const converted = data?.rates?.USD;

    setTimeout(() => {
      dispatch({
        type: "account/deposit",
        payload: converted,
      });
    }, 2000);
  };
}

export const registerAsync = createAsyncThunk(
  "account/registerAsync",
  async (payload) => {
    console.log('payload',payload);
    
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/1`
    );

    const data = await res.json();

    return data
  }
);

export default accountSlice.reducer;
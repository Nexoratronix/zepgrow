// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import settingsReducer from "../reuducer/settingSlice";
// import sliderReducer from '../reuducer/sliderSlice';
// import categoryReducer from '../reuducer/categorySlice'
// import userReducer from '../reuducer/userSlice';
// import BreadcrumbPathReducer from '../reuducer/breadCrumbSlice'
// import CurrentLanguageReducer from '../reuducer/languageSlice'
// import locationReducer from '../reuducer/locationSlice';
// import offerReducer from '../reuducer/offerSlice';
// import searchReducer from "../reuducer/searchSlice"
// import globalStateReducer from '../reuducer/globalStateSlice';
// import filterReducer from '../reuducer/filterSlice'
// import authReducer from '../reuducer/authSlice';
// const persistConfig = {
//   key: 'root',
//   storage,
//   manualPersisting: true,
// };


// const rootReducer = combineReducers({
//   Settings: settingsReducer,
//   Slider: sliderReducer,
//   Category: categoryReducer,
//   UserSignup: userReducer,
//   BreadcrumbPath: BreadcrumbPathReducer,
//   CurrentLanguage: CurrentLanguageReducer,
//   Location: locationReducer,
//   OfferData: offerReducer,
//   Search: searchReducer,
//   GlobalState: globalStateReducer,
//   Filter: filterReducer,
//   UserSignup: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   ],
// });

// export const persistor = persistStore(store);



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settingsReducer from "../reuducer/settingSlice";
import sliderReducer from '../reuducer/sliderSlice';
import categoryReducer from '../reuducer/categorySlice';
import userReducer from '../reuducer/userSlice'; // Check if this is needed
import BreadcrumbPathReducer from '../reuducer/breadCrumbSlice';
import CurrentLanguageReducer from '../reuducer/languageSlice';
import locationReducer from '../reuducer/locationSlice';
import offerReducer from '../reuducer/offerSlice';
import searchReducer from "../reuducer/searchSlice";
import globalStateReducer from '../reuducer/globalStateSlice';
import filterReducer from '../reuducer/filterSlice';
import authReducer from '../reuducer/authSlice';


const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: 'root',
  storage: typeof window !== 'undefined' && window.localStorage ? storage : createNoopStorage(),
};

const rootReducer = combineReducers({
  Settings: settingsReducer,
  Slider: sliderReducer,
  Category: categoryReducer,
  // UserSignup: userReducer,
  BreadcrumbPath: BreadcrumbPathReducer,
  CurrentLanguage: CurrentLanguageReducer,
  Location: locationReducer,
  OfferData: offerReducer,
  Search: searchReducer,
  GlobalState: globalStateReducer,
  Filter: filterReducer,
  UserSignup: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
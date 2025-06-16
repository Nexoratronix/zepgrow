// 'use client'
// import MapComponent from '@/components/MyListing/MapComponent';
// import { getIsBrowserSupported } from '@/redux/reuducer/locationSlice';
// import { t } from '@/utils';
// import React, { useState } from 'react';
// import { BiMapPin } from 'react-icons/bi';
// import { GrLocation } from 'react-icons/gr';
// import { MdOutlineMyLocation } from 'react-icons/md';
// import { useSelector } from 'react-redux';
// import AddAddressManuallyModal from './AddAddressManuallyModal';

// const ContentFive = ({ getCurrentLocation, handleGoBack, Location, handleFullSubmission, getLocationWithMap, setAddress, Address, isAdPlaced, CountryStore, setCountryStore, handleCountryScroll, StateStore, setStateStore, handleStateScroll, setCityStore, CityStore, handleCityScroll, AreaStore, setAreaStore, handleAreaScroll, setLocation }) => {

//     const IsBrowserSupported = useSelector(getIsBrowserSupported)
//     const [IsManuallyAddress, setIsManuallyAddress] = useState(false)

//     return (
//         <>
//             <div className="col-12">
//                 <div className='locationTabHead'>
//                     <h2>{t('addLocation')}</h2>
//                     {
//                         IsBrowserSupported &&
//                         <button className='locateMeBtnCont' onClick={getCurrentLocation}>
//                             <MdOutlineMyLocation size={18} />
//                             <span>{t('locateMe')}</span>
//                         </button>
//                     }
//                 </div>
//             </div>
//             <div className="col-12">
//                 <MapComponent getLocationWithMap={getLocationWithMap} Location={Location} />
//             </div>

//             <div className="col-12">
//                 <div className='locationAddressCont'>
//                     <div className='LocationaddressIconCont'>
//                         <BiMapPin size={36} color={getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()} />
//                     </div>
//                     <div className='locAddressContent'>
//                         <h6>{t('address')}</h6>
//                         {
//                             Location?.address ? <p>{Location?.address}</p> : t('addYourAddress')
//                         }
//                     </div>
//                 </div>
//             </div>

//             <div className="col-12">
//                 <div className="divider-container">
//                     <div className="divider-line"></div>
//                     <div className="divider-text">{t('or')}</div>
//                 </div>
//             </div>

//             <div className="col-12">
//                 <div className='locAddAddresBtnCont'>
//                     <h5>{t('whatLocAdYouSelling')}</h5>
//                     <button className='addAddressBtn' onClick={() => setIsManuallyAddress(true)}>
//                         <GrLocation size={18} />
//                         <span>{t('addLocation')}</span>
//                     </button>
//                     <button className='addAddressBtn' onClick={loadProfileLocation}>
//                         <GrLocation size={18} />
//                         <span>{t('useProfileAddress')}</span>
//                     </button>
//                 </div>
//             </div>
//             <div className="col-12">
//                 <div className="formBtns">
//                     <button className='backBtn' onClick={handleGoBack}>{t('back')}</button>
//                     {
//                         isAdPlaced ?
//                             <button className='btn btn-secondary' disabled>{t('posting')}</button>
//                             :
//                             <button className='nextBtn' onClick={handleFullSubmission} disabled={isAdPlaced}> {t('postNow')}</button>
//                     }
//                 </div>
//             </div>
//             <AddAddressManuallyModal isOpen={IsManuallyAddress} OnHide={() => setIsManuallyAddress(false)} setCountryStore={setCountryStore} CountryStore={CountryStore} handleCountryScroll={handleCountryScroll} StateStore={StateStore} setStateStore={setStateStore} handleStateScroll={handleStateScroll} CityStore={CityStore} setCityStore={setCityStore} handleCityScroll={handleCityScroll} AreaStore={AreaStore} setAreaStore={setAreaStore} handleAreaScroll={handleAreaScroll} setAddress={setAddress} Address={Address} setLocation={setLocation} />
//         </>
//     )
// }

// export default ContentFive



// "use client";
// import MapComponent from "@/components/MyListing/MapComponent";
// import { getIsBrowserSupported } from "@/redux/reuducer/locationSlice";
// import { t } from "@/utils";
// import React, { useState, useEffect } from "react";
// import { BiMapPin } from "react-icons/bi";
// import { GrLocation } from "react-icons/gr";
// import { MdOutlineMyLocation } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import AddAddressManuallyModal from "./AddAddressManuallyModal";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { setCityData } from "@/redux/reuducer/locationSlice";

// const ContentFive = ({
//   getCurrentLocation,
//   handleGoBack,
//   Location,
//   handleFullSubmission,
//   getLocationWithMap,
//   setAddress,
//   Address,
//   isAdPlaced,
//   CountryStore,
//   setCountryStore,
//   handleCountryScroll,
//   StateStore,
//   setStateStore,
//   handleStateScroll,
//   setCityStore,
//   CityStore,
//   handleCityScroll,
//   AreaStore,
//   setAreaStore,
//   handleAreaScroll,
//   setLocation,
//   loadProfileLocation,
// }) => {
//   const dispatch = useDispatch();
//   const IsBrowserSupported = useSelector(getIsBrowserSupported);
//   const [IsManuallyAddress, setIsManuallyAddress] = useState(false);
//   const [profileAddress, setProfileAddress] = useState("");
//   const [needsMapConfirmation, setNeedsMapConfirmation] = useState(false);

//   // Function to geocode the address using Nominatim
//   const geocodeAddress = async (address) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
//       );
//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         return { lat: parseFloat(lat), long: parseFloat(lon) };
//       } else {
//         toast.error(t("unableToGeocodeAddress"));
//         return null;
//       }
//     } catch (error) {
//       console.error("Error geocoding address:", error);
//       toast.error(t("geocodeFailed"));
//       return null;
//     }
//   };

//   // Load and display the profile address from local storage
//   const loadAndDisplayProfileAddress = async () => {
//     const storedLocation = JSON.parse(localStorage.getItem("userLocation")) || {};
//     if (storedLocation.country && storedLocation.state && storedLocation.city && storedLocation.specificAddress) {
//       const fullAddress = `${storedLocation.specificAddress}, ${storedLocation.city}, ${storedLocation.state}, ${storedLocation.country}`;
//       setProfileAddress(fullAddress);

//       // Geocode the address to get lat/long
//       const coordinates = await geocodeAddress(fullAddress);
//       if (coordinates) {
//         const locationData = {
//           country: storedLocation.country,
//           state: storedLocation.state,
//           city: storedLocation.city,
//           address: fullAddress,
//           lat: coordinates.lat,
//           long: coordinates.long,
//         };
//         setLocation(locationData);
//         // Optionally, save to Redux store
//         dispatch(setCityData({ data: locationData }));
//       } else {
//         // Fallback: prompt user to set pin manually
//         setLocation({
//           country: storedLocation.country,
//           state: storedLocation.state,
//           city: storedLocation.city,
//           address: fullAddress,
//         });
//         setNeedsMapConfirmation(true);
//       }
//       setAddress(storedLocation.specificAddress);
//     } else {
//       setProfileAddress("");
//       toast.error(t("noProfileAddressFound"));
//     }
//   };

//   useEffect(() => {
//     loadAndDisplayProfileAddress();
//   }, []);

//   const handleLoadProfileLocation = async () => {
//     await loadAndDisplayProfileAddress();
//     loadProfileLocation();
//   };

//   const handleMapInteraction = (pos) => {
//     getLocationWithMap(pos);
//     setNeedsMapConfirmation(false);
//   };

//   return (
//     <>
//       <div className="col-12">
//         <div className="locationTabHead">
//           <h2>{t("addLocation")}</h2>
//           {IsBrowserSupported && (
//             <button className="locateMeBtnCont" onClick={getCurrentLocation}>
//               <MdOutlineMyLocation size={18} />
//               <span>{t("locateMe")}</span>
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="col-12">
//         <MapComponent getLocationWithMap={handleMapInteraction} Location={Location} />
//         {needsMapConfirmation && (
//           <div className="mapPrompt" style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
//             <p>{t("clickOnMapToPinLocation")}</p>
//           </div>
//         )}
//       </div>
//       <div className="col-12">
//         <div className="locationAddressCont">
//           <div className="LocationaddressIconCont">
//             <BiMapPin
//               size={36}
//               color={getComputedStyle(document.documentElement)
//                 .getPropertyValue("--primary-color")
//                 .trim()}
//             />
//           </div>
//           <div className="locAddressContent">
//             <h6>{t("address")}</h6>
//             <p>{profileAddress || Location?.address || t("addYourAddress")}</p>
//           </div>
//         </div>
//       </div>
//       {/* <div className="col-12">
//         <div className="divider-container">
//           <div className="divider-line"></div>
//           <div className="divider-text">{t("or")}</div>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="locAddAddresBtnCont">
//           <h5>{t("whatLocAdYouSelling")}</h5>
//           <button className="addAddressBtn" onClick={() => setIsManuallyAddress(true)}>
//             <GrLocation size={18} />
//             <span>{t("addLocation")}</span>
//           </button>
//           <button className="addAddressBtn" onClick={handleLoadProfileLocation}>
//             <GrLocation size={18} />
//             <span>{t("useProfileAddress")}</span>
//           </button>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="formBtns">
//           <button className="backBtn" onClick={handleGoBack}>
//             {t("back")}
//           </button>
//           {isAdPlaced ? (
//             <button className="btn btn-secondary" disabled>
//               {t("posting")}
//             </button>
//           ) : (
//             <button
//               className="nextBtn"
//               onClick={handleFullSubmission}
//               disabled={isAdPlaced || (needsMapConfirmation && !Location?.lat)}
//             >
//               {t("postNow")}
//             </button>
//           )}
//         </div>
//       </div> */}
//       <AddAddressManuallyModal
//         isOpen={IsManuallyAddress}
//         OnHide={() => setIsManuallyAddress(false)}
//         setCountryStore={setCountryStore}
//         CountryStore={CountryStore}
//         handleCountryScroll={handleCountryScroll}
//         StateStore={StateStore}
//         setStateStore={setStateStore}
//         handleStateScroll={handleStateScroll}
//         CityStore={CityStore}
//         setCityStore={setCityStore}
//         handleCityScroll={handleCityScroll}
//         AreaStore={AreaStore}
//         setAreaStore={setAreaStore}
//         handleAreaScroll={handleAreaScroll}
//         setAddress={setAddress}
//         Address={Address}
//         setLocation={setLocation}
//       />
//     </>
//   );
// };

// export default ContentFive;

//FOR API FETCH

// "use client";
// import MapComponent from "@/components/MyListing/MapComponent";
// import { getIsBrowserSupported } from "@/redux/reuducer/locationSlice";
// import { t } from "@/utils";
// import React, { useState, useEffect } from "react";
// import { BiMapPin } from "react-icons/bi";
// import { GrLocation } from "react-icons/gr";
// import { MdOutlineMyLocation } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import AddAddressManuallyModal from "./AddAddressManuallyModal";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { setCityData } from "@/redux/reuducer/locationSlice";
// import { getProfileApi } from "@/utils/api"; 

// const ContentFive = ({
//   getCurrentLocation,
//   handleGoBack,
//   Location,
//   handleFullSubmission,
//   getLocationWithMap,
//   setAddress,
//   Address,
//   isAdPlaced,
//   CountryStore,
//   setCountryStore,
//   handleCountryScroll,
//   StateStore,
//   setStateStore,
//   handleStateScroll,
//   setCityStore,
//   CityStore,
//   handleCityScroll,
//   AreaStore,
//   setAreaStore,
//   handleAreaScroll,
//   setLocation,
//   loadProfileLocation,
// }) => {
//   const dispatch = useDispatch();
//   const IsBrowserSupported = useSelector(getIsBrowserSupported);
//   const [IsManuallyAddress, setIsManuallyAddress] = useState(false);
//   const [profileAddress, setProfileAddress] = useState("");
//   const [needsMapConfirmation, setNeedsMapConfirmation] = useState(false);

//   // Function to geocode the address using Nominatim
//   const geocodeAddress = async (address) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
//       );
//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         console.log("Geocoding successful:", { lat: parseFloat(lat), long: parseFloat(lon) });
//         return { lat: parseFloat(lat), long: parseFloat(lon) };
//       } else {
//         toast.error(t("unableToGeocodeAddress"));
//         console.log("Geocoding failed: No results found for address:", address);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error geocoding address:", error);
//       toast.error(t("geocodeFailed"));
//       return null;
//     }
//   };

//   // Load and display the profile address from the API
//   const loadAndDisplayProfileAddress = async () => {
//   try {
//     const response = await getProfileApi.getProfile();
//     if (response.data.error === false && response.data.data.address) {
//       const fullAddress = response.data.data.address;
//       setProfileAddress(fullAddress);

//       const addressParts = fullAddress.split(", ").map(s => s.trim());
//       if (addressParts.length >= 4) {
//         const [specificAddress, city, state, country] = addressParts;
//         const locationData = {
//           country,
//           state,
//           city,
//           address: fullAddress,
//         };
//         setLocation(locationData);
//         toast.success(t("profileAddressLoaded"));
//       } else {
//         toast.error(t("invalidAddressFormat"));
//       }
//     } else {
//       setProfileAddress("");
//       toast.error(t("noProfileAddressFound"));
//     }
//   } catch (error) {
//     console.error("Error fetching profile address:", error);
//     setProfileAddress("");
//     toast.error(t("errorFetchingProfileAddress"));
//   }
// };


//   // const loadAndDisplayProfileAddress = async () => {
//   //   try {
//   //     console.log("Fetching profile address...");
//   //     const response = await getProfileApi.getProfile();
//   //     console.log('Profile Response:', response.data);
//   //     if (response.data.error === false && response.data.data.address) {
//   //       const fullAddress = response.data.data.address;
//   //       setProfileAddress(fullAddress);

//   //       const addressParts = fullAddress.split(", ").map(s => s.trim());
//   //       if (addressParts.length >= 4) {
//   //         const [specificAddress, city, state, country] = addressParts;
//   //         const locationData = {
//   //           country,
//   //           state,
//   //           city,
//   //           address: fullAddress,
//   //         };
//   //         setLocation(locationData);
//   //         setValue('location', fullAddress);
//   //         setValue('country', country);
//   //         setValue('state', state);
//   //         setValue('city', city);
//   //         setValue('specificAddress', specificAddress);
//   //         toast.success(t("profileAddressLoaded"));
//   //       } else {
//   //         toast.error(t("invalidAddressFormat"));
//   //       }
//   //     } else {
//   //       setProfileAddress("");
//   //       toast.error(t("noProfileAddressFound"));
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching profile address:", error);
//   //     if (error.response) {
//   //       console.log("Response data:", error.response.data);
//   //       console.log("Response status:", error.response.status);
//   //       console.log("Response headers:", error.response.headers);
//   //     } else if (error.request) {
//   //       console.log("Request made but no response received:", error.request);
//   //     } else {
//   //       console.log("Error setting up request:", error.message);
//   //     }
//   //     setProfileAddress("");
//   //     toast.error(t("errorFetchingProfileAddress"));
//   //   }
//   // };

//   useEffect(() => {
//     loadAndDisplayProfileAddress(); // Fetch address when the page opens
//   }, []);

//   const handleLoadProfileLocation = async () => {
//     await loadAndDisplayProfileAddress();
//     if (loadProfileLocation) loadProfileLocation(); // Call parent function if provided
//     console.log("Profile location loaded via button click");
//   };

//   const handleMapInteraction = (pos) => {
//     getLocationWithMap(pos);
//     setNeedsMapConfirmation(false);
//     console.log("Map interaction successful, location updated:", pos);
//   };

//   return (
//     <>
//       <div className="col-12">
//         <div className="locationTabHead">
//           <h2>{t("addLocation")}</h2>
//           {IsBrowserSupported && (
//             <button className="locateMeBtnCont" onClick={getCurrentLocation}>
//               <MdOutlineMyLocation size={18} />
//               <span>{t("locateMe")}</span>
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="col-12">
//         <MapComponent getLocationWithMap={handleMapInteraction} Location={Location} />
//         {needsMapConfirmation && (
//           <div className="mapPrompt" style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
//             <p>{t("clickOnMapToPinLocation")}</p>
//           </div>
//         )}
//       </div>
//       <div className="col-12">
//         <div className="locationAddressCont">
//           <div className="LocationaddressIconCont">
//             <BiMapPin
//               size={36}
//               color={getComputedStyle(document.documentElement)
//                 .getPropertyValue("--primary-color")
//                 .trim()}
//             />
//           </div>
//           <div className="locAddressContent">
//             <h6>{t("address")}</h6>
//             <p>{profileAddress || Location?.address || t("addYourAddress")}</p>
//           </div>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="divider-container">
//           <div className="divider-line"></div>
//           <div className="divider-text">{t("or")}</div>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="locAddAddresBtnCont">
//           <h5>{t("whatLocAdYouSelling")}</h5>
//           <button className="addAddressBtn" onClick={() => setIsManuallyAddress(true)}>
//             <GrLocation size={18} />
//             <span>{t("addLocation")}</span>
//           </button>
//           <button className="addAddressBtn" onClick={handleLoadProfileLocation}>
//             <GrLocation size={18} />
//             <span>{t("useProfileAddress")}</span>
//           </button>
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="formBtns">
//           <button className="backBtn" onClick={handleGoBack}>
//             {t("back")}
//           </button>
//           {isAdPlaced ? (
//             <button className="btn btn-secondary" disabled>
//               {t("posting")}
//             </button>
//           ) : (
//             <button
//               className="nextBtn"
//               onClick={handleFullSubmission}
//               disabled={isAdPlaced || (needsMapConfirmation && !Location?.lat)}
//             >
//               {t("postNow")}
//             </button>
//           )}
//         </div>
//       </div>
//       <AddAddressManuallyModal
//         isOpen={IsManuallyAddress}
//         OnHide={() => setIsManuallyAddress(false)}
//         setCountryStore={setCountryStore}
//         CountryStore={CountryStore}
//         handleCountryScroll={handleCountryScroll}
//         StateStore={StateStore}
//         setStateStore={setStateStore}
//         handleStateScroll={handleStateScroll}
//         CityStore={CityStore}
//         setCityStore={setCityStore}
//         handleCityScroll={handleCityScroll}
//         AreaStore={AreaStore}
//         setAreaStore={setAreaStore}
//         handleAreaScroll={handleAreaScroll}
//         setAddress={setAddress}
//         Address={Address}
//         setLocation={setLocation}
//       />
//     </>
//   );
// };

// export default ContentFive;



// REDUX
"use client";
import MapComponent from "@/components/MyListing/MapComponent";
import { getIsBrowserSupported } from "@/redux/reuducer/locationSlice";
import { t } from "@/utils";
import React, { useState, useEffect } from "react";
import { BiMapPin } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { MdOutlineMyLocation } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { userSignUpData } from "@/redux/reuducer/authSlice";
import AddAddressManuallyModal from "./AddAddressManuallyModal";
import toast from "react-hot-toast";
import axios from "axios";
import { setCityData } from "@/redux/reuducer/locationSlice";

const ContentFive = ({
  getCurrentLocation,
  handleGoBack,
  Location,
  setLocation,
  handleFullSubmission,
  getLocationWithMap,
  setAddress,
  Address,
  isAdPlaced,
  CountryStore,
  setCountryStore,
  handleCountryScroll,
  StateStore,
  setStateStore,
  handleStateScroll,
  setCityStore,
  CityStore,
  handleCityScroll,
  AreaStore,
  setAreaStore,
  handleAreaScroll,
}) => {
  const dispatch = useDispatch();
  const IsBrowserSupported = useSelector(getIsBrowserSupported);
  const User = useSelector(userSignUpData); // Fetch user data from Redux
  const [IsManuallyAddress, setIsManuallyAddress] = useState(false);
  const [profileAddress, setProfileAddress] = useState("");
  const [needsMapConfirmation, setNeedsMapConfirmation] = useState(false);

  // Function to geocode the address using Nominatim
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), long: parseFloat(lon) };
      } else {
        toast.error(t("unableToGeocodeAddress"));
        return null;
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      toast.error(t("geocodeFailed"));
      return null;
    }
  };

  // Load and display the profile address from Redux
  const loadAndDisplayProfileAddress = async () => {
    const userAddress = User?.address; // Get address from Redux
    if (userAddress) {
      setProfileAddress(userAddress);

      // Parse the address (assumes format: "specificAddress, city, state, country")
      const parts = userAddress.split(",").map((part) => part.trim());
      if (parts.length >= 4) {
        const country = parts[parts.length - 1];
        const state = parts[parts.length - 2];
        const city = parts[parts.length - 3];
        const specificAddress = parts.slice(0, -3).join(", "); // Handle commas in specificAddress

        // Geocode the full address
        const coordinates = await geocodeAddress(userAddress);
        if (coordinates) {
          const locationData = {
            country,
            state,
            city,
            address: userAddress,
            lat: coordinates.lat,
            long: coordinates.long,
          };
          setLocation(locationData);
          dispatch(setCityData({ data: locationData }));
        } else {
          // If geocoding fails, set location without coordinates and prompt for manual pinning
          setLocation({
            country,
            state,
            city,
            address: userAddress,
          });
          setNeedsMapConfirmation(true);
        }
        setAddress(specificAddress);
      } else {
        toast.error(t("invalidAddressFormat"));
        setProfileAddress(userAddress);
        setNeedsMapConfirmation(true); // Prompt user to set location manually
      }
    } else {
      setProfileAddress("");
      toast.error(t("noProfileAddressFound"));
    }
  };

  // Load profile address on component mount or when User data changes
  useEffect(() => {
    loadAndDisplayProfileAddress();
  }, [User]);

  // Handle clicking "Use Profile Address"
  const handleLoadProfileLocation = () => {
    loadAndDisplayProfileAddress();
  };

  // Handle map interaction to set location
  const handleMapInteraction = (pos) => {
    getLocationWithMap(pos);
    setNeedsMapConfirmation(false);
  };

  return (
    <>
      <div className="col-12">
        <div className="locationTabHead">
          <h2>{t("addLocation")}</h2>
          {IsBrowserSupported && (
            <button className="locateMeBtnCont" onClick={getCurrentLocation}>
              <MdOutlineMyLocation size={18} />
              <span>{t("locateMe")}</span>
            </button>
          )}
        </div>
      </div>
      <div className="col-12">
        <MapComponent getLocationWithMap={handleMapInteraction} Location={Location} />
        {needsMapConfirmation && (
          <div className="mapPrompt" style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            <p>{t("clickOnMapToPinLocation")}</p>
          </div>
        )}
      </div>
      <div className="col-12">
        <div className="locationAddressCont">
          <div className="LocationaddressIconCont">
            <BiMapPin
              size={36}
              color={getComputedStyle(document.documentElement)
                .getPropertyValue("--primary-color")
                .trim()}
            />
          </div>
          <div className="locAddressContent">
            <h6>{t("address")}</h6>
            <p>{profileAddress || Location?.address || t("addYourAddress")}</p>
          </div>
        </div>
      </div>
      {/* <div className="col-12">
        <div className="divider-container">
          <div className="divider-line"></div>
          <div className="divider-text">{t("or")}</div>
        </div>
      </div>
      <div className="col-12">
        <div className="locAddAddresBtnCont">
          <h5>{t("whatLocAdYouSelling")}</h5>
          <button className="addAddressBtn" onClick={() => setIsManuallyAddress(true)}>
            <GrLocation size={18} />
            <span>{t("addLocation")}</span>
          </button>
          <button className="addAddressBtn" onClick={handleLoadProfileLocation}>
            <GrLocation size={18} />
            <span>{t("useProfileAddress")}</span>
          </button>
        </div>
      </div> */}
      <div className="col-12">
        <div className="formBtns">
          <button className="backBtn" onClick={handleGoBack}>
            {t("back")}
          </button>
          {isAdPlaced ? (
            <button className="btn btn-secondary" disabled>
              {t("posting")}
            </button>
          ) : (
            <button
              className="nextBtn"
              onClick={handleFullSubmission}
              disabled={isAdPlaced || (needsMapConfirmation && !Location?.lat)}
            >
              {t("postNow")}
            </button>
          )}
        </div>
      </div>
      <AddAddressManuallyModal
        isOpen={IsManuallyAddress}
        OnHide={() => setIsManuallyAddress(false)}
        setCountryStore={setCountryStore}
        CountryStore={CountryStore}
        handleCountryScroll={handleCountryScroll}
        StateStore={StateStore}
        setStateStore={setStateStore}
        handleStateScroll={handleStateScroll}
        CityStore={CityStore}
        setCityStore={setCityStore}
        handleCityScroll={handleCityScroll}
        AreaStore={AreaStore}
        setAreaStore={setAreaStore}
        handleAreaScroll={handleAreaScroll}
        setAddress={setAddress}
        Address={Address}
        setLocation={setLocation}
      />
    </>
  );
};

export default ContentFive;
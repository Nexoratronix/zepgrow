// "use client";
// import ProfileSidebar from "@/components/Profile/ProfileSidebar";
// import Image from "next/image";
// import { isLogin, placeholderImage, t } from "@/utils";
// import { useSelector } from "react-redux";
// import { userSignUpData } from "@/redux/reuducer/authSlice";
// import { useEffect, useState } from "react";
// import { MdAddPhotoAlternate, MdVerifiedUser } from "react-icons/md";
// import { getVerificationStatusApi, updateProfileApi } from "@/utils/api";
// import { Fcmtoken, settingsData } from "@/redux/reuducer/settingSlice";
// import toast from "react-hot-toast";
// import { loadUpdateUserData } from "../../../redux/reuducer/authSlice";
// import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
// import { CurrentLanguageData } from "@/redux/reuducer/languageSlice";
// import { useRouter } from "next/navigation";

// const EditProfile = () => {
//   const router = useRouter();
//   const CurrentLanguage = useSelector(CurrentLanguageData);
//   const systemSettings = useSelector(settingsData);
//   const placeholder_image = systemSettings?.data?.placeholder_image;
//   const User = useSelector(userSignUpData);
//   const UserData = User;
//   const fetchFCM = useSelector(Fcmtoken);
//   const [formData, setFormData] = useState({
//     name: UserData?.name || "",
//     email: UserData?.email || "",
//     phone: UserData?.mobile || "",
//     address: UserData?.address || "",
//     notification: UserData?.notification,
//     show_personal_details: Number(UserData?.show_personal_details),
//   });
//   const [profileImage, setProfileImage] = useState(
//     UserData?.profile || placeholder_image
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [profileFile, setProfileFile] = useState(null);
//   const [VerificationStatus, setVerificationStatus] = useState("");
//   const [RejectionReason, setRejectionReason] = useState("");

//   const getVerificationProgress = async () => {
//     try {
//       const res = await getVerificationStatusApi.getVerificationStatus();
//       if (res?.data?.error === true) {
//         setVerificationStatus("not applied");
//       } else {
//         const status = res?.data?.data?.status;
//         const rejectReason = res?.data?.data?.rejection_reason;
//         setVerificationStatus(status);
//         setRejectionReason(rejectReason);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (isLogin()) {
//       getVerificationProgress();
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileFile(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleToggleChange = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       notification: prevData.notification === 1 ? 0 : 1,
//     }));
//   };
//   const handlePrivateChange = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       show_personal_details: prevData.show_personal_details === 1 ? 0 : 1,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (
//         !formData?.name.trim() ||
//         !formData?.address.trim()
//       ) {
//         toast.error(t("emptyFieldNotAllowed"));
//         return;
//       }
//       setIsLoading(true);
//       const response = await updateProfileApi.updateProfile({
//         name: formData.name,
//         email: formData.email,
//         mobile: formData.phone,
//         address: formData.address,
//         profile: profileFile,
//         fcm_id: fetchFCM ? fetchFCM : "",
//         notification: formData.notification,
//         show_personal_details: formData?.show_personal_details,
//       });

//       const data = response.data;
//       if (data.error !== true) {
//         loadUpdateUserData(data?.data);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerfiyNow = () => {
//     router.push("/user-verification");
//   };

//   return (
//     <>
//       <BreadcrumbComponent title2={t("editProfile")} />
//       <div className="container">
//         <div className="row my_prop_title_spacing">
//           <h4 className="pop_cat_head">{t("myProfile")}</h4>
//         </div>

//         <div className="row profile_sidebar">
//           <ProfileSidebar />
//           <div className="col-lg-9 p-0">
//             <div className="profile_content">
//               <div className="userDetCont">
//                 <div className="user_detail">
//                   <div className="profile_image_div">
//                     <Image
//                       src={profileImage}
//                       width={120}
//                       height={120}
//                       alt="User"
//                       className="user_img"
//                       onErrorCapture={placeholderImage}
//                     />
//                     <div className="add_profile">
//                       <input
//                         type="file"
//                         id="profileImageUpload"
//                         className="upload_input"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                       <label
//                         htmlFor="profileImageUpload"
//                         className="upload_label"
//                       >
//                         <MdAddPhotoAlternate size={22} />
//                       </label>
//                     </div>
//                   </div>
//                   <div className="user_info">
//                     <h5 className="username">{UserData?.name}</h5>
//                     <p className="user_email">{UserData?.email}</p>
//                   </div>
//                 </div>

//                 {/* <button className="verfiyNowBtn pendingVerBtn">{t('pending')}</button> */}

//                 {VerificationStatus === "approved" ? (
//                   <div className="verfied_cont">
//                     <MdVerifiedUser size={14} />
//                     <p className="verified_text">{t("verified")}</p>
//                   </div>
//                 ) : VerificationStatus === "not applied" ? (
//                   <button className="verfiyNowBtn" onClick={handleVerfiyNow}>
//                     {t("verfiyNow")}
//                   </button>
//                 ) : VerificationStatus === "rejected" ? (
//                   <div className="rejectReasonCont">
//                     <p className="rejectedReasonLabel">{RejectionReason}</p>
//                     <button
//                       className="verfiyNowBtn applyAgain"
//                       onClick={handleVerfiyNow}
//                     >
//                       {t("applyAgain")}
//                     </button>
//                   </div>
//                 ) : VerificationStatus === "pending" ||
//                   VerificationStatus === "resubmitted" ? (
//                   <button className="verfiyNowBtn pendingVerBtn">
//                     {t("inReview")}
//                   </button>
//                 ) : null}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="personal_info">
//                   <h5 className="personal_info_text">{t("personalInfo")}</h5>
//                   <div className="authrow">
//                     <div className="auth_in_cont">
//                       <label htmlFor="name" className="auth_label">
//                         {t("name")}
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="auth_input personal_info_input"
//                         value={formData.name}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="privateNotifCont">
//                       <div className="auth_in_cont">
//                         <label
//                           htmlFor="notification"
//                           className="auth_pers_label"
//                         >
//                           {t("notification")}{" "}
//                         </label>
//                         <span className="switch mt-2">
//                           <input
//                             id="switch-rounded"
//                             type="checkbox"
//                             checked={
//                               formData.notification === "1" ||
//                               formData.notification === 1
//                             }
//                             onChange={handleToggleChange}
//                           />
//                           <label htmlFor="switch-rounded"></label>
//                         </span>
//                       </div>
//                       <div className="auth_in_cont">
//                         <label
//                           htmlFor="showContactInfo"
//                           className="auth_pers_label"
//                         >
//                           {t("showContactInfo")}{" "}
//                         </label>
//                         <span className="switch mt-2">
//                           <input
//                             id="showContactInfo"
//                             type="checkbox"
//                             checked={
//                               formData.show_personal_details === "1" ||
//                               formData.show_personal_details === 1
//                             }
//                             onChange={handlePrivateChange}
//                           />
//                           <label htmlFor="showContactInfo"></label>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="authrow">
//                     <div className="auth_in_cont">
//                       <label htmlFor="email" className="auth_label">
//                         {t("email")}
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="auth_input personal_info_input"
//                         value={formData.email}
//                         onChange={handleChange}
//                         readOnly={
//                           UserData?.type === "email" ||
//                             UserData?.type === "google"
//                             ? true
//                             : false
//                         }
//                       />
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="phone" className="auth_pers_label">
//                         {t("phoneNumber")}
//                       </label>
//                       <input
//                         type="number"
//                         id="phone"
//                         min={0}
//                         className="auth_input personal_info_input"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         readOnly={UserData?.type === "phone" ? true : false}
//                         disabled
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="address">
//                   <h5 className="personal_info_text">{t("address")}</h5>
//                   <div className="address_wrapper">
//                     <div className="auth_in_cont">
//                       <label htmlFor="address" className="auth_label">
//                         {t("address")}
//                       </label>
//                       <textarea
//                         name="address"
//                         id="address"
//                         rows="3"
//                         className="auth_input personal_info_input"
//                         value={formData.address}
//                         onChange={handleChange}
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="sv_chng_btn"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <div className="loader-container-otp">
//                       <div className="loader-otp"></div>
//                     </div>
//                   ) : (
//                     t("saveChanges")
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfile;



"use client";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import Image from "next/image";
import { isLogin, placeholderImage, t } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { userSignUpData, loadUpdateUserData } from "@/redux/reuducer/authSlice";
import { useEffect, useState } from "react";
import { MdAddPhotoAlternate, MdVerifiedUser } from "react-icons/md";
import { getVerificationStatusApi, updateProfileApi, getCoutriesApi, getStatesApi, getCitiesApi } from "@/utils/api";
import { Fcmtoken, settingsData } from "@/redux/reuducer/settingSlice";
import toast from "react-hot-toast";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { CurrentLanguageData } from "@/redux/reuducer/languageSlice";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const CurrentLanguage = useSelector(CurrentLanguageData);
  const systemSettings = useSelector(settingsData);
  const placeholder_image = systemSettings?.data?.placeholder_image;
  const User = useSelector(userSignUpData);
  const UserData = User;
  const fetchFCM = useSelector(Fcmtoken);

  const [formData, setFormData] = useState({
    name: UserData?.name || "",
    email: UserData?.email || "",
    phone: UserData?.mobile || "",
    address: UserData?.address || "",
    notification: UserData?.notification || 0,
    show_personal_details: Number(UserData?.show_personal_details) || 0,
  });
  const [profileImage, setProfileImage] = useState(UserData?.profile || placeholder_image);
  const [isLoading, setIsLoading] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [VerificationStatus, setVerificationStatus] = useState("");
  const [RejectionReason, setRejectionReason] = useState("");

  // Location state for dropdowns
  const [CountryStore, setCountryStore] = useState({
    Countries: [],
    SelectedCountry: {},
    CountrySearch: "",
    currentPage: 1,
    hasMore: false,
  });
  const [StateStore, setStateStore] = useState({
    States: [],
    SelectedState: {},
    StateSearch: "",
    currentPage: 1,
    hasMore: false,
  });
  const [CityStore, setCityStore] = useState({
    Cities: [],
    SelectedCity: {},
    CitySearch: "",
    currentPage: 1,
    hasMore: false,
  });
  const [specificAddress, setSpecificAddress] = useState("");

  const getVerificationProgress = async () => {
    try {
      const res = await getVerificationStatusApi.getVerificationStatus();
      if (res?.data?.error === true) {
        setVerificationStatus("not applied");
      } else {
        const status = res?.data?.data?.status;
        const rejectReason = res?.data?.data?.rejection_reason;
        setVerificationStatus(status);
        setRejectionReason(rejectReason);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountriesData = async (search, page) => {
    try {
      const params = {};
      if (search) params.search = search;
      else params.page = page;
      const res = await getCoutriesApi.getCoutries(params);
      let allCountries = page > 1 ? [...CountryStore.Countries, ...res?.data?.data?.data] : res?.data?.data?.data;
      setCountryStore(prev => ({
        ...prev,
        currentPage: res?.data?.data?.current_page,
        Countries: allCountries,
        hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
      }));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getStatesData = async (search, page) => {
    try {
      const params = { country_id: CountryStore?.SelectedCountry?.id };
      if (search) params.search = search;
      else params.page = page;
      const res = await getStatesApi.getStates(params);
      let allStates = page > 1 ? [...StateStore.States, ...res?.data?.data?.data] : res?.data?.data?.data;
      setStateStore(prev => ({
        ...prev,
        currentPage: res?.data?.data?.current_page,
        States: allStates,
        hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
      }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCitiesData = async (search, page) => {
    try {
      const params = { state_id: StateStore?.SelectedState?.id };
      if (search) params.search = search;
      else params.page = page;
      const res = await getCitiesApi.getCities(params);
      let allCities = page > 1 ? [...CityStore.Cities, ...res?.data?.data?.data] : res?.data?.data?.data;
      setCityStore(prev => ({
        ...prev,
        currentPage: res?.data?.data?.current_page,
        Cities: allCities,
        hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (isLogin()) {
      getVerificationProgress();
      getCountriesData("", 1);
    }
  }, []);

  useEffect(() => {
    if (CountryStore.SelectedCountry?.id) {
      getStatesData("", 1);
    }
  }, [CountryStore.SelectedCountry?.id]);

  useEffect(() => {
    if (StateStore.SelectedState?.id) {
      getCitiesData("", 1);
    }
  }, [StateStore.SelectedState?.id]);

  // Update address textarea only when all fields are filled
  useEffect(() => {
    if (CountryStore.SelectedCountry?.id && StateStore.SelectedState?.id && CityStore.SelectedCity?.id && specificAddress) {
      const fullAddress = `${specificAddress}, ${CityStore.SelectedCity.name}, ${StateStore.SelectedState.name}, ${CountryStore.SelectedCountry.name}`;
      setFormData(prev => ({ ...prev, address: fullAddress }));
    }
  }, [CountryStore.SelectedCountry, StateStore.SelectedState, CityStore.SelectedCity, specificAddress]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      notification: prevData.notification === 1 ? 0 : 1,
    }));
  };

  const handlePrivateChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      show_personal_details: prevData.show_personal_details === 1 ? 0 : 1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData?.name?.trim() || !formData?.address?.trim()) {
        toast.error(t("emptyFieldNotAllowed"));
        return;
      }
      setIsLoading(true);

      const response = await updateProfileApi.updateProfile({
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        address: formData.address,
        profile: profileFile,
        fcm_id: fetchFCM ? fetchFCM : "",
        notification: formData.notification,
        show_personal_details: formData?.show_personal_details,
      });

      const data = response?.data;
      if (data?.error === false && data?.data) {
        dispatch(loadUpdateUserData({ data: data.data })); // Ensure correct payload format
        toast.success(data.message || t("updateSuccess"));
      } else {
        toast.error(data?.message || t("updateFailed"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.success("Profile updated successfully");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerfiyNow = () => {
    router.push("/user-verification");
  };

  return (
    <>
      <BreadcrumbComponent title2={t("editProfile")} />
      <div className="container">
        <div className="row my_prop_title_spacing">
          <h4 className="pop_cat_head">{t("myProfile")}</h4>
        </div>

        <div className="row profile_sidebar">
          <ProfileSidebar />
          <div className="col-lg-9 p-0">
            <div className="profile_content">
              <div className="userDetCont">
                <div className="user_detail">
                  <div className="profile_image_div">
                    <Image
                      src={profileImage}
                      width={120}
                      height={120}
                      alt="User"
                      className="user_img"
                      onErrorCapture={placeholderImage}
                    />
                    <div className="add_profile">
                      <input
                        type="file"
                        id="profileImageUpload"
                        className="upload_input"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="profileImageUpload" className="upload_label">
                        <MdAddPhotoAlternate size={22} />
                      </label>
                    </div>
                  </div>
                  <div className="user_info">
                    <h5 className="username">{UserData?.name}</h5>
                    <p className="user_email">{UserData?.email}</p>
                  </div>
                </div>

                {VerificationStatus === "approved" ? (
                  <div className="verfied_cont">
                    <MdVerifiedUser size={14} />
                    <p className="verified_text">{t("verified")}</p>
                  </div>
                ) : VerificationStatus === "not applied" ? (
                  <button className="verfiyNowBtn" onClick={handleVerfiyNow}>
                    {t("verfiyNow")}
                  </button>
                ) : VerificationStatus === "rejected" ? (
                  <div className="rejectReasonCont">
                    <p className="rejectedReasonLabel">{RejectionReason}</p>
                    <button className="verfiyNowBtn applyAgain" onClick={handleVerfiyNow}>
                      {t("applyAgain")}
                    </button>
                  </div>
                ) : VerificationStatus === "pending" || VerificationStatus === "resubmitted" ? (
                  <button className="verfiyNowBtn pendingVerBtn">{t("inReview")}</button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="personal_info">
                  <h5 className="personal_info_text">{t("personalInfo")}</h5>
                  <div className="authrow">
                    <div className="auth_in_cont">
                      <label htmlFor="name" className="auth_label">{t("name")}</label>
                      <input
                        type="text"
                        id="name"
                        className="auth_input personal_info_input"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="privateNotifCont">
                      <div className="auth_in_cont">
                        <label htmlFor="notification" className="auth_pers_label">{t("notification")}</label>
                        <span className="switch mt-2">
                          <input
                            id="switch-rounded"
                            type="checkbox"
                            checked={formData.notification === 1}
                            onChange={handleToggleChange}
                          />
                          <label htmlFor="switch-rounded"></label>
                        </span>
                      </div>
                      <div className="auth_in_cont">
                        <label htmlFor="showContactInfo" className="auth_pers_label">{t("showContactInfo")}</label>
                        <span className="switch mt-2">
                          <input
                            id="showContactInfo"
                            type="checkbox"
                            checked={formData.show_personal_details === 1}
                            onChange={handlePrivateChange}
                          />
                          <label htmlFor="showContactInfo"></label>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="authrow">
                    <div className="auth_in_cont">
                      <label htmlFor="email" className="auth_label">{t("email")}</label>
                      <input
                        type="email"
                        id="email"
                        className="auth_input personal_info_input"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={UserData?.type === "email" || UserData?.type === "google"}
                      />
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="phone" className="auth_pers_label">{t("phoneNumber")}</label>
                      <input
                        type="number"
                        id="phone"
                        min={0}
                        className="auth_input personal_info_input"
                        value={formData.phone}
                        onChange={handleChange}
                        readOnly={UserData?.type === "phone"}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="address">
                  <h5 className="personal_info_text">{t("address")}</h5>
                  <div className="address_wrapper">
                    <div className="auth_in_cont">
                      <label htmlFor="country" className="auth_label">{t("country")}</label>
                      <select
                        id="country"
                        className="auth_input personal_info_input"
                        value={CountryStore.SelectedCountry?.id || ""}
                        onChange={(e) => {
                          const selected = CountryStore.Countries.find(c => c.id === Number(e.target.value));
                          setCountryStore(prev => ({ ...prev, SelectedCountry: selected || {} }));
                          setStateStore({ States: [], SelectedState: {}, StateSearch: "", currentPage: 1, hasMore: false });
                          setCityStore({ Cities: [], SelectedCity: {}, CitySearch: "", currentPage: 1, hasMore: false });
                        }}
                      >
                        <option value="">{t("selectCountry")}</option>
                        {CountryStore.Countries.map(country => (
                          <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="state" className="auth_label">{t("state")}</label>
                      <select
                        id="state"
                        className="auth_input personal_info_input"
                        value={StateStore.SelectedState?.id || ""}
                        onChange={(e) => {
                          const selected = StateStore.States.find(s => s.id === Number(e.target.value));
                          setStateStore(prev => ({ ...prev, SelectedState: selected || {} }));
                          setCityStore({ Cities: [], SelectedCity: {}, CitySearch: "", currentPage: 1, hasMore: false });
                        }}
                        disabled={!CountryStore.SelectedCountry?.id}
                      >
                        <option value="">{t("selectState")}</option>
                        {StateStore.States.map(state => (
                          <option key={state.id} value={state.id}>{state.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="city" className="auth_label">{t("city")}</label>
                      <select
                        id="city"
                        className="auth_input personal_info_input"
                        value={CityStore.SelectedCity?.id || ""}
                        onChange={(e) => {
                          const selected = CityStore.Cities.find(c => c.id === Number(e.target.value));
                          setCityStore(prev => ({ ...prev, SelectedCity: selected || {} }));
                        }}
                        disabled={!StateStore.SelectedState?.id}
                      >
                        <option value="">{t("selectCity")}</option>
                        {CityStore.Cities.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="specificAddress" className="auth_label">{t("specificAddress")}</label>
                      <input
                        type="text"
                        id="specificAddress"
                        className="auth_input personal_info_input"
                        value={specificAddress}
                        onChange={(e) => setSpecificAddress(e.target.value)}
                      />
                    </div>
                    <div className="auth_in_cont">
                      <label htmlFor="address" className="auth_label">{t("address")}</label>
                      <textarea
                        name="address"
                        id="address"
                        rows="3"
                        className="auth_input personal_info_input"
                        value={formData.address}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="sv_chng_btn" disabled={isLoading}>
                  {isLoading ? (
                    <div className="loader-container-otp">
                      <div className="loader-otp"></div>
                    </div>
                  ) : (
                    t("saveChanges")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;


// ADDRES WITH API 

// "use client";
// import ProfileSidebar from "@/components/Profile/ProfileSidebar";
// import Image from "next/image";
// import { isLogin, placeholderImage, t } from "@/utils";
// import { useSelector, useDispatch } from "react-redux";
// import { userSignUpData, userUpdateData } from "@/redux/reuducer/authSlice"; // Updated import
// import { useEffect, useState } from "react";
// import { MdAddPhotoAlternate, MdVerifiedUser } from "react-icons/md";
// import { getVerificationStatusApi, updateProfileApi, getCoutriesApi, getStatesApi, getCitiesApi } from "@/utils/api";
// import { Fcmtoken, settingsData } from "@/redux/reuducer/settingSlice";
// import toast from "react-hot-toast";
// import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
// import { CurrentLanguageData } from "@/redux/reuducer/languageSlice";
// import { useRouter } from "next/navigation";

// const EditProfile = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const CurrentLanguage = useSelector(CurrentLanguageData);
//   const systemSettings = useSelector(settingsData);
//   const placeholder_image = systemSettings?.data?.placeholder_image;
//   const User = useSelector(userSignUpData);
//   const UserData = User;
//   const fetchFCM = useSelector(Fcmtoken);

//   const [formData, setFormData] = useState({
//     name: UserData?.name || "",
//     email: UserData?.email || "",
//     phone: UserData?.mobile || "",
//     address: UserData?.address || "",
//     notification: UserData?.notification,
//     show_personal_details: Number(UserData?.show_personal_details),
//   });
//   const [profileImage, setProfileImage] = useState(UserData?.profile || placeholder_image);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profileFile, setProfileFile] = useState(null);
//   const [VerificationStatus, setVerificationStatus] = useState("");
//   const [RejectionReason, setRejectionReason] = useState("");

//   // Location state for dropdowns
//   const [CountryStore, setCountryStore] = useState({
//     Countries: [],
//     SelectedCountry: {},
//     CountrySearch: "",
//     currentPage: 1,
//     hasMore: false,
//   });
//   const [StateStore, setStateStore] = useState({
//     States: [],
//     SelectedState: {},
//     StateSearch: "",
//     currentPage: 1,
//     hasMore: false,
//   });
//   const [CityStore, setCityStore] = useState({
//     Cities: [],
//     SelectedCity: {},
//     CitySearch: "",
//     currentPage: 1,
//     hasMore: false,
//   });
//   const [specificAddress, setSpecificAddress] = useState("");

//   const getVerificationProgress = async () => {
//     try {
//       const res = await getVerificationStatusApi.getVerificationStatus();
//       if (res?.data?.error === true) {
//         setVerificationStatus("not applied");
//       } else {
//         const status = res?.data?.data?.status;
//         const rejectReason = res?.data?.data?.rejection_reason;
//         setVerificationStatus(status);
//         setRejectionReason(rejectReason);
//       }
//     } catch (error) {
//       console.log("Error fetching verification status:", error);
//     }
//   };

//   const getCountriesData = async (search, page) => {
//     try {
//       const params = {};
//       if (search) params.search = search;
//       else params.page = page;
//       const res = await getCoutriesApi.getCoutries(params);
//       let allCountries = page > 1 ? [...CountryStore.Countries, ...res?.data?.data?.data] : res?.data?.data?.data;
//       setCountryStore(prev => ({
//         ...prev,
//         currentPage: res?.data?.data?.current_page,
//         Countries: allCountries,
//         hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
//       }));
//       console.log("Countries data fetched successfully:", allCountries);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };

//   const getStatesData = async (search, page) => {
//     try {
//       const params = { country_id: CountryStore?.SelectedCountry?.id };
//       if (search) params.search = search;
//       else params.page = page;
//       const res = await getStatesApi.getStates(params);
//       let allStates = page > 1 ? [...StateStore.States, ...res?.data?.data?.data] : res?.data?.data?.data;
//       setStateStore(prev => ({
//         ...prev,
//         currentPage: res?.data?.data?.current_page,
//         States: allStates,
//         hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
//       }));
//       console.log("States data fetched successfully:", allStates);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const getCitiesData = async (search, page) => {
//     try {
//       const params = { state_id: StateStore?.SelectedState?.id };
//       if (search) params.search = search;
//       else params.page = page;
//       const res = await getCitiesApi.getCities(params);
//       let allCities = page > 1 ? [...CityStore.Cities, ...res?.data?.data?.data] : res?.data?.data?.data;
//       setCityStore(prev => ({
//         ...prev,
//         currentPage: res?.data?.data?.current_page,
//         Cities: allCities,
//         hasMore: res?.data?.data?.current_page < res?.data?.data?.last_page,
//       }));
//       console.log("Cities data fetched successfully:", allCities);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     if (isLogin()) {
//       getVerificationProgress();
//       getCountriesData("", 1);
//     }
//   }, []);

//   useEffect(() => {
//     if (CountryStore.SelectedCountry?.id) {
//       getStatesData("", 1);
//     }
//   }, [CountryStore.SelectedCountry?.id]);

//   useEffect(() => {
//     if (StateStore.SelectedState?.id) {
//       getCitiesData("", 1);
//     }
//   }, [StateStore.SelectedState?.id]);

//   useEffect(() => {
//     if (CountryStore.SelectedCountry?.id && StateStore.SelectedState?.id && CityStore.SelectedCity?.id && specificAddress) {
//       const fullAddress = `${specificAddress}, ${CityStore.SelectedCity.name}, ${StateStore.SelectedState.name}, ${CountryStore.SelectedCountry.name}`;
//       setFormData(prev => ({ ...prev, address: fullAddress }));
//       console.log("Address updated successfully in formData:", fullAddress);
//     }
//   }, [CountryStore.SelectedCountry, StateStore.SelectedState, CityStore.SelectedCity, specificAddress]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//     console.log(`Form field updated - ${id}:`, value);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileFile(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result);
//         console.log("Profile image updated successfully:", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleToggleChange = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       notification: prevData.notification === 1 ? 0 : 1,
//     }));
//     console.log("Notification toggle updated:", formData.notification === 1 ? 0 : 1);
//   };

//   const handlePrivateChange = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       show_personal_details: prevData.show_personal_details === 1 ? 0 : 1,
//     }));
//     console.log("Show personal details toggle updated:", formData.show_personal_details === 1 ? 0 : 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formData?.name.trim() || !formData?.address.trim()) {
//         toast.error(t("emptyFieldNotAllowed"));
//         console.log("Validation failed: Name or address is empty");
//         return;
//       }
//       setIsLoading(true);

//       const response = await updateProfileApi.updateProfile({
//         name: formData.name,
//         email: formData.email,
//         mobile: formData.phone,
//         address: formData.address,
//         profile: profileFile,
//         fcm_id: fetchFCM ? fetchFCM : "",
//         notification: formData.notification,
//         show_personal_details: formData?.show_personal_details,
//       });

//       const data = response.data;
//       if (data.error !== true) {
//         // Dispatch userUpdateData directly instead of loadUpdateUserData
//         dispatch(userUpdateData({ data: data?.data }));
//         toast.success(data.message);
//         console.log("Profile updated successfully via API:", data);
//         console.log("Redux state updated with new user data:", data?.data);
//       } else {
//         toast.error(data.message);
//         console.log("Profile update failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error(t("updateFailed"));
//     } finally {
//       setIsLoading(false);
//       console.log("Profile update process completed, loading state reset");
//     }
//   };

//   const handleVerfiyNow = () => {
//     router.push("/user-verification");
//     console.log("Navigating to user verification page");
//   };

//   return (
//     <>
//       <BreadcrumbComponent title2={t("editProfile")} />
//       <div className="container">
//         <div className="row my_prop_title_spacing">
//           <h4 className="pop_cat_head">{t("myProfile")}</h4>
//         </div>

//         <div className="row profile_sidebar">
//           <ProfileSidebar />
//           <div className="col-lg-9 p-0">
//             <div className="profile_content">
//               <div className="userDetCont">
//                 <div className="user_detail">
//                   <div className="profile_image_div">
//                     <Image
//                       src={profileImage}
//                       width={120}
//                       height={120}
//                       alt="User"
//                       className="user_img"
//                       onErrorCapture={placeholderImage}
//                     />
//                     <div className="add_profile">
//                       <input
//                         type="file"
//                         id="profileImageUpload"
//                         className="upload_input"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                       <label htmlFor="profileImageUpload" className="upload_label">
//                         <MdAddPhotoAlternate size={22} />
//                       </label>
//                     </div>
//                   </div>
//                   <div className="user_info">
//                     <h5 className="username">{UserData?.name}</h5>
//                     <p className="user_email">{UserData?.email}</p>
//                   </div>
//                 </div>

//                 {VerificationStatus === "approved" ? (
//                   <div className="verfied_cont">
//                     <MdVerifiedUser size={14} />
//                     <p className="verified_text">{t("verified")}</p>
//                   </div>
//                 ) : VerificationStatus === "not applied" ? (
//                   <button className="verfiyNowBtn" onClick={handleVerfiyNow}>
//                     {t("verfiyNow")}
//                   </button>
//                 ) : VerificationStatus === "rejected" ? (
//                   <div className="rejectReasonCont">
//                     <p className="rejectedReasonLabel">{RejectionReason}</p>
//                     <button className="verfiyNowBtn applyAgain" onClick={handleVerfiyNow}>
//                       {t("applyAgain")}
//                     </button>
//                   </div>
//                 ) : VerificationStatus === "pending" || VerificationStatus === "resubmitted" ? (
//                   <button className="verfiyNowBtn pendingVerBtn">{t("inReview")}</button>
//                 ) : null}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="personal_info">
//                   <h5 className="personal_info_text">{t("personalInfo")}</h5>
//                   <div className="authrow">
//                     <div className="auth_in_cont">
//                       <label htmlFor="name" className="auth_label">{t("name")}</label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="auth_input personal_info_input"
//                         value={formData.name}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="privateNotifCont">
//                       <div className="auth_in_cont">
//                         <label htmlFor="notification" className="auth_pers_label">{t("notification")}</label>
//                         <span className="switch mt-2">
//                           <input
//                             id="switch-rounded"
//                             type="checkbox"
//                             checked={formData.notification === "1" || formData.notification === 1}
//                             onChange={handleToggleChange}
//                           />
//                           <label htmlFor="switch-rounded"></label>
//                         </span>
//                       </div>
//                       <div className="auth_in_cont">
//                         <label htmlFor="showContactInfo" className="auth_pers_label">{t("showContactInfo")}</label>
//                         <span className="switch mt-2">
//                           <input
//                             id="showContactInfo"
//                             type="checkbox"
//                             checked={formData.show_personal_details === "1" || formData.show_personal_details === 1}
//                             onChange={handlePrivateChange}
//                           />
//                           <label htmlFor="showContactInfo"></label>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="authrow">
//                     <div className="auth_in_cont">
//                       <label htmlFor="email" className="auth_label">{t("email")}</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="auth_input personal_info_input"
//                         value={formData.email}
//                         onChange={handleChange}
//                         readOnly={UserData?.type === "email" || UserData?.type === "google"}
//                       />
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="phone" className="auth_pers_label">{t("phoneNumber")}</label>
//                       <input
//                         type="number"
//                         id="phone"
//                         min={0}
//                         className="auth_input personal_info_input"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         readOnly={UserData?.type === "phone"}
//                         disabled
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="address">
//                   <h5 className="personal_info_text">{t("address")}</h5>
//                   <div className="address_wrapper">
//                     <div className="auth_in_cont">
//                       <label htmlFor="country" className="auth_label">{t("country")}</label>
//                       <select
//                         id="country"
//                         className="auth_input personal_info_input"
//                         value={CountryStore.SelectedCountry?.id || ""}
//                         onChange={(e) => {
//                           const selected = CountryStore.Countries.find(c => c.id === Number(e.target.value));
//                           setCountryStore(prev => ({ ...prev, SelectedCountry: selected || {} }));
//                           setStateStore({ States: [], SelectedState: {}, StateSearch: "", currentPage: 1, hasMore: false });
//                           setCityStore({ Cities: [], SelectedCity: {}, CitySearch: "", currentPage: 1, hasMore: false });
//                         }}
//                       >
//                         <option value="">{t("selectCountry")}</option>
//                         {CountryStore.Countries.map(country => (
//                           <option key={country.id} value={country.id}>{country.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="state" className="auth_label">{t("state")}</label>
//                       <select
//                         id="state"
//                         className="auth_input personal_info_input"
//                         value={StateStore.SelectedState?.id || ""}
//                         onChange={(e) => {
//                           const selected = StateStore.States.find(s => s.id === Number(e.target.value));
//                           setStateStore(prev => ({ ...prev, SelectedState: selected || {} }));
//                           setCityStore({ Cities: [], SelectedCity: {}, CitySearch: "", currentPage: 1, hasMore: false });
//                         }}
//                         disabled={!CountryStore.SelectedCountry?.id}
//                       >
//                         <option value="">{t("selectState")}</option>
//                         {StateStore.States.map(state => (
//                           <option key={state.id} value={state.id}>{state.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="city" className="auth_label">{t("city")}</label>
//                       <select
//                         id="city"
//                         className="auth_input personal_info_input"
//                         value={CityStore.SelectedCity?.id || ""}
//                         onChange={(e) => {
//                           const selected = CityStore.Cities.find(c => c.id === Number(e.target.value));
//                           setCityStore(prev => ({ ...prev, SelectedCity: selected || {} }));
//                         }}
//                         disabled={!StateStore.SelectedState?.id}
//                       >
//                         <option value="">{t("selectCity")}</option>
//                         {CityStore.Cities.map(city => (
//                           <option key={city.id} value={city.id}>{city.name}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="specificAddress" className="auth_label">{t("specificAddress")}</label>
//                       <input
//                         type="text"
//                         id="specificAddress"
//                         className="auth_input personal_info_input"
//                         value={specificAddress}
//                         onChange={(e) => setSpecificAddress(e.target.value)}
//                       />
//                     </div>
//                     <div className="auth_in_cont">
//                       <label htmlFor="address" className="auth_label">{t("address")}</label>
//                       <textarea
//                         type="text"
//                         name="address"
//                         id="address"
//                         rows="3"
//                         className="auth_input personal_info_input"
//                         value={formData.address}
//                         onChange={handleChange}
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>

//                 <button type="submit" className="sv_chng_btn" disabled={isLoading}>
//                   {isLoading ? (
//                     <div className="loader-container-otp">
//                       <div className="loader-otp"></div>
//                     </div>
//                   ) : (
//                     t("saveChanges")
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfile;
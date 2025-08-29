"use client";
import { REQUEST_URL } from "@/utils/Constant";
import { useContext, useEffect, useState } from "react";
import MiniProfile from "./MiniProfile";
import { AuthContext } from "@/context/AuthContext";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const { accessToken } = useContext(AuthContext);
  const headers = ["Full Name", "Role", "Branch", "Email", "Enrollment No"];

  const fetchData = async () => {
    const response = await fetch(`${REQUEST_URL}/user/profile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await response.json();
    setProfileData((prevState) => userData);
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken]);

  return (
    <div className="mx-[10%] my-[5%] overflow-hidden">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Student Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details
        </p>
      </div>
      <div className="w-[50%] md:w-[10%] mx-auto">
        <img
          src="/account.png"
          className="mx-auto max-w-full h-auto"
          alt="Profile"
        />
      </div>
      <div>
        <input type="file" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {headers.map((el) => (
            <MiniProfile
              key={el}
              title={el}
              text={profileData[el.split(" ").join("").toLowerCase()]}
            />
          ))}
        </dl>
      </div>
    </div>
  );
}

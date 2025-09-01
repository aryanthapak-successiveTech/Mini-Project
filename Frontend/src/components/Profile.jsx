"use client";
import { useContext, useEffect, useState } from "react";
import MiniProfile from "./MiniProfile";
import { AuthContext } from "@/context/AuthContext";
import { getUserProfileDetails } from "@/utils/apiCalls";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const { accessToken } = useContext(AuthContext);

  const headers = [
    "Full Name",
    "Role",
    "Branch",
    "Email",
    "Enrollment No",
  ];

  const fetchData = async () => {
    try {
      const userData=await getUserProfileDetails(accessToken);
      setProfileData(userData.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchData();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white py-12 px-4 sm:px-8 lg:px-32 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Your Profile</h2>
          <p className="text-sm text-gray-600 mb-6">Manage your personal details</p>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-teal-300">
              <img
                src="/account.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Upload (optional) */}
            <div className="flex flex-col items-center md:items-start">
              <label
                htmlFor="upload"
                className="text-sm text-gray-700 font-medium mb-1"
              >
                Change Profile Picture
              </label>
              <input
                type="file"
                id="upload"
                className="text-sm text-gray-600"
              />
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-100">
              {headers.map((el) => (
                <MiniProfile
                  key={el}
                  title={el}
                  text={
                    profileData[
                      el.toLowerCase().replace(/\s+/g, "")
                    ] || "—"
                  }
                />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

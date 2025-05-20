"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/feature/store";
import { fetchCurrentUser } from "@/feature/reducers/userSlice";
import { UserRoundCog } from "lucide-react";

const MeinKonto = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <p className="font-semibold">❌ Fehler: {error}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-gray-700 mb-4">
            Bitte melden Sie sich an, um Ihr Konto zu sehen.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
            onClick={() => (window.location.href = "/login")}
          >
            Anmelden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">
            <UserRoundCog className="h-8 w-8 text-gray-800" />
          </span>
          Mein Konto
        </h2>
        <div className="space-y-4">
          <div className="flex  items-center">
            <span className="font-semibold text-gray-700 w-32">Vorname:</span>
            <span className="text-gray-600">{currentUser.lastName}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">Nachname:</span>
            <span className="text-gray-600">{currentUser.lastName}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">Email:</span>
            <span className="text-gray-600">{currentUser.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">
              Registriert am:
            </span>
            <span className="text-gray-600">
              {new Date(currentUser.createdAt).toLocaleDateString("de-DE")}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Adresse
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p>Straße/Hausnummer:</p>

                <p className="text-gray-600">
                  {currentUser?.defaultAddress?.street}{" "}
                  {currentUser?.defaultAddress?.houseNumber}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p>PLZ/Ort:</p>
                <p className="text-gray-600">
                  {currentUser?.defaultAddress?.zip}{" "}
                  {currentUser?.defaultAddress?.city}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p>Land:</p>
                <p className="text-gray-600">
                  {currentUser?.defaultAddress?.country}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p>Telefon:</p>
                <p className="text-gray-600">
                  {currentUser?.defaultAddress?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeinKonto;
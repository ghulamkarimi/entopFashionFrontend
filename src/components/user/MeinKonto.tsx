"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/feature/store";
import { fetchCurrentUser, editUserApi } from "@/feature/reducers/userSlice";
import { UserRoundCog } from "lucide-react";

const MeinKonto = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, error, status } = useSelector((state: RootState) => state.users);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: "",
    houseNumber: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.defaultAddress) {
      setAddressForm({
        street: currentUser.defaultAddress.street || "",
        houseNumber: currentUser.defaultAddress.houseNumber || "",
        zip: currentUser.defaultAddress.zip || "",
        city: currentUser.defaultAddress.city || "",
        country: currentUser.defaultAddress.country || "",
        phone: currentUser.defaultAddress.phone || "",
      });
      setIsEditingAddress(false);
    } else {
      setIsEditingAddress(true);
      setAddressForm({
        street: "",
        houseNumber: "",
        zip: "",
        city: "",
        country: "",
        phone: "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !addressForm.street ||
      !addressForm.houseNumber ||
      !addressForm.zip ||
      !addressForm.city ||
      !addressForm.country ||
      !addressForm.phone
    ) {
      setFormError("Bitte füllen Sie alle Felder aus.");
      return;
    }
    setFormError("");
    try {
      if (!currentUser) {
        setFormError("Benutzer nicht gefunden.");
        return;
      }

      await dispatch(
        editUserApi({
          _id: currentUser._id,
          defaultAddress: addressForm,
        })
      ).unwrap();

      // 🟢 Benutzer neu laden, damit Adresse sofort aktualisiert wird
      await dispatch(fetchCurrentUser());

      setIsEditingAddress(false);
      setSuccessMessage(
        currentUser.defaultAddress ? "Adresse erfolgreich aktualisiert!" : "Adresse erfolgreich hinzugefügt!"
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setFormError((err as Error).message || "Fehler beim Aktualisieren der Adresse.");
    }
  };

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
    <div className="min-h-screen py-10 px-4 ">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">
            <UserRoundCog className="h-8 w-8 text-gray-800" />
          </span>
          Mein Konto
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">Vorname:</span>
            <span className="text-gray-600">{currentUser.firstName}</span>
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
            <span className="font-semibold text-gray-700 w-32">Registriert am:</span>
            <span className="text-gray-600">
              {new Date(currentUser.createdAt).toLocaleDateString("de-DE")}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Adresse</h3>
              {currentUser.defaultAddress && !isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 rounded-xl text-white text-sm font-semibold "
                >
                  Adresse bearbeiten
                </button>
              )}
            </div>

            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
                <p className="font-semibold">{successMessage}</p>
              </div>
            )}

            {currentUser.defaultAddress && !isEditingAddress ? (
              <div className="space-y-2">
               
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700">Straße/Hausnummer:</p>
                  <p className="text-gray-600">
                    {currentUser.defaultAddress.street} {currentUser.defaultAddress.houseNumber}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700">PLZ/Ort:</p>
                  <p className="text-gray-600">
                    {currentUser.defaultAddress.zip} {currentUser.defaultAddress.city}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700">Land:</p>
                  <p className="text-gray-600">{currentUser.defaultAddress.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700">Telefon:</p>
                  <p className="text-gray-600">{currentUser.defaultAddress.phone}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {currentUser.defaultAddress ? "Adresse bearbeiten:" : "Keine Adresse vorhanden. Bitte fügen Sie eine hinzu:"}
                </p>
                {formError && (
                  <p className="text-red-500 text-sm">{formError}</p>
                )}
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {[
                    ["Straße", "street"],
                    ["Hausnummer", "houseNumber"],
                    ["PLZ", "zip"],
                    ["Ort", "city"],
                    ["Land", "country"],
                    ["Telefon", "phone"]
                  ].map(([label, name]) => (
                    <div key={name} className="flex items-center gap-2">
                      <label className="w-32 font-semibold text-gray-700">{label}:</label>
                      <input
                        type="text"
                        name={name}
                        value={(addressForm as any)[name]}
                        onChange={handleInputChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={label as string}
                      />
                    </div>
                  ))}
                  <div className="flex justify-end gap-2">
                    {isEditingAddress && currentUser.defaultAddress && (
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full transition duration-300"
                      >
                        Abbrechen
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ${
                        status === "loading" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {status === "loading"
                        ? "Wird gespeichert..."
                        : currentUser.defaultAddress
                        ? "Adresse aktualisieren"
                        : "Adresse hinzufügen"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeinKonto;

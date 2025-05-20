"use client";
import React, { use } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { LockKeyholeOpen, Lock } from "lucide-react";
import { AppDispatch } from "@/feature/store";
import { useDispatch } from "react-redux";
import { userRegisterApi } from "@/feature/reducers/userSlice";
import { NotificationService } from "@/service/NotificationService";
import { useRouter } from "next/navigation";

// Benutzerdefinierte Error-Komponente
const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
        {children}
    </div>
);

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const formSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Mindestens 3 Zeichen")
      .required("Benutzername ist erforderlich"),
    lastName: Yup.string()
      .min(3, "Mindestens 3 Zeichen")
      .required("Nachname ist erforderlich"),
    email: Yup.string()
      .email("Ungültige E-Mail-Adresse")
      .required("E-Mail ist erforderlich"),
    password: Yup.string()
      .min(6, "Mindestens 6 Zeichen")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
        "Passwort muss mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten"
      )
      .required("Passwort ist erforderlich"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), undefined],
        "Passwörter müssen übereinstimmen"
      )
      .required("Passwortbestätigung ist erforderlich"),
  });

  return (
    <div className="flex ">
      <div
        className="hidden md:flex md:w-1/2"
        style={{
          backgroundImage: `url("/mainTwo.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      ></div>
      <div
        className="w-full md:w-1/2"
        style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
      >
        <div className="flex flex-col my-2 items-center">
          <img src="/logo.png" alt="Logo" className="w-28 h-28" />
          <p> Haben Sie kein Konto? </p>
          <h2 style={{ fontSize: "24px", margin: "0 0 20px 0" }}>
            Registrieren
          </h2>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={formSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await dispatch(userRegisterApi(values)).unwrap();
              NotificationService.success(response?.message);
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } catch (error: any) {
              NotificationService.error(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="firstName"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Vorname
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="firstName"
                  render={(msg) => <ErrorText>{msg}</ErrorText>}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Nachname
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="lastName"
                  render={(msg) => <ErrorText>{msg}</ErrorText>}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  E-Mail
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <ErrorText>{msg}</ErrorText>}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="password"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Passwort
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full p-2 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div
                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Lock size={20} />
                    ) : (
                      <LockKeyholeOpen size={20} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  render={(msg) => <ErrorText>{msg}</ErrorText>}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="confirmPassword"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Password Bestätigen
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "confirmPassword"}
                    name="confirmPassword"
                    className="w-full p-2 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div
                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Lock size={20} />
                    ) : (
                      <LockKeyholeOpen size={20} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  render={(msg) => <ErrorText>{msg}</ErrorText>}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Wird gesendet..." : "Registrieren"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col mt-1 text-sm text-gray-600">
          <p className="text-center">
            Haben Sie bereits ein Konto?{" "}
            {/* <a href="/login" className="text-blue-500 hover:underline">
              Anmelden
            </a> */}
          </p>
          <button className="w-full py-2 my-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
            <a href="/login">Anmelden</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

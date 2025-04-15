"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LockKeyholeOpen, Lock } from "lucide-react";
import { AppDispatch } from "@/feature/store";
import { useDispatch } from "react-redux";
import { userLoginApi } from "@/feature/reducers/userSlice"; // Annahme: Du hast eine Login-API-Funktion
import { NotificationService } from "@/service/NotificationService";
import { useRouter } from "next/navigation";

// Benutzerdefinierte Error-Komponente
const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
        {children}
    </div>
);

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const formSchema = Yup.object({
        email: Yup.string()
            .email("Ungültige E-Mail-Adresse")
            .required("E-Mail ist erforderlich"),
        password: Yup.string()
            .min(6, "Mindestens 6 Zeichen")
            .required("Passwort ist erforderlich"),
    });

    return (
        <div className="flex min-h-screen">
            <div
                className="hidden md:flex md:w-1/2"
                style={{
                    backgroundImage: "url('/loginsite.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div
                className="w-full md:w-1/2 flex items-center justify-center"
                style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
            >
                <div className="w-full">
                    <div className="flex flex-col my-2 items-center">
                        <img src="/logo.png" alt="Logo" className="w-28 h-28" />
                        <p>Loggen Sie sich ein</p>
                        <h2 style={{ fontSize: "24px", margin: "0 0 20px 0" }}>
                            Login
                        </h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={formSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const response = await dispatch(userLoginApi(values)).unwrap();
                                NotificationService.success(response?.message);
                                setTimeout(()=> {
                                    router.push("/");
                                },3000)
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition ${
                                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                >
                                    {isSubmitting ? "Wird gesendet..." : "Login"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

import axios from "axios";

export default function Login({ status, canResetPassword }) {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const route = (data) => {
        return `http://olldesign.jp/${data}`
    }

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route("login"));
    // };

    const submit = async (e) => {
        e.preventDefault();

        
        try {
            await axios.post(
                route("login"),
                data, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
            );
            window.location = route("admin");
        } catch (e) {
            console.error("Terjadi kesalahan:", e);
        }

        // fetch(route("login"), {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-CSRF-TOKEN": csrfToken, // Menggunakan token CSRF di sini
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             // Handle response jika permintaan berhasil
        //             console.log("Login berhasil!");
        //             // Redirect ke halaman dashboard setelah login berhasil
        //             // post(route("admin"));
        //             window.location = route("admin");
        //         } else {
        //             // Jika respons tidak berhasil (status code bukan 2xx)
        //             // Anda bisa menangani kasus-kasus khusus seperti 404 atau 500
        //             console.error("Login gagal!");
        //         }
        //     })
        //     .catch((error) => {
        //         // Handle error jika permintaan gagal
        //         console.error("Terjadi kesalahan:", error);
        //         // Misalnya, Anda bisa menampilkan pesan kesalahan kepada pengguna
        //     });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={handleOnChange}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

import { Form, Formik } from "formik";
import { Input } from "../formik";
import { Button } from "../atoms/UI/Buttons/Button";

import { instance } from "@/api/axios.instance";
import { localStorageWrapper } from "../data/storage";
import { useRouter } from "next/router";

const LoginForms = () => {
  const router = useRouter();
  const url = "https://www.bilimge.kz/admins/";
  return (
    <div className="login_forms-form">
      <div className="login_forms-title">KESTESI.KZ</div>
      <div className="login_forms-subtitle">Добро пожаловать!!!</div>
      <div className="login_forms-sub">Вход</div>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          if (values.username && values.password) {
            await instance
              .post("https://www.bilimge.kz/admins/login/", {
                username: values.username,
                password: values.password,
              })
              .then(async (res) => {
                if (res) {
                  localStorageWrapper.set(
                    "token",
                    (res as { auth_token?: string })?.auth_token,
                  );

                  await instance
                    .get("https://www.bilimge.kz/admins/users/me/", {
                      headers: {
                        Authorization: `Token ${
                          (res as { auth_token?: string })?.auth_token
                        }`,
                      },
                    })
                    .then((res) => {
                      if (res) {
                        if ((res as { is_superuser?: boolean }).is_superuser) {
                          router.push("/superadmin");
                        } else {
                          router.push("/main");
                        }
                      }
                    });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        {() => {
          return (
            <Form>
              <div className="login_forms-label_black">Email</div>
              <Input
                type="text"
                name="username"
                placeholder="Почта"
                label="Email"
              />
              <div className="login_forms-label_black">Пароль</div>
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                label="Пароль"
              />

              <Button background="#317AE0" type="submit">
                Войти
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForms;

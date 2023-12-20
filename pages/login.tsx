import { CheckIcons } from "@/components/atoms/Icons";
import LoginForms from "@/components/forms/LoginForms";

const LoginPage = () => {
  return (
    <div className="section">
      <div className="login">
        <div className="login_forms">
          <LoginForms />
        </div>
        <div className="login_content">
          <div className="login_content-title">
            <span>ЭЛЕКТРОННОЕ РАСПИСАНИЕ</span> <br />ДЛЯ УЧЕБНЫХ ЗАВЕДЕНИЙ
          </div>

          <div className="login_content-check">
            <div>
              <CheckIcons />
              <span>БЫстро</span>
            </div>

            <div>
              <CheckIcons />
              <span>Удобно</span>
            </div>

            <div>
              <CheckIcons />
              <span>Современно</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

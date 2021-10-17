import axios from "axios";
import API_URL from "../../enviroments/index";

export const addContactEnquiery = () => {
  const formData = new FormData();
  formData.append("contactForm[name]", 'Dheeraj');
  formData.append("contactForm[email]", "dheeraj@mail.com");
  formData.append("contactForm[telephone]", 8800846237);
  formData.append("contactForm[comment]", "Check Contact");
  const config = {
    method: "post",
    url: `${API_URL}/contactus`,
    silent: true,
    data: formData,
  };
  return axios(config);
};
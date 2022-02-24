import { useEffect, useState } from "react";
import axios from "axios";
import { getStoreId } from "../../util";
import API_URL from "../../enviroments";

const useCMSContent = ({ identifier }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    const config = {
      method: "get",
      url: `${API_URL}/webapi/getcmspage?storeId=${getStoreId()}&cmsIdentifier=${identifier}`,
      silent: true,
    };
    axios(config).then((response) => setContent(response.data.content || ""));
  }, [identifier]);
  return {
    content,
  };
};

export default useCMSContent;

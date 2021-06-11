import {
  loader,
  errorHandler,
  fetchHeaderSuccess,
  fetchFooterSuccess,
} from ".";
import { getHeader, getFooter } from "../../../services/layout/Layout.service";

export const fetchHeader = () => async (dispatch) => {
  dispatch(loader(true));
  try {
    const header = await getHeader();
    const footer = await getFooter();
    dispatch(fetchHeaderSuccess(header.data));
    dispatch(fetchFooterSuccess(footer.data));
  } catch (error) {
    dispatch(errorHandler(error));
  } finally {
    dispatch(loader(false));
  }
};

import { baseUrl, pageSuffix } from "./constants";

const buildPageUrl = (page) =>
  page === 0 ? `${baseUrl}${pageSuffix}` : `${baseUrl}${pageSuffix}/${page}`;
export const fetchImages = async (page) =>
  (await fetch(buildPageUrl(page))).json();

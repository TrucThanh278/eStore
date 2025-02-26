import { pagination } from "../common/constants/pagination.constants";

type metaType = {
  current_page: number;
  page_size: number;
  totalItems: number;
  count: number;
};

const init = (page: unknown) => {
  const current_page = page && page!= '0'? Number(page) : 1
  const page_size = pagination.page_size;
  return  {
    page_size: page_size,
    current_page: current_page,
    offset: (current_page - 1) * page_size
  }
}
export const meta = (metadata: metaType) => {
  const { current_page, page_size, totalItems, count } = metadata;
  const totalPages = totalItems / page_size;
  return {
    current_page: current_page,
    count: count,
    prev: current_page != 1 ? current_page - 1 : null,
    next: current_page < totalPages ? current_page + 1 : null,
  };
};
export default init
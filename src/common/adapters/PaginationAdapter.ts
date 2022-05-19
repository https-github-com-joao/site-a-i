import * as express from 'express';
import { IResponseWithPagination } from "../interfaces/IPaginate";
import { IPaginateVueTable } from "../interfaces/IPaginateVueTable";

export class PaginationAdapter {  
  static toVueTablePaginantion(
    data: IResponseWithPagination,
    req: express.Request
  ): IPaginateVueTable {
    let fullUrl = req.protocol + '://' + req.hostname + req.originalUrl;
    let lastPage = data.pagination.lastPage || 0;
    let prev_page_url = null;
    let next_page_url = null;

    if (data.pagination.currentPage > 1) {
      let p1 = fullUrl.substring(0, fullUrl.indexOf('page=') + 5);
      let p2 = fullUrl.substring(fullUrl.indexOf('page=') + 5);
      p2 = p2.indexOf('&') != -1 ? p2.substring(p2.indexOf('&')) : '';
      prev_page_url = p1 + (data.pagination.currentPage - 1) + p2;
    }

    if (data.pagination.currentPage < lastPage) {
      let p1 = fullUrl.substring(0, fullUrl.indexOf('page=') + 5);
      let p2 = fullUrl.substring(fullUrl.indexOf('page=') + 5);
      p2 = p2.indexOf('&') != -1 ? p2.substring(p2.indexOf('&')) : '';
      next_page_url = p1 + (data.pagination.currentPage + 1) + p2;
    }

    return {
      total: data.pagination.total,
      per_page: data.pagination.perPage,
      current_page: parseInt(`${data.pagination.currentPage}`),
      last_page: lastPage,
      from: data.pagination.from + 1,
      to: data.pagination.to,
      prev_page_url: prev_page_url,
      next_page_url: next_page_url,
      data: data.data
    };
  }
}

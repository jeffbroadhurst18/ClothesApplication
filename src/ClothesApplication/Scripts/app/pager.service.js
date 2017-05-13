System.register(["underscore"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _, PagerService;
    return {
        setters: [
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            PagerService = class PagerService {
                getPager(totalItems, currentPage = 1, pageSize = 5) {
                    // calculate total pages
                    let totalPages = Math.ceil(totalItems / pageSize);
                    let startPage, endPage;
                    if (totalPages <= 10) {
                        // less than 10 total pages so show all
                        startPage = 1;
                        endPage = totalPages;
                    }
                    else {
                        // more than 10 total pages so calculate start and end pages
                        if (currentPage <= 6) {
                            startPage = 1;
                            endPage = 10;
                        }
                        else if (currentPage + 4 >= totalPages) {
                            startPage = totalPages - 9;
                            endPage = totalPages;
                        }
                        else {
                            startPage = currentPage - 5;
                            endPage = currentPage + 4;
                        }
                    }
                    // calculate start and end item indexes
                    let startIndex = (currentPage - 1) * pageSize;
                    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
                    // create an array of pages to ng-repeat in the pager control
                    let pages = _.range(startPage, endPage + 1);
                    // return object with all pager properties required by the view
                    return {
                        totalItems: totalItems,
                        currentPage: currentPage,
                        pageSize: pageSize,
                        totalPages: totalPages,
                        startPage: startPage,
                        endPage: endPage,
                        startIndex: startIndex,
                        endIndex: endIndex,
                        pages: pages
                    };
                }
            };
            exports_1("PagerService", PagerService);
        }
    };
});

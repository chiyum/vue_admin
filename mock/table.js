/**
 * 分頁函數
 * @param {Array} data - 需要分頁的數據陣列
 * @param {number} page - 當前分頁
 * @param {number} rowsPerPage - 每頁顯示的筆數
 * @returns {Object} - 包含分頁後的數據、總筆數及總頁數
 */
function paginate(data, page, rowsPerPage) {
  // 計算總筆數
  const totalRows = data.length;
  // 計算總頁數
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  // 計算起始索引
  const start = (page - 1) * rowsPerPage;
  // 計算結束索引
  const end = start + rowsPerPage;
  // 返回分頁後的數據
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    totalRows,
    totalPages,
    currentPage: page, // 返回當前分頁
  };
}

const db = [
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 193,
    memo: "",
    username: "garyTest0001",
    nickname: "KGFApChmIx",
    balance: 0,
    subAgentLevel: 0,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1721123861,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 190,
    memo: "",
    username: "lextest2",
    nickname: "pSbTwXvQle",
    balance: 1945.2,
    subAgentLevel: 0,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720702033,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 188,
    memo: "",
    username: "bob777777",
    nickname: "98798789978",
    balance: 0,
    subAgentLevel: 2,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720431841,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 186,
    memo: "",
    username: "daledale9200",
    nickname: "lkwDAgSBCQ",
    balance: 4180.6,
    subAgentLevel: 2,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720430099,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 179,
    memo: "",
    username: "qw12121",
    nickname: "eFtUrqRRGs",
    balance: 0,
    subAgentLevel: 2,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720428305,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 164,
    memo: "",
    username: "daledale888",
    nickname: "QHjLXfZACC",
    balance: 0,
    subAgentLevel: 1,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720409754,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 163,
    memo: "",
    username: "daledale777",
    nickname: "賭神",
    balance: 9950.2,
    subAgentLevel: 2,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720409365,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 154,
    memo: "",
    username: "daledale444",
    nickname: "UAcLGWDPlf",
    balance: 0,
    subAgentLevel: 2,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720280343,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 152,
    memo: "",
    username: "daledale333",
    nickname: "DHIBsfcgOT",
    balance: 0,
    subAgentLevel: 1,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720080318,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 145,
    memo: "",
    username: "jeremy02",
    nickname: "KgmHgBzVii",
    balance: 101565,
    subAgentLevel: 0,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720058842,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 146,
    memo: "",
    username: "jeremy02",
    nickname: "KgmHgBzVii",
    balance: 101565,
    subAgentLevel: 0,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720058842,
  },
  {
    profileImg:
      "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
    userId: 147,
    memo: "",
    username: "jeremy02",
    nickname: "KgmHgBzVii",
    balance: 101565,
    subAgentLevel: 0,
    isDisabledRoom: false,
    is_muted: false,
    isRebate: false,
    createdAt: 1720058842,
  },
];
export default [
  {
    url: "/mock-api/admin/searchUsers",
    method: "get",
    response: (req) => {
      // req.query 包含了 URL 參數
      const { pageNo, pageSize } = req.query;
      const { data, totalPages, currentPage } = paginate(db, pageNo, pageSize);
      return {
        data: {
          code: 0,
          data: {
            pageNo: +currentPage,
            pageSize: 10,
            totalPage: totalPages,
            totalCount: db.length,
            items: data,
          },
          msg: "ok",
        },
      };
    },
  },
  {
    url: "/mock-api/admin/forceTransfer",
    method: "post",
    response: (req) => {
      // req.query 包含了 URL 參數
      const { userId, transferType, amount } = req.body;
      const num = +amount;
      const isDeposit = transferType === 9;
      db.forEach((item) => {
        if (item.userId === userId) {
          item.balance = isDeposit ? item.balance + num : item.balance - num;
        }
      });
      return {
        data: {
          code: 0,
          data: {
            msg: "ok",
          },
        },
      };
    },
  },
  {
    url: "/mock-api/user",
    method: "post",
    response: (req) => {
      // req.body 包含了 POST 請求的內容
      const { userId } = req.body;

      if (userId === "1") {
        return {
          code: 0,
          data: { id: 1, name: "Admin", role: "admin" },
        };
      } else {
        return {
          code: 0,
          data: { id: 2, name: "User", role: "user" },
        };
      }
    },
  },
];

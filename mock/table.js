export default [
  {
    url: "/mock-api/users",
    method: "get",
    response: (req) => {
      // req.query 包含了 URL 參數
      const { role } = req.query;

      if (role === "admin") {
        return {
          code: 0,
          data: [
            { id: 1, name: "Admin User", role: "admin" },
            { id: 2, name: "Another Admin", role: "admin" },
          ],
        };
      } else {
        return {
          code: 0,
          data: [
            { id: 3, name: "Normal User", role: "user" },
            { id: 4, name: "Another User", role: "user" },
          ],
        };
      }
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

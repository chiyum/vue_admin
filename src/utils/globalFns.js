import { isEmpty } from "ramda";

export const capitalizeFirstLetter = (str) => {
  if (!str) return str; // 如果字符串为空，则直接返回
  return str[0].toUpperCase() + str.slice(1); // 将第一个字符转换为大写并连接上其余部分
};

export const filterReservedKeys = (obj, reserverdKeys = []) => {
  const notFilterKey = isEmpty(reserverdKeys)
    ? [
        "startTime",
        "endTime",
        "pageNo",
        "pageSize",
        "rowsNumber",
        "sortBy",
        "descending",
      ]
    : []; // 保留的key
  const otherParams = {
    ...obj,
  };
  Object.keys(obj).forEach((key) => {
    if (!notFilterKey.includes(key)) {
      delete otherParams[key];
    }
  });
  return otherParams;
};

export const formattedAmount = (number) => {
  return number.toLocaleString();
};

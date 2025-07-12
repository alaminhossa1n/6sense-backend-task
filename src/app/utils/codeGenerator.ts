import crypto from "crypto";

const generateHash = (text: string): string => {
  return crypto
    .createHash("md5")
    .update(text + Date.now())
    .digest("hex")
    .slice(0, 8);
};

export const codeGenerator = (productName: string) => {
  const str = productName.toLowerCase().replace(/[^a-z]/g, "");

  let longestList: string[] = [];
  let current = "";

  for (let i = 0; i < str.length; i++) {
    if (current === "" || str[i] > current[current.length - 1]) {
      current += str[i];
    } else {
      if (current.length > longestList[0]?.length || longestList.length === 0) {
        longestList = [current];
      } else if (current.length === longestList[0].length) {
        longestList.push(current);
      }
      current = str[i];
    }
  }

  // Handle the last substring
  if (current.length > longestList[0]?.length || longestList.length === 0) {
    longestList = [current];
  } else if (current.length === longestList[0].length) {
    longestList.push(current);
  }

  const finalStr = longestList.join("");

  const firstIndex = str.indexOf(longestList[0]);
  const endIndex =
    str.lastIndexOf(longestList[longestList.length - 1]) +
    longestList[longestList.length - 1].length -
    1;

  const hashedStr = generateHash(productName);

  return `${hashedStr}-${firstIndex}${finalStr}${endIndex}`;
};

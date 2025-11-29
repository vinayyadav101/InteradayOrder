const { default: axios } = require("axios");

async function getBSEAnnouncements() {
  const url =
    "https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?pageno=1&strCat=Company+Update&strPrevDate=20251116&strScrip=&strSearch=P&strToDate=20251116&strType=C&subcategory=Award+of+Order+%2F+Receipt+of+Order";
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://www.bseindia.com/",
        Origin: "https://www.bseindia.com",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    console.log("JSON:", response.data);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = getBSEAnnouncements
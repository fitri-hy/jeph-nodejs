const View = require("../../core/View");
const axios = require("axios");

class SpelledController {
  constructor() {
    this.history = [];
  }

  async index(req, res) {
    try {
      const view = new View();
      res.send(view.render("spelled", { 
        title: "Spelled",
        amount: "",
        spelled: "",
        isId: true,
        isEn: false,
        history: this.history
      }));
    } catch (error) {
      console.error("Error rendering view:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async convert(req, res) {
    try {
      let { amount, lang } = req.body;
      if (!amount || isNaN(amount)) {
        return res.status(400).send("Invalid amount");
      }

      lang = ["id", "en"].includes(lang) ? lang : "id";

      const apiUrl = `https://api.i-as.dev/api/spelled/rupiah?amount=${amount}&lang=${lang}`;
      const response = await axios.get(apiUrl);

      const formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(response.data.amount);

      this.history.push({
        amount: formattedAmount,
        spelled: response.data.spelled,
        lang: lang,
        timestamp: new Date().toLocaleString()
      });

      this.history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const view = new View();
      res.send(view.render("spelled", { 
        title: "Spelled",
        amount: formattedAmount,
        spelled: response.data.spelled,
        isId: lang === "id",
        isEn: lang === "en",
        history: this.history
      }));
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = SpelledController;

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  env: {
    JWT_SECRET: "laksdjksafhuisdoif89 8wer 98t439843t89yuweiuhiuhj",
  },
});

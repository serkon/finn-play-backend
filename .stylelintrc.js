module.exports = {
  extends: "stylelint-config-recommended-scss",
  rules: {
    "scss/at-if-no-null": null,
    "at-rule-no-unknown": null,
    "rule-empty-line-before": ["always-multi-line", { except: [], ignore: ["after-comment", "first-nested"] }],
  },
};

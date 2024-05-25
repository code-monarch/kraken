/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  // output: "export",
  // distDir: "dist",
//   images: { loader: "custom" },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: getEnvConfig(),
};

function getEnvConfig() {
  const environment = process.env.TARGET_ENV || process.env.NODE_ENV;
  try {
    return require(`./env-${environment}.json`);
  } catch (err) {
    return require("./env-development.json");
  }
}

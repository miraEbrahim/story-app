const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devServer: {
        port: 3002,
    },
    babel: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
    },
    webpack: {
        plugins: [
            new ModuleFederationPlugin({
                name: "story",
                exposes: {
                    "./Story": "./src/shared/Story",
                },
                filename: "remoteEntry.js",
                shared: {
                    react: { singleton: true },
                    "react-dom": { singleton: true },
                },
            }),
        ],
        configure: (webpackConfig) => ({
            ...webpackConfig,
            output: {
                ...webpackConfig.output,
                publicPath: "auto",
            },
        }),
    },
};
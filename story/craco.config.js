const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devServer: {
        port: 3002,
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
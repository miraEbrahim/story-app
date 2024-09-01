const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devServer: {
        port: 3001,
    },
    webpack: {
        plugins: [
            new ModuleFederationPlugin({
                name: "host",
                remotes: {
                    story: "story@http://localhost:3002/remoteEntry.js",
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
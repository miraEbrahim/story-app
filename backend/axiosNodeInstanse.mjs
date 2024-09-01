import axios from "axios";
import { writeError, warningLog } from "./logger.mjs";

export const axiosNodeInstance = axios.create();

const MAX_RESPONSE_TIME = 250;

const logWarning = (duration, res) => {
    warningLog({
        type: "lateResponse",
        duration,
        date: new Date().toISOString(),
        status: res?.status,
        method: res?.config?.method,
        url: res?.config?.url,
    });
};

const calculateDuration = (startTime) => new Date().getTime() - startTime;

const handleResponse = (res) => {
    const duration = calculateDuration(res.config.meta.requestStartedAt);

    if (duration > MAX_RESPONSE_TIME) {
        logWarning(duration, res);
    }

    return res;
};

const handleError = (error) => {
    const duration = calculateDuration(
        error.config?.meta?.requestStartedAt ?? 0
    );

    if (duration > MAX_RESPONSE_TIME) {
        logWarning(duration, error);
    }

    if (!error.response) {
        writeError({
            date: new Date().toISOString(),
            type: "interceptor response",
            data: error.message ?? "",
        });
    }

    return Promise.reject({
        response: {
            status: error.response?.status ?? 500,
            data: error.response?.data ?? {},
        },
    });
};

axiosNodeInstance.interceptors.request.use((config) => {
    config.meta = config.meta || {};
    config.meta.requestStartedAt = new Date().getTime();
    return config;
});

axiosNodeInstance.interceptors.response.use(handleResponse, handleError);

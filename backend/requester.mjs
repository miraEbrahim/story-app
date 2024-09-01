import { axiosNodeInstance } from "./axiosNodeInstanse.mjs";
import { infoLog, writeError } from "./logger.mjs";

const requester = async (req, res,  method, data, cb) => {
    try {
        const response = await axiosNodeInstance({
            method,
            data,
        });

        handleLoginResponse(req, response.data, cb,  res);
    } catch (error) {
        handleRequestError(req, res,  error);
    }
};

const handleLoginResponse = (req, data, cb,  res) => {
    const log = JSON.parse(req, "response");
    log.status = 200;

    infoLog(JSON.stringify(log));
    cb(data);
};

const handleRequestError = (req, res,  error) => {
    // Implement error handling logic here
    writeError({
        date: new Date().toISOString(),
        type: "request error",
        
        message: error.message,
    });
    res.status(error.response?.status ?? 500).json({
        message: error.message,
        ...(error.response?.data ?? {}),
    });
};

export default requester;

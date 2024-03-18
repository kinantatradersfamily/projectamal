import * as yup from "yup"

export const envSchema = yup.object({
    NODE_ENV: yup.mixed().oneOf(['production', 'testing', 'development']).required(),
    NODE_PORT: yup.number().required(),
    NODE_HOST: yup.string().required(),
    DB_PORT: yup.number().required(),
    DB_HOST: yup.string().required(),
    DB_USER: yup.string().required(),
    DB_PASSWORD: yup.string().required(),
    DB_NAME: yup.string().required(),
    JWT_SECRET_KEY: yup.string().required(),
    DEFAULT_USER_IMG_URL: yup.string().required(),
    MAX_EDIT_EVENT_TIME: yup.number().required()
})
import * as yup from "yup"

const reportPayload = {
    topic: yup.string().required(),
    description: yup.string().required(),
    total_amal: yup.number().required().positive().integer(),
    total_attendance: yup.number().required().positive().integer(),
    date: yup.string().required().matches(/^\d{4}-\d{2}-\d{2}$/),
    // event: yup.string().required(),
    pemateri: yup.string().required()
}

export const createReportRequest = yup.object({
    ...reportPayload
});

export const getReportDetailsRequest = yup.object({
    id: yup.number().required()
})

export const editReportRequest = yup.object({
    id: yup.number().required(),
    ...reportPayload
})
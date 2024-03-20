import { File } from 'fastify-multer/lib/interfaces';
import * as yup from 'yup';

const eventPayload = {
    title: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    start_date: yup.number().required(),
    end_date: yup.number().required(),
    image: yup.mixed<File>().required()
}

export const createEventRequest = yup.object({
    ...eventPayload
});

export const getEventDetailsRequest = yup.object({
    event_id: yup.number().required()
})

// export const editEventRequest = yup.object({
//     id: yup.number().required(),
//     // title: yup.string().required(),
//     // description: yup.string().required(),
//     // address: yup.string().required(),
//     // start_date: yup.number().required(),
//     // end_date: yup.number().required(),
//     // image: yup.mixed<File>(),
//     status: yup.number().required(),
//     ...eventPayload
// })

export const editEventRequest = yup.object({
    id: yup.number().required(),
    status: yup.number().required(),
    wilayah_id: yup.number().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    start_date: yup.number().required(),
    end_date: yup.number().required(),
    image: yup.mixed<File>(),
})

export const adminCreateEventRequest = yup.object({
    ...eventPayload,
    wilayah_id: yup.number().required()
})

export const approveEventRequest = yup.object({
    id: yup.number().required(),
    is_approved: yup.number().required(),
    reason: yup.string().when('is_approved', ([is_approved]: boolean[]) => !is_approved ? yup.string().required() : yup.string()) // Checking if admin not approving the event, should give reason
})
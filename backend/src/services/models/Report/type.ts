import yup from "yup"
import { createReportRequest, editReportRequest, getReportDetailsRequest } from "./schema"

export type CreatePayload = {
    topic: string,
    description: string
    total_amal: number
    total_attendance: number
    date: string
    event?: number,
    pemateri: string,
    event_id: number
}

export type EditPayload = Omit<CreatePayload, 'event_id'> & {
    id: number
}

export type Report = {
    created_at: Date
} & CreatePayload

export type ReportList = Report[]

export type GetReportListServiceApp = { wilayah_id: string }

export type CreateReportRequest = yup.InferType<typeof createReportRequest>
export type CreateReportServiceApp = CreateReportRequest

export type GetReportDetailsRequest = yup.InferType<typeof getReportDetailsRequest>
export type GetReportDetailsServiceApp = GetReportDetailsRequest

export type EditReportRequest = yup.InferType<typeof editReportRequest>
export type EditReportServiceApp = EditReportRequest
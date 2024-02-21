import { FastifyRequest } from "fastify";
import * as ReportService from "../application/services/Report";
import * as ReportDto from "../services/models/Report";

export async function getReportListHandler() {
    try {
        const message = await ReportService.GetReportListServiceApp()
        return { message }
    } catch (error) {
        throw error
    }
}

export async function createReportHandler(request: FastifyRequest) {
    try {
        const user = request.user
        const body = request.body as ReportDto.CreateReportRequest
        const message = await ReportService.CreateReportServiceApp({ ...body, manager_id: user.id })

        return { message }
    } catch (error) {
        throw error
    }
}

export async function getReportDetailsHandler(request: FastifyRequest) {
    try {
        const params = request.params as ReportDto.GetReportDetailsRequest
        const message = await ReportService.GetReportDetailsServiceApp(params)

        return { message }
    } catch (error) {
        throw error
    }
}

export async function editReportHandler(request: FastifyRequest) {
    try {
        const body = request.body as ReportDto.EditReportRequest
        const message = await ReportService.EditReportServiceApp(body)

        return { message }
    } catch (error) {
        throw error
    }
}
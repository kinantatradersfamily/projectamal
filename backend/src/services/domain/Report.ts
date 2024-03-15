import { NotFoundError, ServerError } from "../../utils/error";
import * as ReportDto from "../models/Report";
import * as ReportRepository from "../repository/Report";

export async function GetReportListDomain(wilayah_id: string) {
    return await ReportRepository.DBGetReportList(wilayah_id)
}

export async function CreateReportDomain(payload: ReportDto.CreatePayload) {
    const result = await ReportRepository.DBCreateReport(payload)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_CREATE_REPORT')
    }

    return result
}

export async function GetReportDetailsDomain(id: number) {
    const result = await ReportRepository.DBGetReportById(id)

    if(result.length < 1) {
        throw new NotFoundError('REPORT_NOT_FOUND')
    }

    return result[0]
}

export async function EditReportDomain(payload: ReportDto.EditPayload) {
    const result = await ReportRepository.DBEditReport(payload)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_EDIT_REPORT')
    }

    return result
}
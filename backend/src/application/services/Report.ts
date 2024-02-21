import * as ReportDomainService from "../../services/domain/Report";
import * as ReportDto from "../../services/models/Report";

export async function GetReportListServiceApp() {
    const report = await ReportDomainService.GetReportListDomain()
    return report
}

export async function CreateReportServiceApp(payload: ReportDto.CreateReportServiceApp) {
    await ReportDto.createReportRequest.validate(payload)

    await ReportDomainService.CreateReportDomain(payload)

    return true
}

export async function GetReportDetailsServiceApp(payload: ReportDto.GetReportDetailsServiceApp) {
    await ReportDto.getReportDetailsRequest.validate(payload)

    const report = await ReportDomainService.GetReportDetailsDomain(payload.id)

    return report
}

export async function EditReportServiceApp(payload: ReportDto.EditReportServiceApp) {
    await ReportDto.editReportRequest.validate(payload)

    const { id, date, description, pemateri, topic, total_amal, total_attendance } = payload

    await ReportDomainService.GetReportDetailsDomain(id)

    await ReportDomainService.EditReportDomain({ date, description, pemateri, topic, total_amal, total_attendance, id })

    return true
}
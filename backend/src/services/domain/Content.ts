import { ServerError } from "../../utils/error";
import * as ContentDto from "../models/Content";
import * as ContentRepository from "../repository/Content";

export async function getContentDomain() {
    return await ContentRepository.DBGetContent()
}

export async function addContentDomain(payload: ContentDto.CreatePayload) {
    const result = await ContentRepository.DBAddContent(payload)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_ADD_CONTENT')
    }
    
    return result
}
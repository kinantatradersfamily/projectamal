import * as ContentRepository from "../repository/Content";

export async function getContentDomain() {
    return await ContentRepository.DBGetContent()
}
import { getContentDomain } from "../../services/domain/Content";

export async function GetContentServiceApp() {
    const content = await getContentDomain()
    return content
}
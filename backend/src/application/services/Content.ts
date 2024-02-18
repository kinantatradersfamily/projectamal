import { addContentDomain, getContentDomain } from "../../services/domain/Content";
import { AddContentServiceApp, addContentRequest } from "../../services/models/Content";

export async function GetContentServiceApp() {
    const content = await getContentDomain()
    return content
}

export async function AddContentServiceApp({ content }: AddContentServiceApp) {
    await addContentRequest.validate({ content })

    for (const c of content) {
        const payload = {
            content: c.originalname, url: c.path as string
        }

        await addContentDomain(payload)
    }

    return true
}
import * as ContentDomainService from "../../services/domain/Content";
import * as ContentDto from "../../services/models/Content";

export async function GetTemplateListServiceApp() {
    const template = await ContentDomainService.getTemplateListDomain()
    return template
}

export async function GetTemplateServiceApp({ template_id }: ContentDto.GetTemplateServiceApp) {
    await ContentDto.getTemplateRequest.validate({ template_id })

    const content = await ContentDomainService.getTemplateDomain(template_id)
    const carrousel = await ContentDomainService.getCarrouselDomain(content.id)

    return { ...content, images: carrousel }
}

export async function AddCarrouselServiceApp(payload: ContentDto.AddCarrouselServiceApp) {
    await ContentDto.addCarrouselRequest.validate(payload)

    const { content, template_id } = payload

    await ContentDomainService.getTemplateDomain(template_id)

    for (const c of content) {
        const payload = {
            content: c.originalname,
            url: c.path as string,
            template_id 
        }

        await ContentDomainService.addCarrouselDomain(payload)
    }

    return true
}
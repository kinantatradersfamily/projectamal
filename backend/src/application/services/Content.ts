import db from "../../../ormconfig";
import * as ContentDomainService from "../../services/domain/Content";
import * as ContentDto from "../../services/models/Content";
import { RequestError } from "../../utils/error";

export async function GetTemplateListServiceApp() {
    const template = await ContentDomainService.getTemplateListDomain()
    return template
}

export async function GetTemplateServiceApp({ template_id }: ContentDto.GetTemplateServiceApp) {
    await ContentDto.getTemplateRequest.validate({ template_id })

    const content = await ContentDomainService.getTemplateDomain(template_id)
    const carrousel = await ContentDomainService.getCarrouselByTemplateDomain(content.id)


    return { ...content, images: carrousel }
}

export async function AddCarrouselServiceApp(payload: ContentDto.AddCarrouselServiceApp) {
    await ContentDto.addCarrouselRequest.validate(payload)

    const { content, description, title } = payload

    const carrousel = {
        content: content.originalname,
        url: content.path as string,
        template_id: 1,
        description,
        title
    }

    await ContentDomainService.addCarrouselDomain(carrousel)

    return true
}

export async function EditTemplateServiceApp(payload: ContentDto.EditTemplateServiceApp) {
    await ContentDto.editTemplateRequest.validate(payload)

    const { images, template_id, description, name, active } = payload

    await ContentDomainService.getTemplateDomain(template_id)

    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    try {
        await queryRunner.startTransaction()

        for (const image of images) {
            const [field, id] = image.fieldname.split('-')

            const carrousel = await ContentDomainService.getCarrouselDomain(parseInt(id))

            if (carrousel.template_id != template_id) {
                throw new RequestError('CARROUSEL_NOT_BELONGS_TO_THIS_TEMPLATE')
            }

            await ContentDomainService.editCarrouselDomain({ id: carrousel.id, name: image.originalname, url: image.path as string }, queryRunner)
        }

        await ContentDomainService.editTemplateDomain({ id: 1, name, description, active }, queryRunner)

        await queryRunner.commitTransaction()
        await queryRunner.release()

        return true
    } catch (error) {
        await queryRunner.rollbackTransaction()
        await queryRunner.release()
        throw error
    }
}
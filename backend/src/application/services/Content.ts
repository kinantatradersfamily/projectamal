import db from "../../../ormconfig";
import * as ContentDomainService from "../../services/domain/Content";
import * as EventDomainService from "../../services/domain/Event";
import * as ContentDto from "../../services/models/Content";

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

export async function GetCarrouselListServiceApp() {
    const carrousel = await ContentDomainService.getCarrouselListDomain()
    return carrousel
}

export async function EditCarrouselServiceApp(payload: ContentDto.EditCarrouselServiceApp) {
    await ContentDto.editCarrouselRequest.validate(payload)

    const { id, description, title, image, active } = payload

    // Check carrousel is exist
    const carrousel = await ContentDomainService.getCarrouselDomain(id)

    if(image) {
        await ContentDomainService.editCarrouselDomain({ id, content: image.originalname, url: image.path as string, description, title, active })
    } else {
        await ContentDomainService.editCarrouselDomain({ id, description, title, content: carrousel.content, url: carrousel.url, active })
    }

    return true
}

// Todo
export async function EditTemplateServiceApp(payload: ContentDto.EditTemplateServiceApp) {
    await ContentDto.editTemplateRequest.validate(payload)

    const { image, template_id, description, name, active } = payload

    await ContentDomainService.getTemplateDomain(template_id)

    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    try {
        await queryRunner.startTransaction()

        if(image != undefined) {
            // await ContentDomainService.editCarrouselDomain({ id:  })
        }

        // for (const image of images) {
        //     const [field, id] = image.fieldname.split('-')

        //     const carrousel = await ContentDomainService.getCarrouselDomain(parseInt(id))

        //     if (carrousel.template_id != template_id) {
        //         throw new RequestError('CARROUSEL_NOT_BELONGS_TO_THIS_TEMPLATE')
        //     }

        //     await ContentDomainService.editCarrouselDomain({ id: carrousel.id, name: image.originalname, url: image.path as string }, queryRunner)
        // }

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

export async function GetCarrouselDetailsServiceApp(payload: ContentDto.GetCarrouselDetailsServiceApp) {
    await ContentDto.getCarrouselDetailsRequest.validate(payload)

    const carrousel = await ContentDomainService.getCarrouselDomain(payload.id)

    return carrousel
}

export async function CreateEventServiceApp(payload: ContentDto.CreateEventServiceApp) {
    await ContentDto.createEventRequest.validate(payload)

    const { title, description, event_id } = payload

    await ContentDomainService.createEventDomain({ title, description, event_id })

    return true
}

export async function EditEventServiceApp(payload: ContentDto.EditEventServiceApp) {
    await ContentDto.editEventRequest.validate(payload)
    
    const { description, id, title } = payload

    await ContentDomainService.editEventDomain({ description, title, id })

    return true
}

export async function GetActiveContentServiceApp() {
    const carrousel = await ContentDomainService.GetActiveCarrouselDomain()
    const event = await EventDomainService.GetEventActiveDomain()
    const eventDetails = await ContentDomainService.GetEventDetailsDomain(event.id)

    return { carrousel, event: { ...event, items: eventDetails } }
}
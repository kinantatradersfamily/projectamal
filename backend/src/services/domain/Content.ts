import { QueryRunner } from "typeorm";
import { NotFoundError, ServerError } from "../../utils/error";
import * as ContentDto from "../models/Content";
import * as ContentRepository from "../repository/Content";

export async function getTemplateListDomain() {
    return await ContentRepository.DBGetContentList()
}

export async function getTemplateDomain(template_id: number) {
    const result = await ContentRepository.DBGetTemplateById(template_id)

    if(result.length < 1) {
        throw new NotFoundError(`TEMPLATE_NOT_FOUND`)
    }

    return result[0]
}

export async function addCarrouselDomain(payload: ContentDto.CreatePayload) {
    const result = await ContentRepository.DBAddCarrousel(payload)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_ADD_CONTENT')
    }
    
    return result
}

export async function getCarrouselByTemplateDomain(template_id: number) {
    const result = await ContentRepository.DBGetCarrouselByTemplate(template_id)

    if(result.length < 1) {
        throw new NotFoundError('CARROUSEL_IMAGE_NOT_FOUND')
    }

    return result
}

export async function editCarrouselDomain(payload: ContentDto.EditCarrousel, queryRunner?: QueryRunner) {
    const result = await ContentRepository.DBEditCarrousel(payload, queryRunner)
    
    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_EDIT_CARROUSEL')
    }

    return result
}

export async function getCarrouselDomain(id: number) {
    const result = await ContentRepository.DBGetCarrousel(id)

    if(result.length < 1) {
        throw new NotFoundError('CARROUSEL_IMAGE_NOT_FOUND')
    }

    return result[0]
}

export async function editTemplateDomain(payload: ContentDto.EditTemplate, queryRunner?: QueryRunner) {
    const result = await ContentRepository.DBEditTemplate(payload, queryRunner)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_EDIT_TEMPLATE')
    }

    return result
}

export async function getCarrouselListDomain() {
    return await ContentRepository.DBGetCarrouselList()
}
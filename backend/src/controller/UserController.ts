import { FastifyReply, FastifyRequest } from "fastify"
import * as UserDomainService from "../application/services/User"
import { CreateUserRequest, GetUserRequest, LoginRequest, UpdateUserRequest } from '../services/models/User'

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const { password, username } = request.body as LoginRequest
  try {
    const message = await UserDomainService.LoginServiceApp({ 
      username,
      password,
      url: request.url,
      action: request.routeOptions.schema.summary,
      ip: request.headers["x-forwarded-for"] as string || (request.ip == '::1' ? "127.0.0.1" : request.ip),
     })
    return { message }
  } catch (error) { 
    throw error
  }
}

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const file = request.file
  const body = request.body as CreateUserRequest
  try {
    const message = await UserDomainService.CreateUserServiceApp({ ...body, image: file })
    return { message }
  } catch (error) {
    throw error
  }
}

export async function getUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const params = request.params as GetUserRequest
  try {
    const message = await UserDomainService.GetUserServiceApp(params)
    return { message }
  } catch (error) {
    throw error
  }

}

export async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const file = request.file
  const body = request.body as UpdateUserRequest
  try {
    const message = await UserDomainService.UpdateUserServiceApp({ ...body, image: file })
    return { message }
  } catch (error) {
    throw error
  }
}

export async function verifyUser(request: FastifyRequest) {
  try {
    const { password, ...user } = request.user
    return { message: user }
  } catch (error) {
    throw error
  }
}

export async function getUserListHandler() {
  try {
    const message = await UserDomainService.GetUserListServiceApp()

    return { message }
  } catch (error) {
    throw error    
  }
}
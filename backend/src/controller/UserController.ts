import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserServiceApp, GetUserServiceApp, LoginServiceApp, UpdateUserServiceApp } from "../application/services/User"
import { CreateUserRequest, GetUserRequest, LoginRequest, UpdateUserRequest } from '../services/models/User/type'

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const { password, username } = request.body as LoginRequest
  try {
    const message = await LoginServiceApp({ username, password })
    return { message }
  } catch (error) { 
    throw error
  }
}

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as CreateUserRequest
  try {
    const message = await CreateUserServiceApp(body)
    return { message }
  } catch (error) {
    throw error
  }
}

export async function getUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const params = request.params as GetUserRequest
  try {
    const message = await GetUserServiceApp(params)
    return { message }
  } catch (error) {
    throw error
  }

}

export async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as UpdateUserRequest
  try {
    const message = await UpdateUserServiceApp(body)
    return { message }
  } catch (error) {
    throw error
  }
}
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {deleteTodo} from "../../businessLogic/todos"

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  await deleteTodo(todoId, jwtToken)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
})

handler.use(
  cors({
    credentials: true
  })
)
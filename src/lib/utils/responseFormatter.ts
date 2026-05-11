export function createSuccessResponse(data: any, status = 200) {
  return Response.json({
    success: true,
    data,
    timestamp: new Date().toISOString()
  }, { status })
}

export function handleAPIError(error: any, message = 'Internal server error', status = 500) {
  return Response.json({
    success: false,
    error: message,
    message: error instanceof Error ? error.message : String(error),
    timestamp: new Date().toISOString()
  }, { status })
}
